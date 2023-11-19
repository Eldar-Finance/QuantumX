import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Image,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import LpTokenImage from "components/LpTokenImage/LpTokenImage";
import dynamic from "next/dynamic";

const CurrencyModal: any = dynamic(() =>
  import("../CurrencyModal/CurrencyModal")
);

const SelectCurrency = ({ token, handleClickToken, field, disable, swapTokens }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClickTokenAndClose = (data) => {
    onClose();
    handleClickToken(data);
  };

  return (
    <>
      {token ? (
        <Button
          variant="unstyled"
          sx={{
            borderRadius: "12px",
            display: "flex",
            cursor: "pointer",
            position: "relative",
          }}
          px={{ xs: "10px", md: "15px" }}
          bg="black.base"
          _hover={{
            background: "rgba(255,255,255,0.1)",
          }}
          display={"flex"}
          alignItems={"center"}
          onClick={onOpen}
          disabled={disable}
        >
          {token.name.slice(-2) === "LP" ? (
            <Box marginRight={2} minW="54px">
              <LpTokenImage lpToken={token} />
            </Box>
          ) : (
            <Box
              sx={{
                borderRadius: "1.5rem",
                width: "24px",
                height: "24px",
                marginRight: 2,
                boxShadow: "rgb(255 255 255 / 8%) 0px 6px 10px",
              }}
            >
              {token.assets?.img ? (
                token.assets?.img
              ) : (
                <Image
                  src={token.assets?.svgUrl || token.assets?.static.src || ""}
                  alt={token.assets?.description || ""}
                />
              )}
            </Box>
          )}
          <Box
            sx={{
              flex: "1",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Text fontSize={"md"}>
                {token.ticker === token.identifier
                  ? token.name || token.ticker || ""
                  : token.ticker || token.name || ""}
              </Text>
            </Box>
            <Center
              ml={2}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              color="main"
            >
              <ChevronDownIcon />
            </Center>
          </Box>
        </Button>
      ) : (
        <Center width={"170px"}>
          <Spinner />
        </Center>
      )}
      {isOpen && (
        <CurrencyModal
          field={field}
          isOpen={isOpen}
          onClose={onClose}
          handleClickToken={handleClickTokenAndClose}
          swapTokens={swapTokens}
        />
      )}
    </>
  );
};

export default SelectCurrency;
