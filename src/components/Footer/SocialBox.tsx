import { Center, Link, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface IProps {
  href: string;
  name: string;
  icon: ReactNode;
}

const SocialBox = ({ href, name, icon }: IProps) => {
  return (
    <motion.button whileHover={{ scale: 1.1 }}>
      <Link href={href} isExternal>
        <Center>
          <Center
            boxSize={{ xs: "30px", md: "35px" }}
            bg="black.dark"
            borderRadius={"md"}
          >
            {icon}
          </Center>
          <Text
            ml={{ xs: "8px", md: "15px" }}
            fontSize={{ xs: "10px", md: "md" }}
          >
            {name}
          </Text>
        </Center>
      </Link>
    </motion.button>
  );
};

export default SocialBox;
