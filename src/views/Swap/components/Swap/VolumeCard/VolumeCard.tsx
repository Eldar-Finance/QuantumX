import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useEffect } from "react";

import jexImg from "assets/img/proteo-board/jexpng.png";

import NextImage from "components/NextImage/NextImage";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  selectFastSwapTokens,
  selectVolume,
} from "redux/slices/fastSwap/fastSwap";
import { fetchVolume } from "redux/slices/fastSwap/funcs";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch } from "utils/hooks/redux";

const VolumeCard = () => {
  const dispatch = useAppDispatch();
  const { data: tokens } = useSelector(selectFastSwapTokens);
  const { data: volume } = useSelector(selectVolume);
  useEffect(() => {
    dispatch(fetchVolume());
  }, [dispatch]);

  return (
    <Flex
      width={"full"}
      flexDir={"column"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      pb={5}
    >
      <GradientContainerBorder
        maxWidth={"420px"}
        width={"full"}
        p={1}
        mb={0}
        borderRadius="30px"
        position="relative"
        pt={5}
      >
        <Center w="full" position="absolute">
          <NextImage src={jexImg} alt="jexImg" height={85} width={85} />
        </Center>
        <CardHeader mb={4}></CardHeader>
        <CardBody>
          <Box w="full" pb={10}>
            {volume.map((vol) => {
              const tokenDetails = tokens.find(
                (t) => t.identifier === vol.tokenI
              );
              if (!tokenDetails) {
                return null;
              }
              return (
                <Flex
                  key={vol.tokenI}
                  justifyContent={"space-between"}
                  w="full"
                >
                  <Center
                    px={3}
                    py={4}
                    borderBottom="1px solid #87b1c7"
                    flex={"40%"}
                    fontSize={{ xs: "md", lg: "xl" }}
                    fontWeight={"bold"}
                    gap="3"
                  >
                    <Image
                      width={25}
                      height={25}
                      src={
                        tokenDetails.assets?.svgUrl ||
                        tokenDetails.assets?.static.src ||
                        ""
                      }
                      alt={tokenDetails.name}
                      style={{
                        maxWidth: "100%",
                        height: "auto"
                      }} />{" "}
                    {formatTokenI(vol.tokenI)}
                  </Center>
                  <Box flex={"20%"}></Box>
                  <Center
                    flex={"40%"}
                    borderBottom="1px solid #87b1c7"
                    fontSize="xl"
                    fontWeight={"bold"}
                  >
                    {formatBalance({
                      balance: vol.amount,
                      decimals: tokenDetails.decimals,
                    })}
                  </Center>
                </Flex>
              );
            })}
          </Box>
        </CardBody>
      </GradientContainerBorder>
    </Flex>
  );
};

export default VolumeCard;

const GradientContainerBorder = styled(Card)`
  box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
  border: 4px solid #24918a;

  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #060a26 inset;
`;
