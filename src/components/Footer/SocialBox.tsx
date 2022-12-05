import { Center, Link, Text } from "@chakra-ui/react";
import { BookIcon } from "components/Icons/ui";

interface IProps {
  href: string;
  name: string;
}

const SocialBox = ({ href, name }: IProps) => {
  return (
    <Link href={href} isExternal>
      <Center>
        <Center boxSize={"35px"} bg="black.dark" borderRadius={"md"}>
          <BookIcon />
        </Center>
        <Text ml="15px" fontSize={{ xs: "sm", md: "md" }}>
          {name}
        </Text>
      </Center>
    </Link>
  );
};

export default SocialBox;
