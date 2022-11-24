import { Center, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

const AmountBox1 = () => {
  return (
    <GradientBox
      p="25px"
      textAlign={"center"}
      flexDir="column"
      borderRadius={"xl"}
    >
      <Text color="main">TOTAL VALUE LOCKED</Text>
      <Text>$ 129,355,689</Text>
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
