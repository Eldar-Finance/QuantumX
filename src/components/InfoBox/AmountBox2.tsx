import { Center, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { formatNumber } from "utils/functions/formatBalance";

interface IProps {
  value: number;
}

const AmountBox1 = ({ value }: IProps) => {
  return (
    <GradientBox
      py="20px"
      px="40px"
      textAlign={"center"}
      flexDir="column"
      borderRadius={"xl"}
      gap={2}
    >
      <Text color="main" fontWeight={"bold"}>TOTAL VALUE LOCKED</Text>
      {/* <Text color="main">{type}</Text> */}
      <Text fontWeight={"bold"}>$ {formatNumber(value)}</Text>
    </GradientBox>
  );
};

export default AmountBox1;

const GradientBox = styled(Center)`
  box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
  border: solid 1px transparent;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(#398396 100%, #398396 0%, #398396 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #1e1e1e inset;
`;
