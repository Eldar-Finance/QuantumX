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
import { scCall } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import { useFormik } from "formik";
import { formatBalance, setElrondBalance } from "utils/functions/formatBalance";
import { preventExponetialNotation } from "utils/functions/numbers";
import { formatTokenI } from "utils/functions/tokens";
import useGetQuantumxFarmsFees from "utils/hooks/useGetQuantumxFarmsFees";
import { IElrondToken } from "utils/types/elrond.interface";
import { IScFarmItem, IScUserFarmInfo } from "utils/types/sc.interface";
import * as yup from "yup";

interface IProps {
  isOpen: boolean;
  isPool?: boolean;
  onClose: () => void;
  farm: IScFarmItem;
  userFarmItem: IScUserFarmInfo;
  token?: IElrondToken;
}

const UnstakeModal = ({
  userFarmItem,
  farm,
  isPool,
  isOpen,
  token,
  onClose,
}: IProps) => {
  const { farmFee } = useGetQuantumxFarmsFees(farm.farm.farmId);
  const validationSchema = yup.object({
    amount: yup
      .number()
      .required()
      .max(
        formatBalance(
          {
            balance: userFarmItem?.stakedBalance,
            decimals: token?.decimals,
          },
          true
        )
      ),
  });
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      const BigNumber = (await import("bignumber.js")).default;
      const BigUIntValue = (await import("@elrondnetwork/erdjs/out"))
        .BigUIntValue;

      scCall(
        "farms2",
        "unstake",
        [
          new BigUIntValue(new BigNumber(farm.farm.farmId)),
          new BigUIntValue(
            new BigNumber(setElrondBalance(values.amount, token.decimals))
          ),
        ],
        50000000
      );
    },
  });
  const handleMax = (percent) => {
    if (userFarmItem) {
      const max = formatBalance(
        {
          balance: userFarmItem.stakedBalance,
          decimals: token.decimals,
        },
        true
      );
      const realmax = percent * max;
      const finalAmount = preventExponetialNotation(realmax);

      formik.setFieldValue("amount", finalAmount, false);
    }
  };

  console.log("farmFee", farmFee);

  return (
    <MyModal bg="black.baseDark" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <ModalHeader>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading fontSize={"md"}>
              {" "}
              Unstake {formatTokenI(farm.farm.stakingToken)}
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
                {formatBalance({
                  balance: userFarmItem?.stakedBalance,
                  decimals: token?.decimals,
                })}
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
                {farmFee && (
                  <Text fontSize={"sm"} color="darkgray">
                    Fee : {farmFee.earlyUnbondingFee}%
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

export default UnstakeModal;

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
