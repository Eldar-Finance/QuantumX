import { Box } from "@chakra-ui/react";
import Badge from "components/Badge/Badge";
import Link from "next/link";

interface IProps {
  href: string;
  name: string;
  onlyMobile?: boolean;
  soon?: boolean;
  isNew?: boolean;
  textColor?: string;
}

const MenuItem = ({ href, onlyMobile, soon, name, isNew, textColor }: IProps) => {
  const mobileProps = {
    display: { lg: "none", xs: "block" },
  };
  const aditionalProps = onlyMobile ? mobileProps : {};
  return (
    <Box w={"full"} display="flex">
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
          <Box w="full" py={3} px={5} textColor={textColor}>
            {name}
          </Box>
        </Box>
      )}
      {isNew && <Badge text="New" top={4} right={4}></Badge>}
    </Box>
  );
};

export default MenuItem;
