import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
import { proteoEliteWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import { useFormik } from "formik";
import { haveMaxLimit } from "utils/functions/farms";
import { formatBalance, setElrondBalance } from "utils/functions/formatBalance";
import {
  getBigerTime,
  getFeeBasedInEpoch,
  transfromTime,
} from "utils/functions/time";
import { IProteoFarm } from "utils/types/farms.interface";
import * as yup from "yup";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  pf: IProteoFarm;
  token: any;
  tokenInfo2: any;
  epochPassedFromStake: number;
}

const UnstakeModal = ({
  tokenInfo2,
  token,
  epochPassedFromStake,
  pf,
  isOpen,
  onClose,
}: IProps) => {
  const fee = getFeeBasedInEpoch(epochPassedFromStake);
  const validationSchema = yup.object({
    amount: yup
      .number()
      .required()
      .max(
        formatBalance(
          {
            balance: tokenInfo2?.staked,
            decimals: token.decimals,
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
      const BytesValue = (await import("@multiversx/sdk-core/out")).BytesValue;
      const BigUIntValue = (await import("@multiversx/sdk-core/out"))
        .BigUIntValue;
      scCall(
        proteoEliteWsp,
        "unstake",
        [
          BytesValue.fromUTF8(token.identifier),
          new BigUIntValue(
            new BigNumber(setElrondBalance(values.amount, token.decimals))
          ),
        ],
        70000000
      );
    },
  });

  const handleMax = (percent) => {
    if (tokenInfo2) {
      const max = formatBalance(
        {
          balance: tokenInfo2.staked,
          decimals: token.decimals,
        },
        true
      );
      const realmax = percent * max;

      formik.setFieldValue("amount", realmax, false);
    }
  };

  const remainigTime = getBigerTime(
    transfromTime(tokenInfo2?.remainingTime).days,
    transfromTime(tokenInfo2?.remainingTime).hours,
    transfromTime(tokenInfo2?.remainingTime).min,
    transfromTime(tokenInfo2?.remainingTime).secs
  );

  const isLp = haveMaxLimit(pf.token);
  return (
    <MyModal bg="black.baseDark" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <ModalHeader>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading fontSize={"md"}> Unstake {pf.stakedCoin}</Heading>{" "}
            <ActionButton aria-label="close" bg="transparent" onClick={onClose}>
              <CloseIcon color="main" fontSize={"12px"} cursor="pointer" />
            </ActionButton>
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Box bg="black.base" p="5" borderRadius={"xl"}>
            <Flex mb="2" justifyContent={"space-between"}>
              <Text>
                Staked:{" "}
                {formatBalance({
                  balance: tokenInfo2?.staked,
                  decimals: token.decimals,
                })}
              </Text>
              {isLp && (
                <Flex justifyContent={"flex-end"}>
                  {fee !== null && (
                    <Button
                      mt={2}
                      as={Box}
                      textTransform={"uppercase"}
                      background={"red.500"}
                      variant={"solid"}
                      fontSize={"x-small"}
                      height={"25px"}
                      width={"auto"}
                      minWidth={"unset"}
                      padding={"5px 10px"}
                      h="auto"
                      fontWeight={"400"}
                      color={"gray.200"}
                      mr={1}
                      _hover={{
                        background: "red.500",
                      }}
                      _active={{
                        background: "red.500",
                      }}
                    >
                      {fee} % Fee
                    </Button>
                  )}
                </Flex>
              )}
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
                {pf?.stakedCoin}
                {pf.type !== "pool" && "-LP"}
              </Text>
            </Flex>
            <Flex justifyContent={"flex-end"} gap="1">
              <AmountBox percent={25} onClick={() => handleMax(0.25)} />
              <AmountBox percent={50} onClick={() => handleMax(0.5)} />
              <AmountBox percent={75} onClick={() => handleMax(0.75)} />
              <AmountBox percent={100} onClick={() => handleMax(1)} />
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
            disabled={!formik.isValid || tokenInfo2?.remainingTime > 0}
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
