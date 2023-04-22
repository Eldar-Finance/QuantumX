import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { BigUIntValue } from "@multiversx/sdk-core/out";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import { MultiESDTNFTTransfer } from "api/sc/calls";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { formatBalance, setElrondBalance } from "utils/functions/formatBalance";
import { preventExponetialNotation } from "utils/functions/numbers";
import { formatTokenI } from "utils/functions/tokens";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import { IElrondToken } from "utils/types/elrond.interface";
import { IScFarmItem } from "utils/types/sc.interface";
import useMultiSakingRatio from "views/Pools/hooks/useMultiSakingRatio";

import * as yup from "yup";
interface IProps {
  isOpen: boolean;
  isPool?: boolean;
  onClose: () => void;
  farm: IScFarmItem;
  token: IElrondToken;
}

const MultipleStakeModal = ({
  isOpen,
  onClose,
  farm,
  isPool,
  token,
}: IProps) => {
  const [_, userToken]: any = useGetUserTokens(farm.farm.stakingToken);
  const { tokens } = useGetMultipleElrondTokens([
    farm.farm.stakingToken,
    ...farm.extraPools?.map((item) => item.stakedToken),
  ]);
  //   console.log("userToken", userToken);

  const validationSchema = yup.object({
    amount: yup.number().required().max(formatBalance(userToken, true)),
    multifarmsAmounts: yup.array().of(yup.number().required()),
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
      multifarmsAmounts: farm?.extraPools.map((_, i) => ""),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const mainDecimals = tokens.find(
        (item) => item.identifier === farm.farm.stakingToken
      )?.decimals;
      const amount = new BigNumber(values.amount).toNumber();
      const tokensToSend = [
        {
          collection: farm.farm.stakingToken,
          nonce: 0,
          value: Number(setElrondBalance(amount, mainDecimals)),
        },
        ...farm.extraPools.map((item, i) => {
          const decimals = tokens.find(
            (t) => t.identifier === item.stakedToken
          )?.decimals;
          const amount = new BigNumber(values.multifarmsAmounts[i]).toNumber();
          return {
            collection: item.stakedToken,
            nonce: 0,
            value: Number(setElrondBalance(amount, decimals)),
          };
        }),
      ];

      console.log("tokensToSend", tokensToSend);

      let res = null;

      res = await MultiESDTNFTTransfer("farms2", "stakeMulti", tokensToSend, [
        new BigUIntValue(new BigNumber(farm.farm.farmId)),
      ]);

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
  console.log("formik", formik.values);

  return (
    <MyModal bg="black.baseDark" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <ModalHeader>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading fontSize={"md"}>
              {" "}
              Stake {formatTokenI(farm.farm.stakingToken)}{" "}
              {farm.extraPools
                ?.map((item) => formatTokenI(item.stakedToken))
                .join(" ")}
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
          {farm?.extraPools.map((farm, i) => {
            return (
              <MultiStakeComponent
                key={farm.stakedToken}
                farm={farm}
                formik={formik}
                multiStakeIndex={i}
              />
            );
          })}
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

export default MultipleStakeModal;

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

const MultiStakeComponent = ({
  farm,
  formik,
  multiStakeIndex,
}: {
  farm: IScFarmItem;
  formik;
  multiStakeIndex: number;
}) => {
  const { ratio } = useMultiSakingRatio(farm.farm.farmId, farm.stakedToken);
  console.log("ratio", ratio);

  useEffect(() => {
    if (ratio) {
      const ratioNumber = new BigNumber(ratio);
      const mainInputAmount = new BigNumber(
        formik.values.amount === "" ? "0" : formik.values.amount
      );

      const amount = mainInputAmount.multipliedBy(ratioNumber).toString();

      formik.setFieldValue(
        `multifarmsAmounts[${multiStakeIndex}]`,
        amount,
        false
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratio, formik.values.amount, multiStakeIndex]);

  if (!formik.values?.multifarmsAmounts) {
    return null;
  }
  return (
    <Center
      bg="black.baseDark"
      minH="50px"
      w="full"
      flexDir={"column"}
      p={5}
      mt={4}
      rounded={"md"}
    >
      <Flex w="full" justifyContent={"space-between"}>
        <Text>{formik.values.multifarmsAmounts[multiStakeIndex]}</Text>
        <Text>{formatTokenI(farm.stakedToken)}</Text>
      </Flex>
    </Center>
  );
};
