import { CloseIcon, DeleteIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import NextImage from "components/NextImage/NextImage";
import TokenList from "components/TokenList/TokenList";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import { IElrondToken } from "utils/types/elrond.interface";
import { IScFarm2 } from "utils/types/sc.interface";
import { depositRewards } from "views/Panel/scServices/farmsCalls";
import * as yup from "yup";

const validationSchema = yup.object({
  days: yup.number().required(),
  BypassLastRewardedEpoch: yup.boolean().required(),
  tokens: yup.array().of(
    yup.object().shape({
      tokenDetail: yup.object().required("Token is required"),
      amount: yup
        .number()
        .required("Amount is required")
        .min(1, "Amount must be greater than 0"),
    })
  ),
});

interface IProps {
  onClose: () => void;
  farm: IScFarm2;
}

const DepositView = ({ onClose, farm }: IProps) => {
  const { token } = useGetElrondToken(farm.rewardToken);
  const [alltokens] = useGetUserTokens();
  const [selectedTokenId, setSelectedTokenId] = useState<number>(-1);
  const formik = useFormik<{
    days: "";
    BypassLastRewardedEpoch: boolean;
    tokens: { tokenDetail: IElrondToken; amount: string }[];
  }>({
    initialValues: {
      days: "",
      BypassLastRewardedEpoch: false,
      tokens: [
        {
          tokenDetail: null,
          amount: "",
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("values", values);

      depositRewards(
        values.tokens,
        farm.farmId,
        values.days,
        values.BypassLastRewardedEpoch
      );
    },
  });

  useEffect(() => {
    if (token) {
      formik.setFieldValue(`tokens.0.tokenDetail`, token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSelectToken = (selectedToken: IElrondToken) => {
    formik.setFieldValue(
      `tokens.${selectedTokenId}.tokenDetail`,
      selectedToken
    );
    setSelectedTokenId(-1);
  };

  const addField = () => {
    formik.setFieldValue("tokens", [
      ...formik.values.tokens,
      {
        tokenDetail: null,
        amount: "",
      },
    ]);
  };
  const removeField = (index: number) => {
    const values = [...formik.values.tokens];
    values.splice(index, 1);
    formik.setFieldValue("tokens", values);
  };

  console.log("selectedTokenId", selectedTokenId);
  console.log("token", token);
  console.log("values", formik.values);
  const isOneToken = Boolean(token);
  return (
    <>
      {/* @ts-ignore */}
      <Flex as="form" onSubmit={formik.handleSubmit} flexDir="column" h="full">
        <ModalHeader>
          <Flex justifyContent={"space-between"} alignItems="center">
            <Heading fontSize={"md"} textTransform="uppercase">
              Deposit rewards
            </Heading>{" "}
            <ActionButton aria-label="close" bg="transparent" onClick={onClose}>
              <CloseIcon color="main" fontSize={"12px"} cursor="pointer" />
            </ActionButton>
          </Flex>
        </ModalHeader>
        <Divider />
        <ModalBody mt="3" flex={1} display="flex" flexDir={"column"}>
          <Flex flexDir={"column"} gap="4" mb={3}>
            <Box bg="black.base" px="5" py="3" borderRadius={"lg"}>
              <Flex align={"center"}>
                <Input
                  variant={"unstyled"}
                  placeholder="0"
                  flex="1"
                  name="days"
                  onChange={formik.handleChange}
                />{" "}
                <Text fontSize={"14px"}>DAYS</Text>
              </Flex>
            </Box>
            {formik.values.tokens.map((field, i) => {
              return (
                <Box key={i} bg="black.base" px="5" py="3" borderRadius={"lg"}>
                  <Flex align={"center"}>
                    <Input
                      variant={"unstyled"}
                      placeholder="0.0"
                      flex="1"
                      name={`tokens.${i}.amount`}
                      onChange={formik.handleChange}
                      pr={5}
                    />

                    <ActionButton
                      onClick={
                        isOneToken ? undefined : () => setSelectedTokenId(i)
                      }
                    >
                      {field.tokenDetail ? (
                        <>
                          <NextImage
                            src={field.tokenDetail.assets.svgUrl}
                            alt=""
                            width={27}
                            height={27}
                          />
                          <Text fontSize={"14px"} ml={2}>
                            {field.tokenDetail.ticker}
                          </Text>
                        </>
                      ) : (
                        <Text fontSize={"14px"}>Select token</Text>
                      )}
                    </ActionButton>
                    {isOneToken ? null : (
                      <ActionButton
                        bg="tomato"
                        onClick={() => removeField(i)}
                        ml={3}
                      >
                        <Icon as={DeleteIcon} />
                      </ActionButton>
                    )}
                  </Flex>
                </Box>
              );
            })}
            <Center mt={3}>
              <Checkbox
                name="BypassLastRewardedEpoch"
                onChange={formik.handleChange}
              >
                <Text color="gray.300">
                  Bypass last rewarded epoch and allocate the rewards starting
                  from next epoch.
                </Text>
              </Checkbox>
            </Center>
          </Flex>
          {isOneToken ? null : (
            <>
              <Center w="full" my={6}>
                <ActionButton
                  aria-label="add field"
                  onClick={addField}
                  borderRadius={"full"}
                  h="45px"
                  w="45px"
                >
                  <Icon as={PlusSquareIcon} fontSize="20px" />
                </ActionButton>
              </Center>
            </>
          )}
          {selectedTokenId !== -1 ? (
            <TokenList
              tokens={alltokens}
              handleClickToken={handleSelectToken}
              hoverBg="black.base"
            />
          ) : null}
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
      </Flex>
    </>
  );
};

export default DepositView;
