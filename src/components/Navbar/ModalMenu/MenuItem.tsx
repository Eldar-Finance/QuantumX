import { Box } from "@chakra-ui/react";
import Link from "next/link";

interface IProps {
  href: string;
  name: string;
  onlyMobile?: boolean;
  soon?: boolean;
}

const MenuItem = ({ href, onlyMobile, soon, name }: IProps) => {
  const mobileProps = {
    display: { lg: "none", xs: "block" },
  };
  const aditionalProps = onlyMobile ? mobileProps : {};
  return (
    <Box w={"full"}>
      {soon ? (
        <Box
          w="full"
          _hover={{
            bg: "black.base",
            fontWeight: "bold",
          }}
          {...aditionalProps}
        >
          <Box w="full" py={3} px={5}>
            {name} (soon)
          </Box>
        </Box>
      ) : (
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
      )}
    </Box>
  );
};

export default MenuItem;
