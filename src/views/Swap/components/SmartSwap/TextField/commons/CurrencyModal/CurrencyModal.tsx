import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import CutomTooltip from "components/CustomTooltip/CustomTooltip";
import LpTokenImage from "components/LpTokenImage/LpTokenImage";
import TokenList from "components/TokenList/TokenList";
import orderBy from "lodash/orderBy";
import * as React from "react";
import { selectFromToken } from "redux/slices/smartSwaps/smartSwaps";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetTopSmartSwapTokens from "utils/hooks/useGetTopSmartSwapTokens";
import { IElrondToken } from "utils/types/elrond.interface";
import useSelectSmarSwapTokens from "views/Swap/hooks/useSelectSmarSwapTokens";

interface IProps {
  field: "from" | "to";
  isOpen: boolean;
  onClose: () => void;
  handleClickToken: (t: IElrondToken) => void;
}

const CurrencyModal = ({
  isOpen,
  onClose,
  handleClickToken,
  field,
}: IProps) => {
  const [order, setOrder] = React.useState<"desc" | "asc">("desc");
  const tokens = useAppSelector((state) => state.smartSwap.tokens);
  const fromTokenIdentifier = useAppSelector(selectFromToken);
  const { tokens: topTokens } = useGetTopSmartSwapTokens();
  const [tokenList, setTokenList] = React.useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;

    if (query === "") {
      setTokenList(null);
    } else {
      const newTokenList = elrondTokens.filter((token) => {
        return (
          token.ticker
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        );
      });

      setTokenList(newTokenList);
    }
  };

  const handleOrder = () => {
    const orderTokens = orderBy(
      elrondTokens,
      [
        function(o) {
          return o.name.toString().toLowerCase();
        },
      ],
      order
    );

    setTokenList(orderTokens);
    setOrder(() => {
      if (order === "desc") {
        return "asc";
      } else {
        return "desc";
      }
    });
  };

  const { elrondTokens } = useSelectSmarSwapTokens(
    fromTokenIdentifier,
    tokens,
    field
  );
  const { tokens: topElrondTokens } = useGetMultipleElrondTokens(topTokens);
  const diplayTokens =
    tokenList && tokenList.length > 0 ? tokenList : elrondTokens;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay background={"rgba(0,0,0,0.7)"} />

      <ModalContent
        background={"black.base"}
        borderRadius={"20px"}
        pt={6}
        width={"90%"}
        maxWidth={"420px"}
      >
        <Flex px={"20px"} alignItems={"center"}>
          <Text fontSize={"md"} mr={3}>
            Select a token
          </Text>
          <CutomTooltip
            text={"Find a token by searching for its name or symbol."}
          />
        </Flex>

        <ModalCloseButton
          border="none"
          outline={"none"}
          _focus={{ boxShadow: "none" }}
        />

        <ModalBody px={0}>
          <Box px={"20px"}>
            <Input onChange={handleSearch} />
            <Flex flexWrap={"wrap"} w="full" gap={3} mt={3}>
              {topElrondTokens.map((t) => {
                return (
                  <Center
                    key={t.identifier}
                    border="1px solid"
                    borderColor={"GrayText"}
                    rounded="md"
                    px={2}
                    py={1}
                    cursor="pointer"
                    _hover={{
                      background: "main",
                      color: "black",
                    }}
                    onClick={() => handleClickToken(t)}
                    as={Button}
                    disabled={
                      field === "from" &&
                      formatTokenI(t.name).slice(-2) === "LP"
                    }
                  >
                    {formatTokenI(t.name).slice(-2) === "LP" ? (
                      <LpTokenImage lpToken={t} />
                    ) : (
                      <>
                        {t.assets?.svgUrl || t.assets?.static.src ? (
                          <Image
                            boxSize={"24px"}
                            borderRadius={"full"}
                            boxShadow={"rgb(255 255 255 / 8%) 0px 6px 10px"}
                            src={t.assets?.svgUrl || t.assets?.static.src || ""}
                            alt={t.assets?.description || ""}
                          />
                        ) : (
                          <Box
                            boxSize={"24px"}
                            borderRadius={"full"}
                            bg="brand.200"
                            boxShadow={"rgb(255 255 255 / 8%) 0px 6px 10px"}
                          />
                        )}
                      </>
                    )}
                    <Text ml={2}>
                      {t.identifier !== t.ticker
                        ? t.ticker || t.name || t.identifier || ""
                        : t.name || t.ticker || t.identifier || ""}
                    </Text>
                  </Center>
                );
              })}
            </Flex>
            <Flex justifyContent={"space-between"} mt={6}>
              <Text>Token Name</Text>
              <IconButton
                aria-label="Invert Order"
                background={"gray.800"}
                borderRadius={"5px"}
                height={"auto"}
                textColor={"gray.200"}
                _hover={{
                  background: "none",
                  outline: "none",
                }}
                _active={{
                  background: "none",
                  outline: "none",
                }}
                onClick={handleOrder}
              >
                {order === "desc" ? (
                  <ArrowDownIcon color="inherit" fontSize={"md"} />
                ) : (
                  <ArrowUpIcon color="inherit" fontSize={"md"} />
                )}
              </IconButton>
            </Flex>
          </Box>
          <TokenList
            handleClickToken={handleClickToken}
            tokens={diplayTokens}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default CurrencyModal;
