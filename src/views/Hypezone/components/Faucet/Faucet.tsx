import { Center, Text } from "@chakra-ui/react";
import { scCallOnlyTx } from "api/sc/calls";
import { sendMultipleTransactions } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import NextImage from "components/NextImage/NextImage";
import { getTxForRareFee } from "views/Hypezone/utils/functions";
import { useUserCanClaim } from "views/Hypezone/utils/hooks";
import useGetfaucetInfo from "views/Panel/hooks/useGetfaucetInfo";
import faucetImg from "../../assets/faucetpng.png";
const Faucet = () => {
  const { info, isLoading } = useGetfaucetInfo();
  const { canUserClaim } = useUserCanClaim();
  const handleClaim = async () => {
    let txs = [];
    const t1 = await getTxForRareFee(info.cost.token, info.cost.amount);
    txs.push(t1);
    const claimTx = await scCallOnlyTx("hypezoneWsp", "claim", [], 5000000);
    txs.push(claimTx);

    sendMultipleTransactions({ txs: txs });
  };
  return (
    <Center
      w={{ xs: "200px", md: "300px" }}
      position={"relative"}
      height={{ xs: "150px", md: "auto" }}
    >
      <Center position="absolute" top={"-10px"} right={0}>
        <NextImage src={faucetImg} alt="faucet" height={350} width={300} />
      </Center>
      <Center
        bottom={{ xs: "-5px", md: "-25px" }}
        right={0}
        left={0}
        w="full"
        position={"absolute"}
        flexDir="column"
      >
        <ActionButton
          bg="white"
          mb={1}
          onClick={handleClaim}
          disabled={!canUserClaim}
        >
          CLAIM HYPE
        </ActionButton>
        <Text color="GrayText">*1 claim/epoch</Text>
      </Center>
    </Center>
  );
};

export default Faucet;
