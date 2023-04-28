import { Heading } from "@chakra-ui/react";
import useGetQTag from "views/Tags/hooks/useGetQTag";

interface IProps {
  claimed?: boolean;
}

const HeadingSection = ({ claimed }: IProps) => {
  const tag = useGetQTag();

  return (
    <Heading mb={8} as="h1" fontSize={"3xl"} textAlign={"center"}>
      {claimed ? `Hello, ${tag}` : "Claim your QuantumxTag"}
    </Heading>
  );
};

export default HeadingSection;
