import { Center, Link } from "@chakra-ui/react";

const LearnMore = () => {
  return (
    <Center mb={10} w="full">
      <Link href="https://" isExternal textDecoration={"underline"}>
        Learn about QuantumXTag
      </Link>
    </Center>
  );
};

export default LearnMore;
