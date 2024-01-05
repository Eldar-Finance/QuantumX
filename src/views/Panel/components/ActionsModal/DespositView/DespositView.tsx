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
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import InputText from "components/Inputs/InputText";
import NextImage from "components/NextImage/NextImage";
import TokenList from "components/TokenList/TokenList";
import { useFormik } from "formik";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { formatBalance, setElrondBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import { IELrondTOkenWithBalance } from "utils/types/elrond.interface";
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
        .min(0, "Amount must be greater than 0"),
    })
  ),
});
interface IProps {
  onClose: () => void;
  farm: IScFarm2;
}

const skipRender = (prevProps: IProps, nextProps: IProps) => {
  return prevProps.farm.farmId === nextProps.farm.farmId;
};

// eslint-disable-next-line react/display-name
const DepositView = memo(({ onClose, farm }: IProps) => {
  const { accountToken: token } = useGetAccountToken(farm.rewardToken);
  const elrondToken = useMemo(() => token, [token]);
  const isOneToken = farm.rewardToken !== "";

  const [usersTokens] = useGetUserTokens(null, true);
  const alltokens: IELrondTOkenWithBalance[] = usersTokens;
  const [selectedTokenId, setSelectedTokenId] = useState<number>(-1);

  const formik = useFormik<{
    days: "";
    BypassLastRewardedEpoch: boolean;
    tokens: { tokenDetail: IELrondTOkenWithBalance; amount: string }[];
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
      depositRewards(
        values.tokens,
        farm.farmId,
        values.days,
        values.BypassLastRewardedEpoch
      );
    },
  });

  useEffect(() => {
    if (isOneToken) {
      formik.setFieldValue(`tokens.0.tokenDetail`, elrondToken);
    }
  }, [isOneToken, elrondToken]);

  const handleSelectToken = (selectedToken: IELrondTOkenWithBalance) => {
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
  const handleChange = (val: string, i: number) => {
    formik.setFieldValue(`tokens.${i}.amount`, val, false);
  };
  const transformValue = (val: string, decimals?: number) => {
    if (decimals) {
      return setElrondBalance(Number(val), decimals);
    } else {
      return "0";
    }
  };
  const handleMax = (realmax: string, i: number) => {
    formik.setFieldValue(`tokens.${i}.amount`, realmax, false);
  };

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
                <InputComponent
                  key={i}
                  field={field}
                  i={i}
                  handleChange={handleChange}
                  onSelectNewToken={() => setSelectedTokenId(i)}
                  onMax={handleMax}
                  onRemoveField={removeField}
                  transformValue={transformValue}
                  isOneToken={isOneToken}
                />
              );
            })}
            {isOneToken ? null : (
              <>
                <Center w="full" mt={3}>
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
            <Center my={6}>
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

          {selectedTokenId !== -1 ? (
            <TokenList
              tokens={alltokens.filter(
                (userToken) =>
                  formik.values.tokens
                    .filter((t) => Boolean(t.tokenDetail))
                    .findIndex(
                      (t) => t.tokenDetail.identifier === userToken.identifier
                    ) === -1
              )}
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
}, skipRender);

export default DepositView;

interface IInputComponentProps {
  handleChange: (val: string, i: number) => void;
  transformValue: (val: string, decimals?: number) => string;
  field: {
    tokenDetail: IELrondTOkenWithBalance;
    amount: string;
  };
  isOneToken: boolean;
  i: number;
  onMax(val: string, i: number): void;
  onSelectNewToken: (i: number) => void;
  onRemoveField: (i: number) => void;
}

const InputComponent = ({
  handleChange,
  onSelectNewToken,
  onRemoveField,
  onMax,
  transformValue,
  i,
  field,
  isOneToken,
}: IInputComponentProps) => {
  const inputRef = useRef(null);

  const handleMax = () => {
    const realmax = new BigNumber(field.tokenDetail.balance).toString();
    const inputMax = formatBalance(
      {
        balance: realmax,
        decimals: field.tokenDetail.decimals,
      },
      true,
      field.tokenDetail.decimals
    );
    inputRef.current.setValue(inputMax);

    onMax(realmax, i);
  };
  return (
    <Box
      key={i}
      bg="black.base"
      px={{ xs: "3", md: "5" }}
      py="3"
      borderRadius={"lg"}
    >
      <Flex align={"center"}>
        <InputText
          variant={"unstyled"}
          placeholder="0.0"
          flex="1"
          pr={5}
          name={`tokens.${i}.amount`}
          onChangeInput={(val) => handleChange(val, i)}
          tranformValue={(val) =>
            transformValue(val, field.tokenDetail?.decimals)
          }
          ref={inputRef}
        />

        {field.tokenDetail && (
          <ActionButton mr={2} onClick={handleMax} p={{ xs: "2", md: "3" }}>
            MAX
          </ActionButton>
        )}
        <ActionButton
          onClick={isOneToken ? undefined : () => onSelectNewToken(i)}
          p={{ xs: "2", md: "3" }}
        >
          {field.tokenDetail ? (
            <>
              {field.tokenDetail.assets && <NextImage
                src={field.tokenDetail.assets.svgUrl}
                alt=""
                width={27}
                height={27}
              />}
              <Text fontSize={"14px"} ml={2}>
                {formatTokenI(field.tokenDetail.ticker)}
              </Text>
            </>
          ) : (
            <Text fontSize={"14px"}>Select token</Text>
          )}
        </ActionButton>
        {isOneToken ? null : (
          <ActionButton bg="tomato" onClick={() => onRemoveField(i)} ml={3}>
            <Icon as={DeleteIcon} />
          </ActionButton>
        )}
      </Flex>
    </Box>
  );
};
