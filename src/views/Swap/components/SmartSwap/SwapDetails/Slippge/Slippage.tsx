import { Box, Center, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { SwapIcon } from "components/Icons/ui";
import {
  selectSlippage,
  updateSlippage,
} from "redux/slices/smartSwaps/smartSwaps";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";

const slippageSlecctions = [0.5, 1, 5];

const Slippage = () => {
  const slipapge = useAppSelector(selectSlippage);
  const dispatch = useAppDispatch();
  const handleUpdateSlippage = (newSlippage: number) => {
    dispatch(updateSlippage(newSlippage));
  };
  return (
    <Flex w="full" gap={"15px"} alignItems="flex-start">
      <Center bg="black.base" boxSize={"44px"} borderRadius="full">
        <Icon as={SwapIcon} />
      </Center>
      <Box flex={1}>
        <Text flex={1} fontSize={{ xs: "sm", md: "18px" }} mb={2} mt={2}>
          Slippage
        </Text>

        <Box>
          <Text color="white.500" mb={3}>
            Your transaction will revert if the output amount is more than 1%
            below the one displayed.
          </Text>

          <Flex w="full" gap={2}>
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

            <Flex
              border={"1px solid"}
              flex={1}
              borderColor={"main"}
              borderRadius="md"
            >
              <Input
                h="auto"
                outline={"none"}
                border="none"
                placeholder="Custom"
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
                }}
                _focusVisible={{
                  outline: "none",
                  border: "none",
                }}
                onChange={(e) => handleUpdateSlippage(Number(e.target.value))}
              />
              <Center px={3}>%</Center>
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
      border={"1px solid"}
      borderColor={"main"}
      bg={active ? "main" : "transparent"}
      color={active ? "black" : "white"}
      px={"15px"}
      py="10px"
      borderRadius={"md"}
      cursor="pointer"
      _hover={{
        bg: "main",
        color: "black",
      }}
      onClick={onClick}
    >
      {slippage}%
    </Box>
  );
};
