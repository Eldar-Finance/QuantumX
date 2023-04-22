import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { scCall } from "api/sc/calls";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import InputText from "components/Inputs/InputText";
import MyModal from "components/Modal/Modal";
import { useFormik } from "formik";
import { useRef } from "react";
import { formatBalance, setElrondBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetQuantumxFarmsFees from "utils/hooks/useGetQuantumxFarmsFees";
import { IElrondToken } from "utils/types/elrond.interface";
import { IScFarmItem, IScUserFarmInfo } from "utils/types/sc.interface";
import useMultiSakingRatio from "views/Pools/hooks/useMultiSakingRatio";
import * as yup from "yup";

interface IProps {
  isOpen: boolean;
  isPool?: boolean;
  onClose: () => void;
  farm: IScFarmItem;
  userFarmItem: IScUserFarmInfo;
  epochDiffrence: number;
  token?: IElrondToken;
}

const MultipleUnstakeModal = ({
  userFarmItem,
  farm,
  epochDiffrence,
  isPool,
  isOpen,
  token,
  onClose,
}: IProps) => {
  const { farmFee } = useGetQuantumxFarmsFees(farm.farm.farmId);
  const { tokens } = useGetMultipleElrondTokens([
    farm.farm.stakingToken,
    ...farm.extraPools?.map((item) => item.stakedToken),
  ]);
  const inputRef = useRef(null);
  const validationSchema = yup.object({
    amount: yup.number().required().max(Number(userFarmItem?.stakedBalance)),
  });
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const BigNumber = (await import("bignumber.js")).default;
      const BigUIntValue = (await import("@multiversx/sdk-core/out"))
        .BigUIntValue;

      scCall(
        "farms2",
        "multistakedTokenRatio",
        [
          new BigUIntValue(new BigNumber(farm.farm.farmId)),
          new BigUIntValue(new BigNumber(values.amount)),
        ],
        50000000
      );
    },
  });

  const handleMax = (percent) => {
    if (userFarmItem) {
      const realmax = new BigNumber(percent)
        .multipliedBy(userFarmItem.stakedBalance)
        .toString();
      const inputMax = formatBalance({
        balance: realmax,
        decimals: token.decimals,
      });
      inputRef.current.setValue(inputMax);
      formik.setFieldValue("amount", realmax, false);
    }
  };

  const handleChange = (val: string) => {
    formik.setFieldValue("amount", val, false);
  };
  const transformValue = (val: string) => {
    return setElrondBalance(Number(val), token.decimals);
  };

  return (
    <MyModal bg="black.baseDark" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <ModalHeader>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading fontSize={"md"}>
              {" "}
              Unstake {formatTokenI(farm.farm.stakingToken)}{" "}
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
                Staked:{" "}
                {formatBalance(
                  {
                    balance: userFarmItem?.stakedBalance,
                    decimals: token?.decimals,
                  },
                  false,
                  18
                )}
              </Text>
            </Flex>
            <Flex mb="3">
              <InputText
                variant={"unstyled"}
                placeholder="0"
                flex="1"
                name="amount"
                onChangeInput={handleChange}
                tranformValue={transformValue}
                ref={inputRef}
              />
              <Text fontSize={"14px"}>
                {formatTokenI(farm.farm.stakingToken)}
                {!isPool && "-LP"}
              </Text>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              gap="1"
              alignItems={"flex-end"}
            >
              <Flex>
                {epochDiffrence <= 0 && farmFee.earlyUnbondingFee > 0 && (
                  <Text fontSize={"sm"} color="darkgray">
                    ⚠️ Fee : {farmFee.earlyUnbondingFee}%
                  </Text>
                )}
              </Flex>
              <Flex gap={1}>
                <AmountBox percent={25} onClick={() => handleMax(0.25)} />
                <AmountBox percent={50} onClick={() => handleMax(0.5)} />
                <AmountBox percent={75} onClick={() => handleMax(0.75)} />
                <AmountBox percent={100} onClick={() => handleMax(1)} />
              </Flex>
            </Flex>
          </Box>

          {farm?.extraPools.map((farm, i) => {
            return (
              <MultiStakeComponent
                key={farm.stakedToken}
                farm={farm}
                formik={formik}
                tokens={tokens}
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
            disabled={!formik.isValid}
          >
            Confirm
          </ActionButton>
        </ModalFooter>
      </form>
    </MyModal>
  );
};

export default MultipleUnstakeModal;

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
  tokens,
}: {
  farm: IScFarmItem;
  formik;
  tokens: IElrondToken[];
}) => {
  const { ratio } = useMultiSakingRatio(farm.farm.farmId, farm.stakedToken);

  const amount = new BigNumber(
    formatBalance({
      balance: formik.values.amount === "" ? "0" : formik.values.amount,
      decimals: tokens.find((t) => t.identifier === farm.farm.stakingToken)
        ?.decimals,
    })
  )
    .multipliedBy(ratio)
    .toString();

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
        <Text>{amount}</Text>
        <Text>{formatTokenI(farm.stakedToken)}</Text>
      </Flex>
    </Center>
  );
};
