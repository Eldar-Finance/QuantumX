import { Box, Center, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { SwapIcon } from "components/Icons/ui";
import {
  selectSlippage,
  updateSlippage,
} from "redux/slices/smartSwaps/smartSwaps";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { CiRoute } from "react-icons/ci";
import { MdCurrencyExchange } from "react-icons/md";
import { useState } from "react";
const slippageSlecctions = [0.5, 1, 5];

const Slippage = () => {
  const [usesInput, setUsesInput] = useState(false);
  const slipapge = useAppSelector(selectSlippage);
  const dispatch = useAppDispatch();
  const handleUpdateSlippage = (newSlippage: number) => {
    dispatch(updateSlippage(newSlippage));
  };
  return (
    <Flex
      w="full"
      gap={"10px"}
      alignSelf={"flex-start"}
      bg={"black.baseDark"}
      p={2}
      borderRadius={"20px"}
    >
      <Center bg="black.base" boxSize={"34px"} borderRadius="full">
        <MdCurrencyExchange size={"18"} color="#22F7DD"/>
      </Center>
      <Box flex={1}>
        <Text flex={1} fontSize={'16px'} my={1}>
          Slippage
        </Text>

        <Box>
          <Text color="white.500" mb={3} fontSize={"sm"}>
            The swap will fail if the price increases more than{" "}
            {slipapge}%.
          </Text>

          <Flex w="full" gap={2} direction={"row"}>
            <Flex gap={1}>
              {slippageSlecctions.map((slippageOption) => {
                return (
                  <SlippageBox
                    key={slippageOption}
                    slippage={slippageOption}
                    active={slippageOption === slipapge}
                    onClick={() => handleUpdateSlippage(slippageOption)}
                  />
                );
              })}
            </Flex>

            <Flex
              borderRadius="md"
              maxW={"65px"}
              gap={1}
              bg={slipapge && slippageSlecctions.includes(slipapge) ? "none" : "main"}
              color={slipapge && slippageSlecctions.includes(slipapge) ? "white.500" : "black"}
            >
              <Input
                px={0}
                textAlign={"center"}
                fontSize={"sm"}
                // bg={slipapge && slippageSlecctions.includes(slipapge) ? "none" : "main"}
                h="auto"
                outline={"none"}
                border="none"
                placeholder="custom %"
                _active={{
                  outline: "none",
                  border: "none",
                }}
                _activeLink={{
                  outline: "none",
                  border: "none",
                }}
                _focus={{
                  outline: "none",
                  border: "none",
                  // color: "main",
                }}
                _focusVisible={{
                  outline: "none",
                  border: "none",
                  // color: "main",
                }}
                onChange={(e) => handleUpdateSlippage(Number(e.target.value))}
              />
              <Text
                h="auto"
                py={1}
                mr={1}
                alignSelf={"center"}
                justifySelf={"flex-start"}
                fontSize={"sm"}
                // color={"white.500"}
              > {
                slipapge && !slippageSlecctions.includes(slipapge) ? '%' : " "
              } </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Slippage;

interface IProps {
  slippage: number;
  active?: boolean;
  onClick: () => void;
}

const SlippageBox = ({ slippage, active, onClick }: IProps) => {
  return (
    <Box
      bg={active ? "main" : "transparent"}
      color={active ? "black" : "main"}
      borderRadius={"15px"}
      cursor="pointer"
      _hover={{
        bg: "main",
        color: "black",
      }}
      maxW={"60px"}
      fontSize={"sm"}
      onClick={onClick}
      textAlign="center"
      alignSelf={"center"}
      p={1}
      w={"40px"}
    >
      {slippage}%
    </Box>
  );
};
