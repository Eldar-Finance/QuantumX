import { useOutsideClick, Grid, Button, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Zap, Star, Moon, Layout, Settings } from "lucide-react";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { admins } from "utils/constants/site";
import { useAppSelector } from "utils/hooks/redux";
import { useRouter } from 'next/router'; // Import useRouter hook

interface IProps {
  onClose: () => void;
}

const ModalMenu = ({ onClose }: IProps) => {
  const address = useAppSelector(selectUserAddress);
  const router = useRouter(); // Initialize useRouter hook
  const ref = useRef();
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  const handleItemClick = (path: string, name: string) => {
    router.push(path); // Use router.push to redirect
    onClose();
  };

  const menuItems = [
    { name: "Rewards", icon: Zap, color: "linear-gradient(to bottom right, indigo.500, purple.500)", route: "/qrewards" },
    { name: "MoonDustX", icon: Moon, color: "linear-gradient(to bottom right, gray.500, blue.500)", route: "/moondustx" },
    { name: "Quantum Panel", icon: Layout, color: "linear-gradient(to bottom right, green.500, blue.500)", route: "/panel" },
    { name: "Admin", icon: Settings, color: "linear-gradient(to bottom right, pink.500, purple.500)", route: "/admin-panel", adminOnly: true },
  ];

  const visibleMenuItems = menuItems.filter(item => !item.adminOnly || admins.includes(address));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)', // Add some space below the menu button
        right: 0, // Align to the right edge of the menu button
        zIndex: 9999, // Maximum safe integer value for z-index
      }}
      ref={ref}
    >
      <Card
        w={{base: "90vw", sm: "45vw", md: "28vw"}}
        mt={2}
        zIndex={9999}
        boxShadow={"0px 0px 20px 4px rgba(0,0,0,0.8)"}
        // ... other Card props ...
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={4} zIndex={9999}>
          {visibleMenuItems.map((item) => (
            <Button
              key={item.name}
              onClick={() => handleItemClick(item.route, item.name)}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={4}
              borderRadius="xl"
              bgGradient={item.color}
              color="white"
              height="auto"
              _hover={{ transform: 'scale(1.05)' }}
              _active={{ transform: 'scale(0.95)' }}
            >
              <item.icon size={32} style={{ marginBottom: '8px' }} />
              <Text fontSize="sm" fontWeight="bold" textAlign="center">{item.name}</Text>
            </Button>
          ))}
        </Grid>
      </Card>
    </motion.div>
  );
};

export default ModalMenu;
