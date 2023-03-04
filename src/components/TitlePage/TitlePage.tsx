import { Center, CenterProps, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TitlePageProps extends CenterProps {
  title: string;
  subtitle?: ReactNode;
}

const TitlePage = ({ title, subtitle, ...props }: TitlePageProps) => {
  return (
    <Center textAlign={"center"} flexDir="column" {...props}>
      <Heading mb={8} as="h1" fontSize={"3xl"}>
        {title}
      </Heading>
      {subtitle && (
        <Heading fontSize={"md"} color="white.400">
          {subtitle}
        </Heading>
      )}
    </Center>
  );
};

export default TitlePage;
