import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Repeat, // for Swap
  Sprout, // for Farms
  Droplets, // for Pools
  Compass, // Keep Compass for Hub
  MoreHorizontal,  
  Zap, // Keep Zap for Hypezone
  Award, // for Rewards  
  Moon, // Keep Moon for MoonDustX    
  LayoutDashboard, // for Quantum Panel
  Flame // Import Fire icon
} from "lucide-react";
import { Box, Flex, Text, Button, VStack, Grid, Portal, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { useRouter } from "next/router";
import BuyTab from "views/Dashboard/components/Dashtabs/BuyTab/BuyTab"; // Import BuyTab
import Link from "next/link";

const MobileMenu = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isBuyCryptoModalOpen, setIsBuyCryptoModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const router = useRouter();

  const menuItems = [
    { name: "Swap", icon: Repeat, color: "linear-gradient(to bottom right, purple.500, pink.500)", route: "/swap" },
    { name: "Farms", icon: Sprout, color: "linear-gradient(to bottom right, green.500, teal.500)", route: "/farms" },
    { name: "Pools", icon: Droplets, color: "linear-gradient(to bottom right, blue.500, cyan.500)", route: "/pools" },
    { name: "Burnium", icon: Flame, color: "linear-gradient(to bottom right, orange.500, red.500)", route: "/burnium" }, 
  ];

  const moreItems = [
    { name: "Hypezone", icon: Zap, color: "linear-gradient(to bottom right, red.500, yellow.500)", route: "/hypezone" },
    { name: "Rewards", icon: Award, color: "linear-gradient(to bottom right, indigo.500, purple.500)", route: "/qrewards" },
    { name: "MoonDustX", icon: Moon, color: "linear-gradient(to bottom right, gray.500, blue.500)", route: "/moondustx" },
    { name: "Quantum Panel", icon: LayoutDashboard, color: "linear-gradient(to bottom right, green.500, blue.500)", route: "/panel" },
    { name: "Buy Crypto", icon: Zap, color: "linear-gradient(to bottom right, blue.500, green.500)", route: "" },
    { name: "Hub", icon: Compass, color: "linear-gradient(to bottom right, orange.500, yellow.500)", route: "/hub" },
  ];

  useEffect(() => {
    const currentRoute = router.pathname;
    const allItems = [...menuItems, ...moreItems];
    const currentItem = allItems.find(item => item.route === currentRoute);
    if (currentItem) {
      setActiveItem(currentItem.name);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const handleItemClick = (e, route: string, name: string) => {
    e.preventDefault();
    setActiveItem(name);
    router.push(route, undefined, { shallow: true });
  };

  return (
    <Portal>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg="#232526"
        borderTopRadius="2xl"
        boxShadow="0px 0px 20px 4px rgba(0,0,0,0.8)"
        zIndex={9999} // Maximum z-index value
        width="100%"
        maxWidth="100%"
      >
        <Flex as="nav" justifyContent="space-between" alignItems="center" px={4} py={2}>
          {menuItems.map((item) => (
            <VStack key={item.name} spacing={0}>
              <Link href={item.route}>
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  bg={activeItem === item.name ? item.color : "#151515"}
                  bgGradient={ activeItem === item.name ? item.color : "transparent" }
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transition="all 0.3s"
                  transform={activeItem === item.name ? 'translateY(-12px) scale(1.2)' : 'translateY(0) scale(1)'}
                  scale={activeItem === item.name ? 1 : 0.8}
                >
                  <item.icon size={ activeItem === item.name ? 20 : 18 } />
                </Box>
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  mt={1}
                  opacity={activeItem === item.name ? 1 : 0.5}
                  transition="all 0.3s"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {item.name}
                </Text>
              </Link>
            </VStack>
          ))}
          <VStack spacing={1}>
            <Button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              variant="unstyled"
              height="auto"
              p={0}
            >
              <Box
                w="40px"
                h="40px"
                borderRadius="full"
                bg={isMoreOpen ? "linear-gradient(to bottom right, pink.500, purple.500)" : "#151515"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.3s"
              >
                <MoreHorizontal size={20} />
              </Box>
              <Text
                fontSize="sm"
                mt={1}
                opacity={isMoreOpen ? 1 : 0.5}
                transition="all 0.3s"
              >
                More
              </Text>
            </Button>
          </VStack>
        </Flex>

        <AnimatePresence>
          {isMoreOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 2147483646,
                }}
                onClick={() => setIsMoreOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'fixed',
                  bottom: '96px',
                  left: '16px',
                  right: '16px',
                  background: '#232526',
                  borderRadius: 'var(--chakra-radii-2xl)',
                  overflow: 'hidden',
                  padding: '16px',
                  zIndex: 2147483647,
                }}
              >
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  {moreItems.map((item) => (
                    <Button
                      key={item.name}
                      onClick={(e) => {
                        if (item.name === "Buy Crypto") {
                          setIsBuyCryptoModalOpen(true);
                        } else {
                          handleItemClick(e, item.route, item.name);
                        }
                      }}
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
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Box>

      <Modal isOpen={isBuyCryptoModalOpen} onClose={() => setIsBuyCryptoModalOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent zIndex={2000}>
          <BuyTab />
        </ModalContent>
      </Modal>
    </Portal>
  );
};

export default MobileMenu;
