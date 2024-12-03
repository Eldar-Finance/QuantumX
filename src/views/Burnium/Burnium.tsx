import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import WrapperPages from "hoc/WrapperPages";
import withElronDapp from "hoc/withElronDapp";
import TitleSection from "./TitleSection";
import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Calendar, TrendingUp, MessageCircle } from "lucide-react";
import { useAppSelector } from "utils/hooks/redux";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { motion } from 'framer-motion';
import { Box as ChakraBox } from "@chakra-ui/react";

const MotionBox = motion(ChakraBox); 

const whitelistedAddresses = [
  "erd14jd5ytvhej7tfnzppzu4f299z5nd60yza5hmrmzfvthfzap67h9sg99kl2",
  "erd1tsx3z7u3sdf54srmh3x4n38jcjyh5ad6gu6u262g8rfnf8y6gfds0aw9tu",
  "erd1s5ufsgtmzwtp6wrlwtmaqzs24t0p9evmp58p33xmukxwetl8u76sa2p9rv",
  "erd1kxpkx9dvnp8cmx3azvtp9m6s3uldajxuvqtlhxay20xu5xer77jq025av9",
  "erd1tsuu9jf4pn8rsus9knrw4ju39ukyp247gug8gahsfdjzdzewd0eqcwgl30",
];

const Burnium = () => {
  const cardBg = "#242526";
  const accentColor = "#22F6DC";
  const userAddress = useAppSelector(selectUserAddress);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [newPostsAvailable, setNewPostsAvailable] = useState(false);
  const [sportsPredictions, setSportsPredictions] = useState([]);
  const [iframeVisible, setIframeVisible] = useState(false);

  useEffect(() => {
    const fetchTransfers = async () => {
      if (!userAddress) return;

      // Check if the userAddress is in the whitelist
      if (whitelistedAddresses.includes(userAddress)) {
        setHasAccess(true);
        setIframeVisible(true);
        setLoading(false);
        return;
      }

      const url = `https://api.multiversx.com/accounts/${userAddress}/transfers?sender=${userAddress}&receiver=erd1qqqqqqqqqqqqqpgqq7t0k5zh7qwht2xk3rc5s9zdf7td9an5u7zs56vyvy&status=success&function=nftBurn`;
      
      try {
        const response = await axios.get(url);
        const transfers = response.data;

        const validTickers = ["QXHR-9b0bc6", "QXFLM-06e81a", "QXHR300-f0a5c0", "ELBADGES-2efe5c"];
        const validTransfers = transfers.filter((transfer) =>
          transfer.action?.arguments?.transfers?.some((t) => validTickers.includes(t.ticker))
        );

        if (validTransfers.length >= 3) {
          setHasAccess(true);
          setIframeVisible(true);
        } else {
          setIframeVisible(false);
        }
      } catch (error) {
        console.error("Error fetching transfers:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      // Removed Supabase fetch logic
    };

    fetchTransfers();
    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);

    return () => clearInterval(interval);
  }, [userAddress, latestPosts]); 

  return (
    <Layout>
      <MyContainer pb="70px">
        <Flex
          w="full"
          justifyContent="center"
          flexDir="column"
          alignContent="center"
          maxW="1500px"
          mx="auto"
        >
          <TitleSection />
          
          <VStack spacing={6} w="full">
            {loading && userAddress ? (
              <Text color="gray.500" textAlign="center" mt={4}>
                Loading...
              </Text>
            ) : !userAddress ? (
              <>
                <Text 
                  color="red.500" 
                  textAlign="center" 
                  mt={4} 
                  fontSize="xl"
                  fontWeight="bold"
                >
                  You need to connect your wallet and burn one of the specified collections to access this content.
                </Text>
                
                <Box textAlign="center" w="full" bg="#242526" p={6} borderRadius="lg" mb={6}>
                  <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
                    Unlock Exclusive Features!
                  </Text>
                  <Flex wrap="wrap" justify="space-between" gap={4}>
                    <Box bg="#1F2022" p={4} borderRadius="md" w={{ base: "100%", md: "30%" }} mb={4}>
                      <Text color="gray.200" fontWeight="semibold">
                        🕵️‍♂️ Investor Insights
                      </Text>
                      <Text color="gray.300">
                        Gain valuable insights from experienced investors who analyze market trends and opportunities.
                      </Text>
                    </Box>
                    <Box bg="#1F2022" p={4} borderRadius="md" w={{ base: "100%", md: "30%" }} mb={4}>
                      <Text color="gray.200" fontWeight="semibold">
                        📸 Latest Market Analysis
                      </Text>
                      <Text color="gray.300">
                        Access the latest market analysis and reports curated by our expert team.
                      </Text>
                    </Box>
                    <Box bg="#1F2022" p={4} borderRadius="md" w={{ base: "100%", md: "30%" }} mb={4}>
                      <Text color="gray.200" fontWeight="semibold">
                        ⚡ Advanced Trading Bot
                      </Text>
                      <Text color="gray.300">
                        Utilize our advanced trading bot that automates buying and selling based on market signals.
                      </Text>
                    </Box>
                    <Box bg="#1F2022" p={4} borderRadius="md" w={{ base: "100%", md: "30%" }} mb={4}>
                      <Text color="gray.200" fontWeight="semibold">
                        📈 Sell Target Calculations
                      </Text>
                      <Text color="gray.300">
                        Users who have burned more than 3 NFTs will gain access to personalized sell target calculations for their favorite cryptocurrencies.
                      </Text>
                    </Box>
                    <Box bg="#1F2022" p={4} borderRadius="md" w={{ base: "100%", md: "30%" }} mb={4}>
                      <Text color="gray.200" fontWeight="semibold">
                        🔥 Enhanced Access
                      </Text>
                      <Text color="gray.300">
                        The more NFTs you burn, the greater your access to exclusive features and insights.
                      </Text>
                    </Box>
                  </Flex> 
                </Box>

                <Flex justifyContent="space-between" mt={4} w="full">
                  {/* Box 1 */}
                  <Box textAlign="center" w="24%" bg="#242526" p={4} borderRadius="lg">
                    <Image
                      src="https://media.xoxno.com/nftmedia/QXFLM-06e81a/QXFLM-06e81a-022e.avif"
                      alt="QuantumXFlamies"
                      borderRadius="lg"
                      mb={2}
                    />
                    <Text color="gray.300">QuantumXFlamies</Text>
                  </Box>
                  {/* Box 2 */}
                  <Box textAlign="center" w="24%" bg="#242526" p={4} borderRadius="lg">
                    <Image
                      src="https://media.xoxno.com/nftmedia/QXHR-9b0bc6/QXHR-9b0bc6-01a6.avif"
                      alt="QuantumXHeroes"
                      borderRadius="lg"
                      mb={2}
                    />
                    <Text color="gray.300">QuantumXHeroes</Text>
                  </Box>
                  {/* Box 3 */}
                  <Box textAlign="center" w="24%" bg="#242526" p={4} borderRadius="lg">
                    <Image
                      src="https://media.xoxno.com/nftmedia/QXHR300-f0a5c0/QXHR300-f0a5c0-01.avif"
                      alt="QuantumXHeroes300"
                      borderRadius="lg"
                      mb={2}
                    />
                    <Text color="gray.300">QuantumXHeroes300</Text>
                  </Box>
                  {/* Box 4 */}
                  <Box textAlign="center" w="24%" bg="#242526" p={4} borderRadius="lg">
                    <Image
                      src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*BF5B1ULLD_bnXnna"
                      alt="Eldar Badges"
                      borderRadius="lg"
                      mb={2}
                    />
                    <Text color="gray.300">Eldar Badges</Text>
                  </Box>
                </Flex>

                {/* New Section for Links and Images */}
                <Flex justifyContent="space-between" mt={6} w="full">
                  {/* Burnify Section */}
                  <Box textAlign="center" w="48%" bg="#242526" p={4} borderRadius="lg">
                    <Text fontSize="lg" fontWeight="bold" color="gray.300" mb={2}>
                      Burn them here
                    </Text>
                    <Link href="https://burnify.app/nft-burn" isExternal>
                      <Image
                        src="https://burnify.app/static/media/Burnify_Logo_White.6101a362bf009f033832.png"
                        alt="Burnify Logo"
                        borderRadius="lg"
                      />
                    </Link>
                  </Box>

                  {/* Xoxno Section */}
                  <Box textAlign="center" w="48%" bg="#242526" p={4} borderRadius="lg">
                    <Text fontSize="lg" fontWeight="bold" color="gray.300" mb={2}>
                      Buy one here
                    </Text>
                    <Link href="https://xoxno.com" isExternal>
                      <Image
                        src="https://xoxno.com/_next/static/media/wide.221596a0.webp"
                        alt="Buy on Xoxno"
                        borderRadius="lg"
                      />
                    </Link>
                  </Box>
                </Flex>
              </>
            ) : hasAccess ? (
              <>
                {/* Trading Bot Promotion */}
                <Flex direction={{ base: "column", md: "row" }} gap={6}>
                  <Card bg={cardBg} w="full" overflow="hidden" borderRadius="lg">
                    <CardBody>
                      <Flex direction={{ base: "column", md: "row" }} gap={6}>
                        <Box w={{ base: "full", md: "50%" }}>
                          <Image
                            src="https://pbs.twimg.com/media/GRGABrNXkAA0KIV.png"
                            alt="Trading Bot"
                            borderRadius="lg"
                          />
                        </Box>
                        <VStack w={{ base: "full", md: "50%" }} align="start" spacing={4}>
                          <Heading color={accentColor} size="lg">
                            Multi-Chain Fast Trading Bot
                          </Heading>
                          <Text color="gray.300">
                            Experience lightning-fast trades across multiple chains with our advanced trading bot.
                            Get instant access to market opportunities and maximize your profits.
                          </Text>
                          <Link
                            href="https://t.me/BullxBetaBot?start=access_5GSJKL7IGL6"
                            isExternal
                            bg={accentColor}
                            color="black"
                            px={6}
                            py={3}
                            borderRadius="lg"
                            _hover={{ bg: "cyan.400" }}
                            display="flex"
                            alignItems="center"
                            gap={2}
                          >
                            <Icon as={MessageCircle} />
                            Access the Bot
                          </Link>
                        </VStack>
                      </Flex>
                    </CardBody>
                  </Card>

                  <Card bg={cardBg} w="full" overflow="hidden" borderRadius="lg">
                    <CardBody>
                      <Flex direction={{ base: "column", md: "row" }} gap={6}>
                        <Box w={{ base: "full", md: "50%" }}>
                          <Image
                            src="https://i.ytimg.com/vi/2Qg8PxkqHHg/hqdefault.jpg"
                            alt="Rollbit"
                            borderRadius="lg"
                          />
                        </Box>
                        <VStack w={{ base: "full", md: "50%" }} align="start" spacing={4}>
                          <Heading color={accentColor} size="lg">
                            Bet with Rollbit
                          </Heading>
                          <Text color="gray.300">
                          Rollbit offers a wide range of gambling options, from sports betting and slots to more unique features like crypto futures.
                          </Text>
                          <Link
                            href="https://rollbit.com/referral/quantumxroll"
                            isExternal
                            bg={accentColor}
                            color="black"
                            px={6}
                            py={3}
                            borderRadius="lg"
                            _hover={{ bg: "cyan.400" }}
                            display="flex"
                            alignItems="center"
                            gap={2}
                          >
                            <Icon as={MessageCircle} />
                            Join Rollbit
                          </Link>
                        </VStack>
                      </Flex>
                    </CardBody>
                  </Card>
                </Flex>

                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} w="full">
                  {/* Telegram Feed */}
                  <Card bg={cardBg} borderRadius="lg">
                    <CardBody>
                      <Flex align="center" gap={2} mb={4}>
                        <Icon as={TrendingUp} color={accentColor} boxSize={6} />
                        <Heading size="md" color={accentColor}>Latest Gem Scans - Be Fast and Dyor</Heading>
                      </Flex>
                      <VStack
                        maxH="500px"
                        overflowY="auto"
                        spacing={4}
                        sx={{
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "transparent",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: accentColor,
                            borderRadius: "full",
                          },
                        }}
                      >
                        <Text color="gray.500" fontWeight="bold" mb={2}>
                          Latest Scans
                        </Text>
                        {latestPosts.map((post, index) => (
                          <MotionBox
                            key={post.id}
                            bg="whiteAlpha.50"
                            p={6}
                            borderRadius="lg"
                            w="full"
                            _hover={{ borderColor: "whiteAlpha.200" }}
                            position="relative"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            {index === 0 && (
                              <Box
                                position="absolute"
                                top={-4}
                                left="50%"
                                transform="translateX(-50%)"
                                bg="green.400"
                                color="white"
                                px={3}
                                py={1}
                                borderRadius="md"
                                fontWeight="bold"
                                boxShadow="md"
                              >
                                New
                              </Box>
                            )}
                            <Text
                              fontFamily="mono"
                              fontSize="md"
                              color="gray.300"
                              whiteSpace="pre-line"
                            >
                              {post.content.replace(/https?:\/\/[^\s]+/g, '')}
                            </Text>
                            <Text fontSize="xs" color="gray.500" mt={2}>
                              {post.timestamp}
                            </Text>
                          </MotionBox>
                        ))}
                        {/* New Button for Telegram Group */}
                        <Link
                          href="https://t.me/+r8n5K7TP8RtkNWM0"
                          isExternal
                          bg={accentColor}
                          color="black"
                          px={6}
                          py={3}
                          borderRadius="lg"
                          _hover={{ bg: "cyan.400" }}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          w="full"
                        >
                          Join Telegram for Gems
                        </Link>
                      </VStack>
                    </CardBody>
                  </Card>

                  {/* GMGN.AI Card */}
                  <Card bg={cardBg} w="full" overflow="hidden" borderRadius="lg">
                    <CardBody>
                      <Flex direction={{ base: "column", md: "row" }} gap={6}>
                        <Box w={{ base: "full", md: "50%" }}>
                          <Image
                            src="https://gmgn.ai/static/logo/GMGNLogo.webp"
                            alt="GMGN.AI"
                            borderRadius="lg"
                          />
                        </Box>
                        <VStack w={{ base: "full", md: "50%" }} align="start" spacing={4}>
                          <Heading color={accentColor} size="lg">
                            Copy Trade Crypto Whales
                          </Heading>
                          <Text color="gray.300">
                            GMGN.AI is a game-changer for crypto traders. By combining automated tools, advanced analytics, and copy trading, it simplifies the trading process while helping you avoid common pitfalls. Whether you&apos;re a beginner or an experienced trader, this bot can level up your strategy.
                          </Text>
                          <Link
                            href="https://gmgn.ai/?ref=eJSsbuKd&chain=sol"
                            isExternal
                            bg={accentColor}
                            color="black"
                            px={6}
                            py={3}
                            borderRadius="lg"
                            _hover={{ bg: "cyan.400" }}
                            display="flex"
                            alignItems="center"
                            gap={2}
                          >
                            <Icon as={MessageCircle} />
                            Access GMGN.AI
                          </Link>
                        </VStack>
                      </Flex>
                    </CardBody>
                  </Card>
                </Grid>
              </>
            ) : (
              <Text color="red.500" textAlign="center" mt={4}>
                You need to burn one of the specified collections to access this content.
              </Text>
            )}

            {/* New Iframe Section */}
            {iframeVisible && (
              <Box w="full" h="500px" overflow="hidden" borderRadius="lg">
                <iframe
                  src="https://wensell.vercel.app/"
                  style={{ width: '100%', height: '700px', border: 'none' }}
                  scrolling="yes"
                />
              </Box>
            )}
          </VStack>
        </Flex>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Burnium));