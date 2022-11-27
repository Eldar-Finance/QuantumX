import { Box } from "@chakra-ui/react";
import Link from "next/link";

interface IProps {
  href: string;
  name: string;
  onlyMobile?: boolean;
}

const MenuItem = ({ href, onlyMobile, name }: IProps) => {
  const mobileProps = {
    display: { lg: "none", xs: "block" },
  };
  const aditionalProps = onlyMobile ? mobileProps : {};
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
      {...aditionalProps}
    >
      <Box w="full" py={3} px={5}>
        {name}
      </Box>
    </Box>
  );
};

export default MenuItem;
