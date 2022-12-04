import { Box, Center, Flex, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import dynamic from "next/dynamic";
import { useState } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import { IProteoFarm } from "utils/types/proteo.interface";
import { ProteoItemContenxt } from "../../ProteoFarmItem";

const StakeModal: any = dynamic(() => import("./StakeModal"));
const UnstakeModal: any = dynamic(() => import("./UnstkeModal"));

interface IProps {
  pf: IProteoFarm;
}

const StakeUnstake = ({ pf }: IProps) => {
  const [openStake, setOpenStake] = useState(false);
  const [openUnstakeStake, setOpenUnstakeStake] = useState(false);

  return (
    <ProteoItemContenxt.Consumer>
      {(value) => {
        const { tokenInfo, tokenInfo2, decimals } = value;

        return (
          <Box>
            <Text color="white.400">STAKE {pf.stakedCoin} LP</Text>
            <Flex mt="2" gap="3">
              <ActionButton
                onClick={() => setOpenStake((s) => !s)}
                variant={"outline"}
                w="full"
                maxW={"500px"}
              >
                STAKE LP
              </ActionButton>
              <Center flex="1">
                <ActionButton onClick={() => setOpenUnstakeStake((s) => !s)}>
                  UNSTAKE
                </ActionButton>
              </Center>
            </Flex>
            {openStake && (
              <StakeModal
                pf={pf}
                isOpen={openStake}
                onClose={() => setOpenStake((s) => !s)}
                max={formatBalance(
                  { balance: tokenInfo?.avilableToStake, decimals: decimals },
                  true
                )}
                token={{ identifier: tokenInfo?.tokenI, decimals: decimals }}
              />
            )}
            {openUnstakeStake && (
              <UnstakeModal
                epochPassedFromStake={tokenInfo?.epoch}
                token={{ identifier: tokenInfo?.tokenI, decimals: decimals }}
                tokenInfo2={tokenInfo2}
                pf={pf}
                isOpen={openUnstakeStake}
                onClose={() => setOpenUnstakeStake((s) => !s)}
              />
            )}
          </Box>
        );
      }}
    </ProteoItemContenxt.Consumer>
  );
};

export default StakeUnstake;
