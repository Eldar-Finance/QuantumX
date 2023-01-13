import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  HStack,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { EldarSftCollection } from "api/net.config";
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
  return (
    <Card px={5} bg="secondary">
      <CardHeader mb={3} flexDir="column">
        <Flex justifyContent="space-between" w={"full"}>
          <Box>
            <Text
              fontSize={"4xl"}
              as="h2"
              fontWeight={"extrabold"}
              display={{ xs: "none", md: "block" }}
              color="white"
            >
              Staking
            </Text>
          </Box>
          <HStack spacing={{ xs: "10px", movil: "20px", md: "40px" }}>
            <Text
              fontSize={{ xs: "lg", md: "xl" }}
              whiteSpace="nowrap"
              color="white"
            >
              Buy on
            </Text>
            <Link
              isExternal
              href="https://deadrare.io/collection/ELBADGES-2efe5c"
            >
              <NextImage src={img1} alt="deadrare" width={25} />
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
        <Center>
          <Text
            fontSize={"4xl"}
            as="h2"
            fontWeight={"extrabold"}
            mt={8}
            display={{ xs: "block", md: "none" }}
          >
            Staking
          </Text>
        </Center>
      </CardHeader>
      <CardBody px={{ xs: "0px", md: "15px" }}>
        <Card bg="black.baseDark">
          <CardBody>
            <Box w={"full"}>
              <BadgesStatics />
              <Center
                flexDir={{ xs: "column", md: "row" }}
                justifyContent={{ xs: "center", lg: "flex-start" }}
                alignItems={{ xs: "center", md: "flex-start" }}
                mb={12}
              >
                <ClaimRewardsButton />
                <StakeButton
                  sfts={sfts}
                  address={address}
                  disabled={
                    sfts.length === 0 ||
                    isUserSftsInUnlocking ||
                    isSftsClaimable
                  }
                />
              </Center>
              {isStakerUser ? (
                <Flex justifyContent={"space-around"} flexWrap="wrap">
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
                      collection: EldarSftCollection,
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
                      />
                    );
                  })}
                </Flex>
              ) : (
                <Box my={8} fontSize="md" textAlign={"center"}>
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
              {isStakerUser && <UnStakeButton />}
              {(isUserSftsInUnlocking || isSftsClaimable) && (
                <ClaimSftsButton disabled={!isSftsClaimable} />
              )}
            </Box>
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  );
};

export default BadgesCard;
