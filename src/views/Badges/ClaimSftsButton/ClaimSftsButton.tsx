import { Center } from "@chakra-ui/react";
import { scCall } from "api/sc/calls";
import { sftsRewardsWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";

const ClaimSftsButton = ({ ...props }) => {
  const handleClaimSfts = async () => {
    const res = await scCall(sftsRewardsWsp, "claimSfts", [], 40000000);
  };

  return (
    <Center w="full">
      <ActionButton onClick={handleClaimSfts} {...props}>
        Retrieve SFTs
      </ActionButton>
    </Center>
  );
};

export default ClaimSftsButton;
