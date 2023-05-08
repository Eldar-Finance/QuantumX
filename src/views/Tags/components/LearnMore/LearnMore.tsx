import { Center, Link } from "@chakra-ui/react";

const LearnMore = () => {
  return (
    <Center mb={10} w="full">
      <Link href="https://docs.quantumx.network/quantumxtags" isExternal textDecoration={"underline"}>
        Learn about QuantumXTags
      </Link>
    </Center>
  );
};

export default LearnMore;
