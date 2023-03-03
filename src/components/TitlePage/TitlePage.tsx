import { Center, CenterProps, Heading } from "@chakra-ui/react";

interface TitlePageProps extends CenterProps {
  title: string;
  subtitle?: string;
}

const TitlePage = ({ title, subtitle, ...props }: TitlePageProps) => {
  return (
    <Center textAlign={"center"} flexDir="column" {...props}>
      <Heading mb={8} as="h1" fontSize={"3xl"}>
        {title}
      </Heading>
      {subtitle && (
        <Heading fontSize={"md"} color="white.400">
          Convert your tokens to RARE
        </Heading>
      )}
    </Center>
  );
};

export default TitlePage;
