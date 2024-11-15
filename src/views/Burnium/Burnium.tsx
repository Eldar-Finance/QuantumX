import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
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

// Supabase credentials
const supabaseUrl = "https://zsjkpqtjcykqpzycnmhn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzamtwcXRqY3lrcXB6eWNubWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyMjQ3MzQsImV4cCI6MjA0NjgwMDczNH0.5wacYcIxR2WQU5EKbycgOnK3SkiVFnyj1Y79s9DPwOQ";
const supabase = createClient(supabaseUrl, supabaseKey);

interface SportsPrediction {
  id: number;
  team1: string;
  team2: string;
  datetime: string;
  prediction: string;
}

const mockPredictions: SportsPrediction[] = [
  {
    id: 1,
    team1: "Manchester United",
    team2: "Arsenal",
    datetime: "2024-03-21 20:00",
    prediction: "2-1",
  },
  {
    id: 2,
    team1: "Real Madrid",
    team2: "Barcelona",
    datetime: "2024-03-22 21:00",
    prediction: "3-2",
  },
  {
    id: 3,
    team1: "Bayern Munich",
    team2: "Dortmund",
    datetime: "2024-03-23 19:30",
    prediction: "2-2",
  },
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

  useEffect(() => {
    const fetchTransfers = async () => {
      if (!userAddress) return;

      const url = `https://api.multiversx.com/accounts/${userAddress}/transfers?sender=${userAddress}&receiver=erd1qqqqqqqqqqqqqpgqq7t0k5zh7qwht2xk3rc5s9zdf7td9an5u7zs56vyvy&status=success&function=nftBurn`;
      
      try {
        const response = await axios.get(url);
        const transfers = response.data;

        const validTickers = ["QXHR-9b0bc6", "QXFLM-06e81a", "QXHR300-f0a5c0", "ELBADGES-2efe5c","CNUN-8b89ee"];
        const hasValidTransfer = transfers.some((transfer) =>
          transfer.action?.arguments?.transfers?.some((t) => validTickers.includes(t.ticker))
        );

        setHasAccess(hasValidTransfer);
      } catch (error) {
        console.error("Error fetching transfers:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('telegram_posts')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        console.error("Error fetching posts from Supabase:", error);
      } else {
        setLatestPosts(data);
      }
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
                
                <Box textAlign="center" w="full" bg="#1A202C" p={6} borderRadius="lg" mb={6}>
                  <Text fontSize="2xl" fontWeight="bold" color="white" mb={4}>
                    Unlock Exclusive Features!
                  </Text>
                  <Flex wrap="wrap" justify="space-between" spacing={4}>
                    <Box bg="#2D3748" p={4} borderRadius="md" w={{ base: "100%", md: "30%" }} mb={4}>
                      <Text color="gray.200" fontWeight="bold">
                        🕵️‍♂️ Insights from the Investor
                      </Text>
                      <Text color="gray.300">
                        Gain insights from the investor who discovered $PNUT at a 27k market cap.
                      </Text>
                    </Box>
                    <Box bg="#2D3748" p={4} borderRadius="md" w={{ base: "100%", md: "30%" }} mb={4}>
                      <Text color="gray.200" fontWeight="bold">
                        📸 Latest Scan Pictures
                      </Text>
                      <Text color="gray.300">
                        Access the latest scan pictures on Solana and Ethereum, curated by the expert team who found PNUT.
                      </Text>
                    </Box>
                    <Box bg="#2D3748" p={4} borderRadius="md" w={{ base: "100%", md: "30%" }} mb={4}>
                      <Text color="gray.200" fontWeight="bold">
                        ⚡ Fastest Multi-Chain Trading Bot
                      </Text>
                      <Text color="gray.300">
                        Utilize the fastest multi-chain trading bot that automates buying and selling for these picks.
                      </Text>
                    </Box>
                    <Box bg="#2D3748" p={4} borderRadius="md" w={{ base: "100%", md: "30%" }} mb={4}>
                      <Text color="gray.200" fontWeight="bold">
                        📈 Sports Predictions Coming Soon!
                      </Text>
                      <Text color="gray.300">
                        Stay tuned for our upcoming sports predictions feature!
                      </Text>
                    </Box>
                    <Box bg="#2D3748" p={4} borderRadius="md" w={{ base: "100%", md: "30%" }} mb={4}>
                      <Text color="gray.200" fontWeight="bold">
                        🔥 More Burns, More Access!
                      </Text>
                      <Text color="gray.300">
                        The more you burn, the more access you will have to upcoming features!
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
                          Join on Telegram
                        </Link>
                      </VStack>
                    </Flex>
                  </CardBody>
                </Card>

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
                          <Box
                            key={post.id}
                            bg="whiteAlpha.50"
                            p={6}
                            borderRadius="lg"
                            w="full"
                            _hover={{ borderColor: "whiteAlpha.200" }}
                            position="relative"
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
                              fontSize="sm"
                              color="gray.300"
                              whiteSpace="pre-line"
                            >
                              {post.content.replace(/https?:\/\/[^\s]+/g, '')}
                            </Text>
                            <Text fontSize="xs" color="gray.500" mt={2}>
                              {post.timestamp}
                            </Text>
                          </Box>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>

                  {/* Sports Predictions */}
                  <Card bg={cardBg} borderRadius="lg">
                    <CardBody>
                      <Flex align="center" gap={2} mb={4}>
                        <Icon as={Calendar} color={accentColor} boxSize={6} />
                        <Heading size="md" color={accentColor}>Sports Predictions</Heading>
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
                        <Box bg="whiteAlpha.50" p={6} borderRadius="lg" mb={4}>
                          <Text fontSize="lg" fontWeight="bold" color="gray.300">
                            This feature is coming very soon!
                          </Text>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                </Grid>
              </>
            ) : (
              <Text color="red.500" textAlign="center" mt={4}>
                You need to burn one of the specified collections to access this content.
              </Text>
            )}
          </VStack>
        </Flex>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Burnium));