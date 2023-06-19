import { Box, Flex, Image } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import {
  selectAllTokens,
  selectToToken,
  selectToTokenDust,
} from "redux/slices/moondustx/moondustx-slice";
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { toTokensToConvert } from "views/MoonDustX/utils/contants";
import ConvertButton from "./ConvertButton/ConvertButton";
import ConvertInfo from "./ConvertInfo/ConvertInfo";
import SelectTokens from "./SelectTokens/SelectTokens";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";

const MoonDustXCard = () => {
  const dispatch = useAppDispatch();
  const selectedToToken = useAppSelector(selectToTokenDust);
  
  const tokens = useAppSelector((state) => state.smartSwap.tokens);

  const { tokens: finalTokens } = useGetMultipleElrondTokens(toTokensToConvert);

  return (
    <Flex
      flexDir={"column"}
      bg="secondary"
      p={10}
      px={{ xs: 1, md: 7 }}
      borderRadius={{ xs: "2xl", md: "4xl" }}
    >
      <Flex
        w="full"
        justifyContent={{ xs: "center", md: "space-between" }}
        mb={8}
        px={{xs: 3, md: 1}}
        gap={{ xs: 5, md: 1 }}
        flexFlow={{ xs: "wrap", md: "row" }}
      >
        {finalTokens.map((tokenI) => {
          return (
            <ActionButton
              key={tokenI.identifier}
              variant={selectedToToken === tokenI.identifier ? "solid" : "outline"}
              onClick={() => dispatch(selectToToken(tokenI.identifier))}
              // gap={1}
              alignItems="center" justifyContent={"center"}
            >
              {formatTokenI(tokenI.identifier)}
              <Flex alignItems="center" w="full" justifyContent={"center"}>
                {tokenI?.assets && (
                  <Box rounded={"full"} boxSize={{ sm: "28px", md: "32px" }} pl={1}>
                    <Image alt="" src={tokenI.assets.svgUrl} width={30} height={30}/>
                  </Box>
                )}
              </Flex>
            </ActionButton>
          );
        })}
      </Flex>
      <SelectTokens />
      <Flex w="full" mt={4}>
        <ActionButton onClick={() => dispatch(selectAllTokens())}>
          Select All
        </ActionButton>
      </Flex>
      <ConvertInfo />
      <ConvertButton />
    </Flex>
  );
};

export default MoonDustXCard;
