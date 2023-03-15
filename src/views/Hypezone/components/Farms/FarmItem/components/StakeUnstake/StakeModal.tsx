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
import { BigIntValue } from "@multiversx/sdk-core/out";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import { contractAddr } from "api/net.config";
import { EGLDPaymentOnlyTx, ESDTTransferOnlyTx } from "api/sc/calls";
import { sendMultipleTransactions } from "api/sc/sc";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import { useFormik } from "formik";
import { useState } from "react";
import { formatBalance, setElrondBalance } from "utils/functions/formatBalance";
import { preventExponetialNotation } from "utils/functions/numbers";
import { formatTokenI } from "utils/functions/tokens";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import { IElrondToken } from "utils/types/elrond.interface";
import { IScFarmItem } from "utils/types/sc.interface";
import { getTxForRareFee } from "views/Hypezone/utils/functions";

interface IProps {
  isOpen: boolean;
  isPool?: boolean;
  onClose: () => void;
  farm: IScFarmItem;
  token: IElrondToken;
  maxStakingAmount: string;
}

const StakeModal = ({
  isOpen,
  onClose,
  farm,
  isPool,
  token,
  maxStakingAmount,
}: IProps) => {
  const [_, userToken]: any = useGetUserTokens(farm.farm.stakingToken);
  const maxRealAmount = formatBalance(
    { balance: maxStakingAmount, decimals: userToken?.decimals },
    true
  );

  const [sessionId, setSessionId] = useState();
  const onSuccess = () => {
    window.location.reload();
  };
  const transactionStatus = useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: onSuccess,
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: async (values) => {
      if (
        new BigNumber(
          setElrondBalance(values.amount, userToken.decimals)
        ).isLessThanOrEqualTo(maxStakingAmount)
      ) {
        const amount = new BigNumber(values.amount).toNumber();

        let t1 = null;
        if (farm.farm.stakingToken === "EGLD") {
          t1 = await EGLDPaymentOnlyTx(
            "farms2",
            "stake",
            amount,
            [new BigIntValue(new BigNumber(farm.farm.farmId))],
            50000000
          );
        } else {
          t1 = await ESDTTransferOnlyTx({
            funcName: "stake",
            token: { identifier: token.identifier, decimals: token.decimals },
            val: amount,
            args: [new BigIntValue(new BigNumber(farm.farm.farmId))],
            contractAddr: contractAddr.farms2,
            gasL: 50000000,
          });
        }

        const t2 = await getTxForRareFee();
        sendMultipleTransactions({
          txs: [t2, t1],
        });
      }
    },
  });
  const handleAmount = (percent: number) => {
    if (userToken) {
      const userTokenAmount = formatBalance(userToken, true);
      const userRealAmount = percent * userTokenAmount;
      let finalAmount = preventExponetialNotation(maxRealAmount);
      if (new BigNumber(maxRealAmount).isGreaterThan(userRealAmount)) {
        finalAmount = preventExponetialNotation(userRealAmount);
      }

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
              <Input
                variant={"unstyled"}
                placeholder="0"
                flex="1"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
              />{" "}
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
