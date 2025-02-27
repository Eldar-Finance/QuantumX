import React, { useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Grid,
  HStack,
  Link,
  Spinner,
  Text,
  Image,
  Tooltip,
  UnorderedList,
  ListItem,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import img3 from "assets/eldar-badges/frameit_logo.svg";
import img1 from "assets/eldar-badges/logo1.png";
import img2 from "assets/eldar-badges/logo2.png";
import NextImage from "components/NextImage/NextImage";
// import LogoImg from "components/LogoImg/LogoImg";
import { getBigerTime } from "utils/functions/time";
import { useAppSelector } from "utils/hooks/redux";
import useCountDown from "utils/hooks/useCountDown";
import useGetEldarSfts from "utils/hooks/useGetEldarSfts";
import BadgesStatics from "../BadgesStatics/BadgesStatics";
import ClaimRewardsButton from "../ClaimRewardsButton/ClaimRewardsButton";
import ClaimSftsButton from "../ClaimSftsButton/ClaimSftsButton";
import SFtsItem from "../SFtsItem/SFtsItem";
import StakeButton from "../StakeButton/StakeButton";
import UnStakeButton from "../UnStakeButton/UnStakeButton";
import { useDisclosure } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@chakra-ui/react";
import { sftsRewardsWsp } from 'api/sc/sc';
import { scCall } from 'api/sc/calls';

const BadgesCard = () => {
  const [sfts] = useGetEldarSfts();

  const address = useAppSelector((state) => state.userAccount.connectedAddress);

  const eldarSftsWithStatus = useAppSelector(
    (state) => state.eldarSfts.eldarSftsWithStatus
  );
  
  const isStakerUser = useAppSelector((state) => state.eldarSfts.isStakerUser);
  const isSftsClaimable = useAppSelector(
    (state) => state.eldarSfts.isSftsClaimable
  );
  const isUserSftsInUnlocking = useAppSelector(
    (state) => state.eldarSfts.isUserSftsInUnlocking
  );
  const stakingNumbers = useAppSelector(
    (state) => state.eldarSfts.stakingNumbers.data
  );

  const sftsInStaking = eldarSftsWithStatus.data.InStakingPeriod;

  const [countdownTimer] = useCountDown(stakingNumbers.timeToRetriveSft);
  const { days, hours, mins, secs } = countdownTimer;
  const biggerTime = getBigerTime(days, hours, mins, secs);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChecked, setIsChecked] = useState(false);

  const stfsRewards = useAppSelector(
    (state) => state.eldarSfts.stfsRewards.data
  );

  const handleSubmit = () => {
    scCall(sftsRewardsWsp, "burnAllForBurnium", [], 30000000);
  };

  const { totalStaked } = useAppSelector(
    (state) => state.eldarSfts.stakingNumbers.data
  );

  return (
    <Card px={5} bg="secondary">
      <Box 
        w="full" 
        bg="rgba(220, 53, 69, 0.1)" 
        p={4} 
        borderRadius="md" 
        mb={4}
        border="1px solid"
        borderColor="red.500"
      >
        <Flex direction="column" gap={2}>
          <Text color="red.400" fontWeight="bold" fontSize="sm">
            Important Announcement
          </Text>
          <Text color="white" fontSize="sm">
            Due to market conditions, we're transitioning from rewards to buybacks. We'll buy back and burn ELBADGES, QXHR300, and QXFlamies listed at 0.1 EGLD or less for the next year. Consider burning your SFTs for immediate Burnium access.
          </Text>
          <Link 
            color="cyan.400" 
            fontSize="sm" 
            onClick={onOpen}
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
          >
            Learn More →
          </Link>
        </Flex>
      </Box>

      <CardHeader mb={1} flexDir="column">
        <Flex justifyContent="space-between" w={"full"} flexDirection={{sm: "column", md: "row"}} gap={4}>
          <Box alignSelf={"center"}>
            <Text
              fontSize={"3xl"}
              as="h2"
              fontWeight={"extrabold"}
              // display={{ xs: "none", md: "block" }}
              color="white"
            >
              Staking
            </Text>
          </Box>
          <HStack spacing={{ xs: "10px", movil: "20px", md: "40px" }}>
            <Text
              fontSize={{ xs: "md", md: "xl" }}
              whiteSpace="nowrap"
              color="white"
            >
              Buy STFs or Burn them
            </Text>
            <Link
              isExternal
              href="https://burnify.app/nft-burn"
            >
              <Image src="https://burnify.app/static/media/n_D_Flame.a473b9131dfc7a3448ca.png" width={25} alt={""} />
            </Link>
            <Link
              isExternal
              href="https://xoxno.com/collection/ELBADGES-2efe5c"
            >
              <NextImage src={img2} alt="xoxno" width={100} />
            </Link>
            <Link
              isExternal
              href="https://www.frameit.gg/marketplace/ELBADGES-2efe5c/items"
            >
              <NextImage src={img3} alt="frameit" width={20} />
            </Link>
          </HStack>
        </Flex>
      </CardHeader>
      <CardBody px={{ xs: "0px", md: "0px" }}>
        <Card bg="black.baseDark">
          <CardBody>
            <Box w={"full"}>
              <BadgesStatics />
              <Card bg="black.base" my={10}>
                <CardBody>
                  {isStakerUser ? (
                    <Flex
                      justifyContent={"space-around"}
                      flexWrap="wrap"
                      alignItems={"center"}
                      textColor={"white"}
                      mt={5}
                    >
                      {sftsInStaking.map((sft) => {
                        if (sft.amount === 0) {
                          return null;
                        }
                        let name = "";
                        switch (sft.nonce) {
                          case 1:
                            name = "Marble Gold Badge";
                            break;

                          case 2:
                            name = "Marble Silver Badge";
                            break;

                          case 3:
                            name = "Rose Gold Badge";
                            break;

                          default:
                            break;
                        }

                        const parseSft = {
                          collection: sft.tokenI,
                          balance: sft.amount,
                          name: name,
                          nonce: sft.nonce,
                        };
                        return (
                          <SFtsItem
                            isHoverEffect={false}
                            key={sft.tokenI + sft.nonce}
                            sft={parseSft}
                            videoProps={{
                              w: { xs: "200px", md: "300px" },
                              height: { xs: "110px", md: "167px" },
                            }}
                            imageProps={{
                              w: "240px",
                              h: "240px",
                              // height: { xs: "110px", md: "167px" },
                            }}
                          />
                        );
                      })}
                    </Flex>
                  ) : (
                    <Box fontSize="md" textAlign={"center"}>
                      {eldarSftsWithStatus.status === "succeeded" ? (
                        <Box>
                          {isUserSftsInUnlocking ? (
                            <Text>Retrieve available in {biggerTime}</Text>
                          ) : (
                            <Text>
                              {isSftsClaimable
                                ? "Your sft's are ready to claim"
                                : " You have not staked any SFTs/NFTs."}
                            </Text>
                          )}
                        </Box>
                      ) : (
                        <Spinner />
                      )}
                    </Box>
                  )}
                </CardBody>
              </Card>
              <Grid
                  templateColumns={{sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)"}}
                  gap={{sm: 5, md: 20}}
                  justifyContent={"space-between"}
                  justifySelf={"space-between"}
                  alignItems={"space-between"}
                  w={"full"}
                >
                  {/* <StakeButton
                      sfts={sfts}
                      address={address}
                      disabled={
                        sfts.length === 0 ||
                        isUserSftsInUnlocking ||
                        isSftsClaimable
                      }
                      w={"full"}
                    />   */}
                  {isStakerUser && <UnStakeButton w={"full"}/>}
                  {(isUserSftsInUnlocking || isSftsClaimable) && (
                    <ClaimSftsButton w={"full"}
                      disabled={!isSftsClaimable && !isUserSftsInUnlocking}
                    />
                  )}
                  <Button 
                    onClick={onOpen} 
                    style={{
                      backgroundColor: 'red', // Set background color to red
                      color: 'white', // Set text color to white
                      border: 'none', // Remove border
                      padding: '10px 20px', // Add padding
                      cursor: 'pointer', // Change cursor to pointer
                      fontSize: '16px', // Set font size
                      borderRadius: '10px' // Add rounded corners
                    }}
                    disabled={!isStakerUser}
                    _hover={{}} // Remove hover effect
                  >
                    Burn Everything
                  </Button>
                </Grid>
            </Box>
          </CardBody>
        </Card>
      </CardBody> 

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Important: SFT Burning Decision</ModalHeader>
          <ModalBody>
            <Text>
              Due to current market conditions, QuantumX is not generating sufficient revenue to maintain the rewards program. As a result, we are making two important announcements:

              <Box mt={4} mb={4}>
                <Text fontWeight="bold" mb={2}>1. Buyback Program:</Text>
                <Text>
                  For the next year, we will try to buy back and burning ELBADGES, QXHR300, and QXFlamies listed at 0.1 EGLD or less on any marketplace.
                </Text>
              </Box>

              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>2. Burnium Access Option:</Text>
                <Text>
                  You can choose to burn your SFTs now to gain immediate access to Burnium membership, which includes:
                </Text>
                <UnorderedList mt={2} ml={4}>
                  <ListItem>Trading bot access</ListItem>
                  <ListItem>Trade signals</ListItem>
                  <ListItem>Advanced calculators</ListItem>
                  <ListItem>Future tools and features</ListItem>
                </UnorderedList>
              </Box>

              <Alert status="warning" mt={4}>
                <AlertIcon />
                <Text>
                  Warning: Burning your SFTs is permanent and irreversible. You will lose all associated benefits and rewards.
                </Text>
              </Alert>
            </Text>
            <Checkbox mt={4} isChecked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}>
              I understand this is irreversible and agree to proceed
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" isDisabled={!isChecked} onClick={handleSubmit}>
              {/* TODO: run the burnAllForBurnium with no input */}
              I want Burnium access now
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default BadgesCard;
