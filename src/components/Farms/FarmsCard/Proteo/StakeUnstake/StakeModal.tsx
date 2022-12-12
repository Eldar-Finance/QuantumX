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
import { transactionServices } from "@elrondnetwork/dapp-core";
import { contractAddr } from "api/net.config";
import { EGLDPayment, ESDTTransfer } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import CustomTooltip from "components/CustomTooltip/CustomTooltip";
import MyModal from "components/Modal/Modal";
import { useFormik } from "formik";
import { useState } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import { haveMaxLimit } from "utils/functions/proteo";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import { IProteoFarm } from "utils/types/farms.interface";
import * as yup from "yup";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  pf: IProteoFarm;
  max: number;
  token: any;
}

const StakeModal = ({ isOpen, onClose, max, pf, token }: IProps) => {
  const [tokens, userToken] = useGetUserTokens(pf.tokenIdentifier);
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
  const transactionStatus = transactionServices.useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: onSuccess,
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let res = null;
      if (pf.stakedCoin === "EGLD") {
        res = await EGLDPayment(
          proteoEliteWsp,
          "stake",
          Number(values.amount),
          [],
          50000000
        );
      } else {
        res = await ESDTTransfer({
          funcName: "stake",
          token: { identifier: token.identifier, decimals: token.decimals },
          val: Number(values.amount),
          contractAddr: contractAddr.proteoElite,
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

      if (max === 0) {
        formik.setFieldValue("amount", userRealAmount, false);
      } else {
        if (max > userTokenAmount) {
          formik.setFieldValue("amount", userRealAmount, false);
        } else {
          formik.setFieldValue("amount", max, false);
        }
      }
    }
  };
  return (
    <MyModal bg="black.baseDark" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <ModalHeader>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading fontSize={"md"}> Stake {pf.stakedCoin}</Heading>{" "}
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
                Balance: {formatBalance(userToken)} {userToken?.name}
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
                {pf?.stakedCoin}
                {pf.type !== "pool" && "-LP"}
              </Text>
            </Flex>
            <Flex justifyContent={"flex-end"} gap="1">
              <AmountBox percent={25} onClick={() => handleAmount(0.25)} />
              <AmountBox percent={50} onClick={() => handleAmount(0.5)} />
              <AmountBox percent={75} onClick={() => handleAmount(0.75)} />
              <AmountBox percent={100} onClick={() => handleAmount(1)} />
            </Flex>
            {pf.stakedCoin === "PROTEOEGLD" && (
              <Flex
                justifyContent={"flex-end"}
                alignItems="center"
                color="gray.500"
                fontSize={"sm"}
                mt={2}
              >
                <CustomTooltip
                  iconSize={"14"}
                  text={
                    <Box>
                      <Text mb={1} fontWeight="bold">
                        Withdrawing Fees
                      </Text>
                      <Text mb={1}>
                        Fees are changing from 0 to 3% according to new
                        deposits.
                      </Text>
                      <Text mb={1}>
                        Check the fee live every time you want to withdraw.
                      </Text>
                      <Text mb={1} fontWeight="bold">
                        Depositing resets the timer
                      </Text>
                    </Box>
                  }
                />

                <Text ml={1}>Info about fees for withdrawing</Text>
              </Flex>
            )}
          </Box>
        </ModalBody>
        <ModalFooter justifyContent={"center"} gap="6" flexWrap={"wrap"}>
          <ActionButton
            variant={"outline"}
            w="full"
            maxW={"180px"}
            onClick={onClose}
            disabled={
              !formik.isValid || (max === 0 && !haveMaxLimit(pf.stakedCoin))
            }
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
