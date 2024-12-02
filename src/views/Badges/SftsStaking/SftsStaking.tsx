import { Alert, AlertIcon, Box, Flex, Link, Text,Image } from "@chakra-ui/react";
import BadgesCard from "./components/BadgesCard/BadgesCard";
import TitlePage from "components/TitlePage/TitlePage";

const SftsStaking = () => {
  return (
    <Box width={"full"}>
      <TitlePage
        title="QuantumX Rewards"
        subtitle={
          <Flex
            as="span"
            alignItems={"center"}
            justifyContent="center"
            textAlign="center"
            flexWrap={"wrap"}
          >
          </Flex>
        }
          mb={{sm: 8, md: 8}}
        />
        <Alert status='error' mb={4} css={{ borderRadius: '10px' }}>
          <AlertIcon />
          <Box>
            <Text>
              If you&apos;re not satisfied with your rewards, you can burn your SFTs for $BFY and $EGLD at a discounted price on the Burnify Protocol!🔥💎✨
            </Text>
            <Text>
              Unstake your Eldar Badges now and Burn them at {' '}
              <Link href="https://burnify.app/nft-burn" isExternal color={'red'}>
                Burnify
              </Link>
              .
            </Text>
          </Box>
        </Alert>
      <BadgesCard />
    </Box>
  );
};

export default SftsStaking;
