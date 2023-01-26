import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { formatBalance } from "utils/functions/formatBalance";

const TokenItem = ({ token, onClick, showIdent, showBalance, hoverBg }) => {
  return (
    <Flex
      px={"20px"}
      py={3}
      cursor={"pointer"}
      _hover={{
        background: hoverBg || "brand.700",
      }}
      justifyContent={showBalance && "space-between"}
      onClick={() => onClick(token)}
      borderRadius="md"
    >
      <Flex>
        <Box mr={4}>
          {token.assets?.img ? (
            token.assets?.img
          ) : (
            <>
              {token.assets?.svgUrl || token.assets?.static.src ? (
                <Image
                  boxSize={"24px"}
                  borderRadius={"full"}
                  boxShadow={"rgb(255 255 255 / 8%) 0px 6px 10px"}
                  src={token.assets?.svgUrl || token.assets?.static.src || ""}
                  alt={token.assets?.description || ""}
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
        </Box>
        {showIdent ? (
          <Text>{token.identifier || token.ticker || token.name || ""}</Text>
        ) : (
          <Text>{token.ticker || token.name || token.identifier || ""}</Text>
        )}
      </Flex>
      {showBalance && (
        <Box>
          <Text>{formatBalance(token)}</Text>
        </Box>
      )}
    </Flex>
  );
};

export default TokenItem;
