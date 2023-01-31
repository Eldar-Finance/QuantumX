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
import CutomTooltip from "components/CustomTooltip/CustomTooltip";
import TokenList from "components/TokenList/TokenList";
import orderBy from "lodash/orderBy";
import * as React from "react";
import { useAppSelector } from "utils/hooks/redux";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";

const CurrencyModal = ({ isOpen, onClose, handleClickToken }) => {
  const [order, setOrder] = React.useState<"desc" | "asc">("desc");
  const tokens = useAppSelector((state) => state.smartSwap.tokens.data);
  const { tokens: elrondTokens } = useGetMultipleElrondTokens(tokens);
  const [tokenList, setTokenList] = React.useState([]);

  // React.useEffect(() => {
  //   setTokenList(elrondTokens);
  // }, [elrondTokens]);

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
            <Flex justifyContent={"space-between"} mt={6} mb={4}>
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
