import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { BigIntValue } from "@elrondnetwork/erdjs/out";
import { contractAddr } from "api/net.config";
import { EGLDPaymentOnlyTx, ESDTTransferOnlyTx } from "api/sc/calls";
import { sendMultipleTransactions } from "api/sc/sc";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import { useFormik } from "formik";
import { formatBalance } from "utils/functions/formatBalance";
import { preventExponetialNotation } from "utils/functions/numbers";
import { formatTokenI } from "utils/functions/tokens";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import {
  IElrondAccountToken,
  IElrondToken,
} from "utils/types/elrond.interface";
import { IScFarmItem } from "utils/types/sc.interface";
import { getTxForRareFee } from "views/Hypezone/utils/functions";
import * as yup from "yup";

interface IProps {
  isOpen: boolean;
  isPool?: boolean;
  onClose: () => void;
  farm: IScFarmItem;
  token: IElrondToken;
  maxStakingAmount?: number;
}

const StakeModal = ({
  isOpen,
  onClose,
  farm,
  isPool,
  token,
  maxStakingAmount,
}: IProps) => {
  const { accountToken } = useGetAccountToken(farm.farm.stakingToken);
  const userToken = accountToken as IElrondAccountToken;

  const maxUserCanStake = formatBalance(
    { balance: maxStakingAmount, decimals: userToken?.decimals },
    true,
    18
  );
  const userAmount = formatBalance(userToken, true, 18);
  const max = maxUserCanStake > userAmount ? userAmount : maxUserCanStake;
  const validationSchema = yup.object({
    amount: yup
      .number()
      .required()
      .max(
        max,
        "The max amount you can stake is " + max + " " + userToken.name
      ),
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const amount = new BigNumber(values.amount).toNumber();

      let txs = [];

      const t1 = await getTxForRareFee();
      txs.push(t1);
      if (farm.farm.stakingToken === "EGLD") {
        const t2 = await EGLDPaymentOnlyTx(
          "farms2",
          "stake",
          amount,
          [new BigIntValue(new BigNumber(farm.farm.farmId))],
          50000000
        );
        txs.push(t2);
      } else {
        const t2 = await ESDTTransferOnlyTx({
          funcName: "stake",
          token: { identifier: token.identifier, decimals: token.decimals },
          val: amount,
          args: [new BigIntValue(new BigNumber(farm.farm.farmId))],
          contractAddr: contractAddr.farms2,
          gasL: 50000000,
        });
        txs.push(t2);
      }
      sendMultipleTransactions({ txs: txs });
    },
  });
  const handleAmount = (percent: number) => {
    if (userToken) {
      const userTokenAmount = formatBalance(userToken, true, 18);
      let userRealAmount = percent * userTokenAmount;

      if (userRealAmount > maxStakingAmount) {
        userRealAmount = maxStakingAmount;
      }
      const finalAmount = preventExponetialNotation(userRealAmount);

      formik.setFieldValue("amount", finalAmount, false);
    }
  };
  return (
    <MyModal bg="black.baseDark" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <ModalHeader>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading fontSize={"md"}>
              {" "}
              Stake {formatTokenI(farm.farm.stakingToken)}
            </Heading>{" "}
            <ActionButton aria-label="close" bg="transparent" onClick={onClose}>
              <CloseIcon color="main" fontSize={"12px"} cursor="pointer" />
            </ActionButton>
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Box bg="black.base" p="5" borderRadius={"xl"}>
            <Flex mb="2">
              <Text>
                Balance: {formatBalance(userToken)} {userToken?.ticker}
              </Text>
            </Flex>
            <Flex mb="3">
              <Flex flexDir={"column"} flex={1}>
                <Input
                  variant={"unstyled"}
                  placeholder="0"
                  flex="1"
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                />{" "}
                <Text fontSize={"sm"} color="tomato">
                  {formik.errors.amount}
                </Text>
              </Flex>
              <Text fontSize={"14px"}>
                {formatTokenI(farm?.farm.stakingToken)}
                {!isPool && "-LP"}
              </Text>
            </Flex>
            <Flex justifyContent={"flex-end"} gap="1">
              <AmountBox percent={25} onClick={() => handleAmount(0.25)} />
              <AmountBox percent={50} onClick={() => handleAmount(0.5)} />
              <AmountBox percent={75} onClick={() => handleAmount(0.75)} />
              <AmountBox percent={100} onClick={() => handleAmount(1)} />
            </Flex>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent={"center"} gap="6" flexWrap={"wrap"}>
          <ActionButton
            variant={"outline"}
            w="full"
            maxW={"180px"}
            onClick={onClose}
            disabled={!formik.isValid}
          >
            Cancel
          </ActionButton>
          <ActionButton
            bg="white.100"
            variant={"outline"}
            color="gray.400"
            w="full"
            maxW={"180px"}
            type="submit"
          >
            Confirm
          </ActionButton>
        </ModalFooter>
      </form>
    </MyModal>
  );
};

export default StakeModal;

const AmountBox = ({
  percent,
  onClick,
}: {
  percent: number;
  onClick: () => void;
}) => {
  const text = percent === 100 ? "MAX" : percent + "%";
  return (
    <ActionButton
      fontSize={"10px"}
      py="1"
      h="auto"
      px="2"
      variant={"outline"}
      borderColor="main"
      onClick={onClick}
    >
      {text}
    </ActionButton>
  );
};
