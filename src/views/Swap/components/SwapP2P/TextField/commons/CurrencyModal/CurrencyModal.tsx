import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import CutomTooltip from "components/CustomTooltip/CustomTooltip";
import TokenList from "components/TokenList/TokenList";
import orderBy from "lodash/orderBy";
import * as React from "react";
import { useAppSelector } from "utils/hooks/redux";

const CurrencyModal = ({ isOpen, onClose, handleClickToken, field }) => {
  const [order, setOrder] = React.useState<"desc" | "asc">("desc");
  const tokens = useAppSelector((state) => state.fastSwap.tokens.data);
  const fromToken = useAppSelector((state) => state.fastSwap.fromToken);
  const [tokenList, setTokenList] = React.useState(tokens);

  React.useEffect(() => {
    const allowTokenToSwap = tokens.filter((token) => {
      if (field === "from") {
        if (token.identifier === toknesID.egld) {
          return false;
        } else {
          return true;
        }
      }
      return true;
      // // // toToken

      // if (token.identifier === "EGLD") {
      //   return false;
      // } else {
      //   return true;
      // }
    });
    setTokenList(allowTokenToSwap);
  }, [field, fromToken, tokens]);

  const handleSearch = (e) => {
    const query = e.target.value;

    if (query === "") {
      setTokenList(tokens);
    } else {
      const newTokenList = tokens.filter((token) => {
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
      tokenList,
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
            <Flex justifyContent={"space-between"} mt={6} mb={4}>
              <Text>Token Name</Text>
              <IconButton
                aria-label="Invert Order"
                p={1}
                background={"gray.800"}
                borderRadius={"5px"}
                height={"auto"}
                width={"auto"}
                minWidth={"0"}
                textColor={"gray.300"}
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
                  <ArrowDownIcon color="inherit" fontSize={"xs"} />
                ) : (
                  <ArrowUpIcon color="inherit" fontSize={"xs"} />
                )}
              </IconButton>
            </Flex>
          </Box>
          <TokenList handleClickToken={handleClickToken} tokens={tokenList} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default CurrencyModal;
