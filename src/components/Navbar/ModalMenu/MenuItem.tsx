import { Box } from "@chakra-ui/react";
import Link from "next/link";

interface IProps {
  href: string;
  name: string;
}

const MenuItem = ({ href, name }: IProps) => {
  return (
    <Box
      as={Link}
      href={href}
      passHref
      w="full"
      _hover={{
        bg: "black.base",
        fontWeight: "bold",
      }}
    >
      <Box w="full" py={3} px={5}>
        {name}
      </Box>
    </Box>
  );
};

export default MenuItem;
