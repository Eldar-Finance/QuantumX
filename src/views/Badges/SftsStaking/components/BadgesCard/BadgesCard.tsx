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
  Image
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

  return (
    <Card px={5} bg="secondary">
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
                                ? "Your sft’s are ready to claim"
                                : " You have not staked any sft’s yet , if you have some press the stake button"}
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
                  <StakeButton
                      sfts={sfts}
                      address={address}
                      disabled={
                        sfts.length === 0 ||
                        isUserSftsInUnlocking ||
                        isSftsClaimable
                      }
                      w={"full"}
                    />  
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
                      borderRadius: '5px' // Add rounded corners
                    }}
                  >
                    Burn Everything - soon
                  </Button>
                </Grid>
            </Box>
          </CardBody>
        </Card>
      </CardBody>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Your Action: Burn Your SFTs</ModalHeader>
          <ModalBody>
            <Text>
              Are you sure you want to proceed with burning your SFTs?
              <br /><br />
              By clicking the "Burn" button, you will gain exclusive access to the Burnium Membership Page of QuantumX. This membership includes tools designed to enhance your cryptocurrency and investment journey, such as:
              <ul>
                <li>Early access to a trading bot</li>
                <li>Trade signals</li>
                <li>Calculators</li>
                <li>And more features planned for the near future</li>
              </ul>
              Due to minimal or no revenue in recent months, QuantumX is striving to provide value through these tools, even as we cannot currently distribute additional rewards.
              <br /><br />
              However, you also have the choice to keep your SFTs staked, continuing to receive rewards when our revenue increases.
              <br /><br />
              Important: By choosing to burn your SFTs, you will lose access to all your QuantumX/Eldar SFTs permanently.
              <br /><br />
              Choose wisely, and thank you for being part of QuantumX.
            </Text>
            <Checkbox isChecked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}>
              I agree with the terms and conditions
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" isDisabled={!isChecked}>
              I want Burnium access now - soon
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
