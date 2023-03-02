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
import { EGLDPayment, ESDTTransfer } from "api/sc/calls";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import { useFormik } from "formik";
import { useState } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import { preventExponetialNotation } from "utils/functions/numbers";
import { formatTokenI } from "utils/functions/tokens";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import { IElrondToken } from "utils/types/elrond.interface";
import { IScFarmItem } from "utils/types/sc.interface";
import * as yup from "yup";

interface IProps {
  isOpen: boolean;
  isPool?: boolean;
  onClose: () => void;
  farm: IScFarmItem;
  token: IElrondToken;
}

const StakeModal = ({ isOpen, onClose, farm, isPool, token }: IProps) => {
  const [_, userToken]: any = useGetUserTokens(farm.farm.stakingToken);

  const validationSchema = yup.object({
    amount: yup
      .number()
      .required()
      .max(formatBalance(userToken, true)),
  });

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
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const amount = new BigNumber(values.amount).toNumber();

      let res = null;
      if (farm.farm.stakingToken === "EGLD") {
        res = await EGLDPayment(
          "farms2",
          "stake",
          amount,
          [new BigIntValue(new BigNumber(farm.farm.farmId))],
          50000000
        );
      } else {
        res = await ESDTTransfer({
          funcName: "stake",
          token: { identifier: token.identifier, decimals: token.decimals },
          val: amount,
          args: [new BigIntValue(new BigNumber(farm.farm.farmId))],
          contractAddr: contractAddr.farms2,
          gasL: 50000000,
        });
      }
      setSessionId(res);
    },
  });
  const handleAmount = (percent: number) => {
    if (userToken) {
      const userTokenAmount = formatBalance(userToken, true);
      const userRealAmount = percent * userTokenAmount;
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
