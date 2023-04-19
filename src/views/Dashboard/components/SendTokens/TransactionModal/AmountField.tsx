import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import InputText from "components/Inputs/InputText";
import LpTokenImage from "components/LpTokenImage/LpTokenImage";
import { isEqual } from "lodash";
import Image from "next/image";
import { memo, useRef } from "react";
import {
  formatBalance,
  formatBalanceDolar,
  setElrondBalance,
} from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetTokenPrice from "utils/hooks/useGetTokenPrice";

const AmountField = ({ selectedToken, setSelectedToken, tokens, formik }) => {
  const [price] = useGetTokenPrice("EGLD");
  const inputRef = useRef(null);

  const { onToggle: onToggleTokensModal } = useDisclosure();
  const handleMax = () => {
    if (selectedToken) {
      const realmax = selectedToken.balance;
      const inputMax = formatBalance(selectedToken);
      inputRef.current.setValue(inputMax);
      formik.setFieldValue("amount", realmax, false);
    }
  };

  const handleChange = (val: string) => {
    formik.setFieldValue("amount", val, false);
  };
  const transformValue = (val: string) => {
    return setElrondBalance(Number(val), selectedToken.decimals);
  };

  return (
    <FormControl isInvalid={formik.errors.amount && formik.touched.amount}>
      <Flex justifyContent={"space-between"} w="full" alignItems={"flex-end"}>
        <FormLabel>Amount</FormLabel>
        {selectedToken && (
          <Text color="gray.500" fontSize={"sm"} mb="1">
            Available:{formatBalance(selectedToken)}{" "}
            {formatTokenI(selectedToken.identifier)}
          </Text>
        )}
      </Flex>
      <Flex bg="black.base" rounded={"md"} pr="5" py="1">
        <InputText
          onChangeInput={handleChange}
          tranformValue={transformValue}
          ref={inputRef}
          placeholder="Amount"
          name="amount"
          border={"none"}
          flex={"1"}
        />
        {selectedToken && (
          <>
            <ActionButton
              variant={"ghost"}
              color="main"
              _hover={{
                bg: "transparent",
                color: "white",
              }}
              onClick={handleMax}
            >
              MAX
            </ActionButton>
            <Menu>
              <MenuButton
                as={Flex}
                w="auto"
                alignItems={"center"}
                gap={2}
                bg="black.light"
                borderLeftRadius={"25px !important"}
                borderRightRadius={"15px"}
                p="2px"
                pr="4"
                cursor={"pointer"}
                onClick={onToggleTokensModal}
                sx={{
                  ">span": {
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  },
                }}
              >
                <Image
                  src={selectedToken.assets.svgUrl}
                  alt="token"
                  width={40}
                  height={40}
                />
                <Text>{formatTokenI(selectedToken.identifier)}</Text>
                <Icon as={ChevronDownIcon} />
              </MenuButton>
              <MenuList maxH={"250px"} overflow={"auto"} bg="black.light">
                {tokens.map((token) => {
                  const tPrice =
                    token.identifier === "EGLD" ? price : token.price;
                  return (
                    <MenuItem
                      key={token.identifier}
                      bg="black.light"
                      _hover={{
                        bg: "black.base",
                      }}
                      onClick={() => setSelectedToken(token)}
                    >
                      <Flex w="full">
                        <Box mr={4}>
                          {token.assets?.img ? (
                            token.assets?.img
                          ) : (
                            <>
                              {formatTokenI(token.name).slice(-2) === "LP" ? (
                                <LpTokenImage lpToken={token} />
                              ) : (
                                <>
                                  {token.assets?.svgUrl ||
                                  token.assets?.static.src ? (
                                    <Box
                                      boxSize={"24px"}
                                      borderRadius={"full"}
                                      boxShadow={
                                        "rgb(255 255 255 / 8%) 0px 6px 10px"
                                      }
                                      overflow={"hidden"}
                                    >
                                      <Image
                                        src={
                                          token.assets?.svgUrl ||
                                          token.assets?.static.src ||
                                          ""
                                        }
                                        alt={token.assets?.description || ""}
                                        width={30}
                                        height={30}
                                      />
                                    </Box>
                                  ) : (
                                    <Box
                                      boxSize={"24px"}
                                      borderRadius={"full"}
                                      bg="brand.200"
                                      boxShadow={
                                        "rgb(255 255 255 / 8%) 0px 6px 10px"
                                      }
                                    />
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </Box>
                        <Flex w="full" justifyContent={"space-between"}>
                          {formatTokenI(token.identifier)}
                          <Flex>
                            {tPrice
                              ? `$${formatBalanceDolar(token, tPrice, true)}`
                              : "-$"}
                          </Flex>
                        </Flex>
                      </Flex>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
          </>
        )}
      </Flex>
    </FormControl>
  );
};

export default memo(AmountField, (prev, next) => {
  const areTokensEqual = isEqual(prev.tokens, next.tokens);
  return prev.selectedToken === next.selectedToken && areTokensEqual;
});
