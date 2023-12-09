import { useOutsideClick } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { motion } from "framer-motion";
import { useRef } from "react";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { admins } from "utils/constants/site";
import { useAppSelector } from "utils/hooks/redux";
import { routesArr } from "utils/routes";
import MenuItem from "./MenuItem";

interface IProps {
  onClose: () => void;
}

const ModalMenu = ({ onClose }: IProps) => {
  const address = useAppSelector(selectUserAddress);
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
      w={"auto"}
      position={"absolute"}
      right={0}
      top={{sm: "120%", md: "130%"}}
      zIndex={20} // @ts-ignore
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      borderRadius="md"
      color="white"
      flexDir={"column"}
      p={0}
      overflow="hidden"
      fontSize={{ xs: "inherit", md: "inherit" }}
      boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.8)"}

    >
      {routesArr.map((route) => {
        if (!route.onModal && !route.onModalAndNavbar) {
          return null;
        }

        if (route.forAdmins) {
          if (!admins.includes(address)) {
            return null;
          }
        }
        return (
          <MenuItem
            key={route.path}
            href={route.path}
            name={route.name}
            soon={route.soon}
            isNew={route.isNew}
            onlyMobile={route.onModalAndNavbar}
            textColor={route.color}
          />
        );
      })}
    </Card>
  );
};

export default ModalMenu;
