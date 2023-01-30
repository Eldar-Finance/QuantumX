import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { claimTokens } from "api/sc/calls/swap/fastSwap";

import Image from "next/image";
import { Fragment, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectClaimable } from "redux/slices/fastSwap/fastSwap";
import { fetchClaimableTokens } from "redux/slices/fastSwap/funcs";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch } from "utils/hooks/redux";

const ClaimSection = ({ tokenWithDeatils, position = "absolute" }) => {
  const dispatch = useAppDispatch();
  const { data: claimableTokens } = useSelector(selectClaimable);
  const address = useSelector(selectUserAddress);

  useEffect(() => {
    if (tokenWithDeatils.length > 0 && address) {
      const allowedTokens: string[] = tokenWithDeatils.map(
        (td) => td.identifier
      );
      dispatch(fetchClaimableTokens({ allowedTokens: allowedTokens, address }));
    }
  }, [address, tokenWithDeatils, dispatch]);
  const tokens = claimableTokens.filter((t) => t.amount > 0);

  const onCliam = () => {
    const tokensIdentifers = tokens.map((t) => t.tokenI);
    claimTokens(tokensIdentifers);
  };

  return (
    <Center
      flexDir={"column"}
      mt={8}
      //@ts-ignore
      position={position || "absolute"}
      top={"60px"}
      w="full"
    >
      {tokens.length === 0 ? (
        <Center as="h3" fontSize="xl" fontWeight={"bold"} mb={2}>
          No tokens to claim yet
        </Center>
      ) : (
        <Fragment>
          <Text as="h3" fontSize="xl" fontWeight={"bold"} mb={2}>
            Waiting for you...
          </Text>
          <Center gap={1} flexDir={"column"}>
            {tokens.map((t) => {
              const tokenDetail = tokenWithDeatils.find(
                (td) => td.identifier === t.tokenI
              );
              if (!tokenDetail) {
                return null;
              }
              return (
                <Flex gap={2} key={t.tokenI}>
                  <Text>
                    {formatBalance({
                      balance: t.amount,
                      decimals: tokenDetail.decimals,
                    })}
                  </Text>
                  <Flex gap={1}>
                    <Box boxSize={"15px"}>
                      <Image
                        width={15}
                        height={15}
                        src={
                          tokenDetail.assets?.svgUrl ||
                          tokenDetail.assets?.static.src ||
                          ""
                        }
                        alt={tokenDetail.name}
                        style={{
                          maxWidth: "100%",
                          height: "auto"
                        }} />
                    </Box>
                    <Text>{formatTokenI(t.tokenI)}</Text>
                  </Flex>
                </Flex>
              );
            })}
          </Center>
        </Fragment>
      )}

      <Flex>
        <Button
          mt={6}
          height={"auto"}
          variant={"ghost"}
          borderRadius={"12px"}
          py={"10px"}
          px={"80px"}
          width={"full"}
          background={"#24918a"}
          _hover={{
            background: "#137972",
          }}
          _active={{
            background: "#137972",
          }}
          onClick={onCliam}
          disabled={tokens.length === 0}
        >
          Claim
        </Button>
      </Flex>
    </Center>
  );
};

export default ClaimSection;
