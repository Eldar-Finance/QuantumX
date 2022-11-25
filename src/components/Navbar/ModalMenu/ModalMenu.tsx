import { useOutsideClick } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { motion } from "framer-motion";
import { useRef } from "react";
import MenuItem from "./MenuItem";

interface IProps {
  onClose: () => void;
}

const ModalMenu = ({ onClose }: IProps) => {
  const ref = useRef();
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  return (
    <Card
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      as={motion.div}
      w="250px"
      position={"absolute"}
      right={0}
      top={70}
      zIndex={20} // @ts-ignore
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      borderRadius="md"
      color="white"
      flexDir={"column"}
      p={0}
      overflow="hidden"
    >
      <MenuItem href="/eLBadges" name="SFT Staking" />
      <MenuItem href="/investor-zone" name="Investors" />
      <MenuItem href="/admin-panel" name="Admin Panel" />
    </Card>
  );
};

export default ModalMenu;
