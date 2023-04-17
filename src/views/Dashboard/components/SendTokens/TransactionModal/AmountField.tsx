import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import LpTokenImage from "components/LpTokenImage/LpTokenImage";
import Image from "next/image";
import { memo } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";

const AmountField = ({ selectedToken, setSelectedToken, tokens }) => {
  const { onToggle: onToggleTokensModal } = useDisclosure();
  const formik = {
    errors: {
      amount: "",
    },
    handleChange: (e) => {
      console.log(e);
    },
    touched: {
      amount: false,
    },
  };
  console.log("sd");

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
        <Input
          onChange={formik.handleChange}
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
            >
              MAX
            </ActionButton>
            <Menu>
              <Flex
                as={MenuButton}
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
              </Flex>
              <MenuList maxH={"250px"} overflow={"auto"} bg="black.light">
                {tokens.map((token) => (
                  <MenuItem
                    key={token.identifier}
                    bg="black.light"
                    _hover={{
                      bg: "black.base",
                    }}
                    onClick={() => setSelectedToken(token)}
                  >
                    <Flex>
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
                      {formatTokenI(token.identifier)}
                    </Flex>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </>
        )}
      </Flex>
    </FormControl>
  );
};

export default memo(AmountField, (prev, next) => {
  return prev.selectedToken === next.selectedToken;
});
