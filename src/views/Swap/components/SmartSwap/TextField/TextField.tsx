import { As, Box, Flex, Input, InputProps, Spinner, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import ActionButton from "components/ActionButton/ActionButton";
import { formatBalance, formatNumber, formatPrecision } from "utils/functions/formatBalance";
import { preventExponetialNotation } from "utils/functions/numbers";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import SelectCurrency from "./commons/SelectCurrency/SelectCurrency";
import { SwapToken } from "../SwapCard/SwapCard";

interface IProps extends InputProps {
  label: string;
  id: "from" | "to";
  handleClickToken: (token: any) => void;
  onClickMaxtoken?: (maxBalance: number) => void;
  hasMaxButton: boolean;
  field: SwapToken;
  sxProps?: any;
  isLoadingAmount?: boolean;
  disableChangeToken?: boolean;
  dollarAmount?: string;
  swapTokens: SwapToken[];
}

const TextField = ({
  label,
  id,
  handleClickToken,
  onClickMaxtoken,
  hasMaxButton,
  field,
  disableChangeToken,
  sxProps,
  isLoadingAmount,
  dollarAmount,
  swapTokens,
  ...props
}: IProps) => {
  const { token, isLoading } = useGetElrondToken(field.identifier);

  const { accountToken } = useGetAccountToken(field.identifier);
  return (
    <Box
      mb={"10px"}
      width={"full"}
      p={"30px"}
      pb={"10px"}
      px={4}
      borderRadius={"20px"}
      border={"1px solid"}
      sx={sxProps}
      position={"relative"}
      bg="secondary"
      fontSize={{ xs: "sm", md: "md" }}
    >
      <Flex justifyContent={"space-between"}>
        <label htmlFor={id}>
          <Text
            variant="body1"
            sx={{
              color: "text.secondary",
            }}
          >
            {label}
          </Text>
        </label>
        {accountToken && (
          <Text color={"white.400"}>
            <Box as="span" mr="28px">
              {" "}
              Balance:
            </Box>{" "}
            {formatBalance(accountToken) || 0}
          </Text>
        )}
      </Flex>

      <Box
        width={"full"}
        sx={{
          borderRadius: "0.45rem",

          marginTop: "5px",
          fontSize: "1.4rem",
          display: "flex",
          flexDir: "column",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Flex alignItems={"center"} mb={2}>
          {field.identifier && hasMaxButton && (
            <ActionButton
              onClick={() => onClickMaxtoken(formatBalance(accountToken, true, accountToken.decimals))}
              textTransform={"uppercase"}
              variant={"solid"}
              fontSize={{ xs: "sm", md: "md" }}
              height={"2rem"}
              width={"auto"}
              minWidth={"unset"}
              padding={"0.5rem"}
              fontWeight={"400"}
              color={"main"}
              bg="transparent"
              mr={1}
            >
              MAX
            </ActionButton>
          )}

          <SelectCurrency
            field={id}
            handleClickToken={handleClickToken}
            token={token}
            disable={disableChangeToken}
            swapTokens={swapTokens}
          />
        </Flex>
        <Flex flexDir={"column"} w="full" transform={"translateY(-5px)"}>
          {isLoadingAmount ? (
            <Box w="full">
              <Spinner />
            </Box>
          ) : (
            <InputS
              value={field.value ?? ""}
              fontSize={"3xl"}
              fontWeight={"500"}
              id={id}
              px={0}
              mr={2}
              _focus={{
                border: "none",
                outline: "none",
                boxShadow: "none",
              }}
              _placeholder={{
                color: "rgba(255, 255, 255, 0.15)",
              }}
              inputMode="decimal"
              title="Token Amount"
              autoComplete="off"
              autoCorrect="off"
              type={id === "from" ? "number" : "text"}
              placeholder="0.0"
              minLength={1}
              maxLength={79}
              spellCheck="false"
              {...props}
            />
          )}
          {dollarAmount && (
            <Text color={"grayText"}>
              ≈ ${formatNumber(preventExponetialNotation(dollarAmount))}
            </Text>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default TextField;

const InputS = styled(Input)(({ theme }) => ({
  border: "none",
  outline: "none",
  width: "100%",
  "&:disabled": {
    opacity: 1,
  },
}));
