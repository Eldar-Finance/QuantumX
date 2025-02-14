import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
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
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { Calendar, TrendingUp, MessageCircle, ExternalLink, Check } from 'lucide-react';
import { useAppSelector } from "utils/hooks/redux";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import Layout from "components/Layout/Layout";
import MyContainer from "components/Container/Container";
import TitleSection from "./TitleSection";

const MotionBox = motion(Box);

const whitelistedAddresses = [
  "erd14jd5ytvhej7tfnzppzu4f299z5nd60yza5hmrmzfvthfzap67h9sg99kl2",
  "erd1tsx3z7u3sdf54srmh3x4n38jcjyh5ad6gu6u262g8rfnf8y6gfds0aw9tu",
  "erd1s5ufsgtmzwtp6wrlwtmaqzs24t0p9evmp58p33xmukxwetl8u76sa2p9rv",
  "erd1kxpkx9dvnp8cmx3azvtp9m6s3uldajxuvqtlhxay20xu5xer77jq025av9",
  "erd1tsuu9jf4pn8rsus9knrw4ju39ukyp247gug8gahsfdjzdzewd0eqcwgl30",
  "erd1pr497tdmurx6zqyh4wf2pug6vvahx0n0s7e34etzuvwawdtlf62sf7qx3h",
  "erd1y3g3ahj5ymd5u0m2t3qtkh9adgfgu5qzkhwmyftztzp2dju755qqgtuyxp", 
  "erd1qtsvmjggneq4z30qm2hz4xcyjfrmxegdejlu090fxkrfyacu0kjqx777tn",
  "erd13ers9u3ts4lxa9zgdafptdd4735yjw6wznt2djm4rr4wm0hdu0eqdu69j2",
  "erd17u9myqadv7vvqswj4zvs3hdnzgc28wvx8rp0k7cm9qz98tqv4cusq6sry8",
  "erd10znpcqha0kmqtzas3fkyvgzs8ks03runhy64vkm83dgu0acgyp4sgy534e",
  "erd1gxlahjmplf7h2w27cwzkx0j4tp04lyd9avgnxhajzfssdc8mr8lqvncrc2",
  "erd1uampleqer7jn9a9ysd63xpt8427zetrse4vrf3w4s8hskv2kd45qs94tx7",
  "erd1dfxheram7ervcy9m2lp5frvkv6yv54j4j2960498enc4pl8m324spwxvgj",
  "erd1ujy25lmme80mvp6s45852j7lleqkrtuhqlpsn499vjzddanshvzq3qj9sf",
];

const FeatureCard = ({ title, description, icon, cardBg, textColor, descriptionColor, accentColor }) => (
  <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md" height="100%">
    <Icon as={icon} color={accentColor} boxSize={8} mb={4} />
    <Text color={textColor} fontWeight="semibold" mb={2}>
      {title}
    </Text>
    <Text color={descriptionColor}>
      {description}
    </Text>
  </Box>
);

const NFTCard = ({ image, name, cardBg, textColor }) => (
  <Box textAlign="center" bg={cardBg} p={4} borderRadius="lg" boxShadow="md">
    <Image
      src={image}
      alt={name}
      borderRadius="lg"
      mb={2}
      width="100%"
      height="200px"
      objectFit="cover"
    />
    <Text color={textColor}>{name}</Text>
  </Box>
);

const TierCard = ({ tier, requirements, features, isActive, cardBg, textColor, accentColor }) => (
  <Box 
    bg={cardBg} 
    p={6} 
    borderRadius="lg" 
    boxShadow="md"
    border="1px solid"
    borderColor={isActive ? accentColor : "whiteAlpha.200"}
    position="relative"
    opacity={isActive ? 1 : 0.7}
    transition="all 0.2s"
    _hover={{ opacity: 1 }}
  >
    {isActive && (
      <Box
        position="absolute"
        top={-2}
        right={-2}
        bg={accentColor}
        color="black"
        px={2}
        py={1}
        borderRadius="md"
        fontSize="xs"
        fontWeight="bold"
      >
        Active
      </Box>
    )}
    <Text color={accentColor} fontSize="xl" fontWeight="bold" mb={4}>
      {tier}
    </Text>
    <Text color="gray.400" fontSize="sm" mb={4}>
      {requirements}
    </Text>
    <VStack align="start" spacing={2}>
      {features.map((feature, index) => (
        <HStack key={index} color={textColor}>
          <Icon as={Check} color={accentColor} />
          <Text>{feature}</Text>
        </HStack>
      ))}
    </VStack>
  </Box>
);

const Burnium = () => {
  const bgColor = useColorModeValue("gray.50", "#242526");
  const cardBg = useColorModeValue("white", "#1E1E1E");
  const accentColor = "#22F6DC";
  const textColor = useColorModeValue("gray.700", "gray.200");
  const descriptionColor = useColorModeValue("gray.600", "gray.400");
  const motionBoxBg = useColorModeValue("gray.100", "whiteAlpha.100");

  const userAddress = useAppSelector(selectUserAddress);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [latestPosts, setLatestPosts] = useState([]);
  const [iframeVisible, setIframeVisible] = useState(false);
  const [validTransfers, setValidTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      if (!userAddress) return;

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
        const _validTransfers = transfers.filter((transfer) =>
          transfer.action?.arguments?.transfers?.some((t) => validTickers.includes(t.ticker))
        );
        
        setValidTransfers(_validTransfers);

        if (_validTransfers.length >= 3) {
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

    fetchTransfers();
  }, [userAddress]);

  return (
    <Layout>
      <Box minH="100vh" py={10}>
        <MyContainer maxW="1200px">
          <VStack spacing={10} align="stretch">
            <TitleSection />
            
            {loading && userAddress ? (
              <Flex justify="center" align="center" h="200px">
                <Spinner size="xl" color={accentColor} />
              </Flex>
            ) : !userAddress ? (
              <VStack spacing={8} align="stretch">
                <Text 
                  color="red.500" 
                  textAlign="center"
                  fontSize="xl"
                  fontWeight="bold"
                >
                  You need to connect your wallet and burn one of the specified collections to access this content
                </Text>
                
                <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="xl">
                  <Heading as="h2" size="xl" textAlign="center" mb={6} color={textColor}>
                    Unlock Exclusive Features!
                  </Heading>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                    <FeatureCard
                      title="Investor Insights"
                      description="Gain valuable insights from experienced investors who analyze market trends and opportunities."
                      icon={TrendingUp}
                      cardBg={cardBg}
                      textColor={textColor}
                      descriptionColor={descriptionColor}
                      accentColor={accentColor}
                    />
                    <FeatureCard
                      title="Latest Market Analysis"
                      description="Access the latest market analysis and reports curated by our expert team."
                      icon={Calendar}
                      cardBg={cardBg}
                      textColor={textColor}
                      descriptionColor={descriptionColor}
                      accentColor={accentColor}
                    />
                    <FeatureCard
                      title="Advanced Trading Bot"
                      description="Utilize our advanced trading bot that automates buying and selling based on market signals."
                      icon={MessageCircle}
                      cardBg={cardBg}
                      textColor={textColor}
                      descriptionColor={descriptionColor}
                      accentColor={accentColor}
                    />
                  </Grid>
                </Box>

                <Box bg={cardBg} p={8} borderRadius="lg" boxShadow="xl" mt={8}>
                  <Heading as="h2" size="xl" textAlign="center" mb={6} color={textColor}>
                    Burn-to-Unlock Tiers
                  </Heading>
                  <Text color="gray.400" textAlign="center" mb={8}>
                    The more you burn, the more features you unlock
                  </Text>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                    <TierCard
                      tier="Basic Access"
                      requirements="Burn 1 NFT/SFT"
                      features={[
                        "Trading Bot Access",
                        "Trading Signals Group Access",
                        "CopyTrade Bot Access"
                      ]}
                      isActive={validTransfers?.length === 1}
                      cardBg={cardBg}
                      textColor={textColor}
                      accentColor={accentColor}
                    />
                    <TierCard
                      tier="Advanced Access"
                      requirements="Burn 2-5 NFTs/SFTs"
                      features={[
                        "All Basic Features",
                        "Advanced Trading Signals",
                        "Priority Support",
                        "Sell Targets Calculator"
                      ]}
                      isActive={validTransfers?.length === 2}
                      cardBg={cardBg}
                      textColor={textColor}
                      accentColor={accentColor}
                    />
                    <TierCard
                      tier="Premium Access"
                      requirements="Burn 5+ NFTs/SFTs"
                      features={[
                        "All Advanced Features",
                        "Exclusive Tools Access - Soon",
                        "Priority Beta Testing - Soon",
                        "Custom Support Channel - Soon"
                      ]}
                      isActive={validTransfers?.length >= 3}
                      cardBg={cardBg}
                      textColor={textColor}
                      accentColor={accentColor}
                    />
                  </Grid>
                </Box>

                <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
                  <NFTCard
                    image="https://media..com/nftmedia/QXFLM-06e81a/QXFLM-06e81a-022e.avif"
                    name="QuantumXFlamies"
                    cardBg={cardBg}
                    textColor={textColor}
                  />
                  <NFTCard
                    image="https://media..com/nftmedia/QXHR-9b0bc6/QXHR-9b0bc6-01a6.avif"
                    name="QuantumXHeroes"
                    cardBg={cardBg}
                    textColor={textColor}
                  />
                  <NFTCard
                    image="https://media..com/nftmedia/QXHR300-f0a5c0/QXHR300-f0a5c0-01.avif"
                    name="QuantumXHeroes300"
                    cardBg={cardBg}
                    textColor={textColor}
                  />
                  <NFTCard
                    image="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*BF5B1ULLD_bnXnna"
                    name="Eldar Badges"
                    cardBg={cardBg}
                    textColor={textColor}
                  />
                </Grid>

                <Flex justifyContent="space-between" gap={6}>
                  <Card bg={cardBg} flex={1}>
                    <CardBody>
                      <VStack spacing={4}>
                        <Heading size="md" color={textColor}>Burn them here</Heading>
                        <Link href="https://burnify.app/nft-burn" isExternal>
                          <Image
                            src="https://burnify.app/static/media/Burnify_Logo_White.6101a362bf009f033832.png"
                            alt="Burnify Logo"
                            borderRadius="lg"
                          />
                        </Link>
                      </VStack>
                    </CardBody>
                  </Card>
                  <Card bg={cardBg} flex={1}>
                    <CardBody>
                      <VStack spacing={4}>
                        <Heading size="md" color={textColor}>Buy one here</Heading>
                        <Link href="https://.com" isExternal>
                          <Image
                            src="https://.com/_next/static/media/wide.221596a0.webp"
                            alt="Buy on Xoxno"
                            borderRadius="lg"
                          />
                        </Link>
                      </VStack>
                    </CardBody>
                  </Card>
                </Flex>
              </VStack>
            ) : hasAccess ? (
              <VStack spacing={8} align="stretch">
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                  <Card bg={cardBg} overflow="hidden">
                    <CardBody>
                      <VStack align="start" spacing={4}>
                        <Image
                          src="https://pbs.twimg.com/media/GRGABrNXkAA0KIV.png"
                          alt="Trading Bot"
                          borderRadius="lg"
                          w="100%"
                        />
                        <Heading color={accentColor} size="lg">
                          Multi-Chain Fast Trading Bot
                        </Heading>
                        <Text color={textColor}>
                          Experience lightning-fast trades across multiple chains with our advanced trading bot.
                          Get instant access to market opportunities and maximize your profits.
                        </Text>
                        <Button
                          as={Link}
                          href="https://t.me/BullxBetaBot?start=access_5GSJKL7IGL6"
                          isExternal
                          leftIcon={<Icon as={MessageCircle} />}
                          bg={accentColor}
                          color="black"
                          _hover={{ bg: "cyan.400" }}
                        >
                          Access the Bot
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg={cardBg} overflow="hidden">
                    <CardBody>
                      <VStack align="start" spacing={4}>
                        <Image
                          src="https://i.ytimg.com/vi/2Qg8PxkqHHg/hqdefault.jpg"
                          alt="Rollbit"
                          borderRadius="lg"
                          w="100%"
                        />
                        <Heading color={accentColor} size="lg">
                          Bet with Rollbit
                        </Heading>
                        <Text color={textColor}>
                          Rollbit offers a wide range of gambling options, from sports betting and slots to more unique features like crypto futures.
                        </Text>
                        <Button
                          as={Link}
                          href="https://rollbit.com/referral/quantumxroll"
                          isExternal
                          leftIcon={<Icon as={ExternalLink} />}
                          bg={accentColor}
                          color="black"
                          _hover={{ bg: "cyan.400" }}
                        >
                          Join Rollbit
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </Grid>

                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                  <Card bg={cardBg}>
                    <CardBody>
                      <VStack align="start" spacing={4}>
                        <Flex align="center" gap={2}>
                          <Icon as={TrendingUp} color={accentColor} boxSize={6} />
                          <Heading size="md" color={accentColor}>Latest Gem Scans - Be Fast and Dyor</Heading>
                        </Flex>
                        <VStack
                          maxH="500px"
                          overflowY="auto"
                          spacing={4}
                          align="stretch"
                          w="100%"
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
                          {latestPosts.map((post, index) => (
                            <MotionBox
                              key={post.id}
                              bg={motionBoxBg}
                              p={4}
                              borderRadius="md"
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              {index === 0 && (
                                <Box
                                  position="absolute"
                                  top={-2}
                                  right={-2}
                                  bg="green.400"
                                  color="white"
                                  px={2}
                                  py={1}
                                  borderRadius="md"
                                  fontSize="xs"
                                  fontWeight="bold"
                                >
                                  New
                                </Box>
                              )}
                              <Text color={textColor} whiteSpace="pre-line">
                                {post.content.replace(/https?:\/\/[^\s]+/g, "")}
                              </Text>
                              <Text fontSize="xs" color="gray.500" mt={2}>
                                {post.timestamp}
                              </Text>
                            </MotionBox>
                          ))}
                        </VStack>
                        <Button
                          as={Link}
                          href="https://t.me/+r8n5K7TP8RtkNWM0"
                          isExternal
                          leftIcon={<Icon as={MessageCircle} />}
                          bg={accentColor}
                          color="black"
                          _hover={{ bg: "cyan.400" }}
                          w="full"
                        >
                          Join Telegram for Gems
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card bg={cardBg}>
                    <CardBody>
                      <VStack align="start" spacing={4}>
                        <Image
                          src="https://gmgn.ai/static/logo/GMGNLogo.webp"
                          alt="GMGN.AI"
                          borderRadius="lg"
                          w="100%"
                        />
                        <Heading color={accentColor} size="lg">
                          Copy Trade Crypto Whales
                        </Heading>
                        <Text color={textColor}>
                          GMGN.AI is a game-changer for crypto traders. By combining automated tools, advanced analytics, and copy trading, it simplifies the trading process while helping you avoid common pitfalls. Whether you're a beginner or an experienced trader, this bot can level up your strategy.
                        </Text>
                        <Button
                          as={Link}
                          href="https://gmgn.ai/?ref=eJSsbuKd&chain=sol"
                          isExternal
                          leftIcon={<Icon as={ExternalLink} />}
                          bg={accentColor}
                          color="black"
                          _hover={{ bg: "cyan.400" }}
                        >
                          Access GMGN.AI
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                </Grid>

                {iframeVisible && (
                  <Box w="full" h="500px" overflow="hidden" borderRadius="lg" boxShadow="xl">
                    <iframe
                      src="https://wensell.vercel.app/"
                      style={{ width: '100%', height: '700px', border: 'none' }}
                      scrolling="yes"
                    />
                  </Box>
                )}
              </VStack>
            ) : (
              <Text color="red.500" textAlign="center" fontSize="xl" fontWeight="bold">
                You need to burn one of the specified collections to access this content.
              </Text>
            )}
          </VStack>
        </MyContainer>
      </Box>
    </Layout>
  );
};

export default Burnium;

