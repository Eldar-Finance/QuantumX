import { Box, useDisclosure } from "@chakra-ui/react";
import { transactionServices } from "@elrondnetwork/dapp-core";
import { scCall } from "api/sc/calls";
import { sftsRewardsWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { isArray } from "lodash";

import { memo, useState } from "react";
import { getReturnedDataOfscCall } from "utils/functions/helpers";
import { useAppSelector } from "utils/hooks/redux";
import RewardsModal from "../RewardsModal/RewardsModal";

const ClaimRewardsButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rewards, setRewards] = useState([]);
  const [sessionId, setSessionId] = useState<string>();
  const isRewards = useAppSelector((state) => state.eldarSfts.isLkmexRewards);
  const onSuccess = async () => {
    if (
      transactionStatus.transactions &&
      isArray(transactionStatus.transactions) &&
      transactionStatus.transactions[0].hash
    ) {
      const txHash = transactionStatus.transactions[0].hash;
      const res: any = await getReturnedDataOfscCall(
        sftsRewardsWsp,
        txHash,
        "claimRewards"
      );
      if (res.returnCode.text === "ok") {
        const data = res.firstValue.backingCollection.items.map((struct) => {
          return {
            tokenI: struct.getFieldValue("field0"),
            value: struct.getFieldValue("field1").toNumber(),
          };
        });
        onOpen();
        setRewards(data);
      }
    }
  };
  const transactionStatus = transactionServices.useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: onSuccess,
  });

  const handleClaimRewards = async () => {
    const res = await scCall(sftsRewardsWsp, "claimRewards", [], 50000000);
    setSessionId(res.sessionId);
  };
  return (
    <Box>
      <ActionButton
        ml={2}
        px={6}
        mb={4}
        onClick={handleClaimRewards}
        disabled={!isRewards}
      >
        Claim
      </ActionButton>

      <RewardsModal rewards={rewards} onClose={onClose} isOpen={isOpen} />
    </Box>
  );
};

export default memo(ClaimRewardsButton);
