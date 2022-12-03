import { Box, Flex, Input, InputProps, Spinner, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import ActionButton from "components/ActionButton/ActionButton";
import { ReactNode } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import SelectCurrency from "./commons/SelectCurrency/SelectCurrency";

interface IProps extends InputProps {
  label: string;
  id: string;
  handleClickToken: (token: any) => void;
  onClickMaxtoken: () => void;
  isMaxToken: boolean;
  token: any;
  offers: any;
  sxProps?: any;
  borderColored?: boolean;
  liquidity?: ReactNode;
}

const TextField = ({
  label,
  id,
  handleClickToken,
  onClickMaxtoken,
  isMaxToken,
  token,
  offers,
  borderColored,
  liquidity,
  sxProps,
  ...props
}: IProps) => {
  return (
    <Box
      mb={"10px"}
      width={"full"}
      p={liquidity ? "30px 30px 10px" : "30px"}
      px={4}
      borderRadius={"20px"}
      border={"1px solid"}
      borderColor={borderColored ? "main" : "transparent"}
      sx={sxProps}
      position={"relative"}
      bg="scondary"
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
        {token.token && (
          <Text color={"white.400"}>
            <Box as="span" mr="28px">
              {" "}
              Balance:
            </Box>{" "}
            {formatBalance(token.balance) || 0}
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
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {offers?.status === "loading" ? (
          <Flex>
            <Spinner />
          </Flex>
        ) : (
          <InputS
            value={token.value ?? ""}
            fontSize={{ xs: "3xl", md: "36px" }}
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
            type="number"
            placeholder="0.0"
            minLength={1}
            maxLength={79}
            spellCheck="false"
            readOnly={offers?.status !== "succeeded"}
            {...props}
          />
        )}
        <Flex alignItems={"center"}>
          {token.token && isMaxToken && (
            <ActionButton
              onClick={onClickMaxtoken}
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
          />
        </Flex>
      </Box>
      {liquidity}
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
