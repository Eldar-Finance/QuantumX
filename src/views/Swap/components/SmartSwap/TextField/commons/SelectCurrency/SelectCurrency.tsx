import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
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

const SelectCurrency = ({ token, handleClickToken, field }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClickTokenAndClose = (data) => {
    onClose();
    handleClickToken(data);
  };

  return (
    <>
      {token ? (
        <Box
          sx={{
            borderRadius: "12px",
            padding: { xs: "10px", md: "10px 15px" },
            display: "flex",
            cursor: "pointer",
            position: "relative",
          }}
          bg="black.base"
          _hover={{
            background: "rgba(255,255,255,0.1)",
          }}
          display={"flex"}
          alignItems={"center"}
          onClick={onOpen}
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
                display: {
                  xs: "none",
                  md: "block",
                },
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
              mr={-2}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              color="main"
            >
              <ChevronDownIcon />
            </Center>
          </Box>
        </Box>
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
        />
      )}
    </>
  );
};

export default SelectCurrency;
