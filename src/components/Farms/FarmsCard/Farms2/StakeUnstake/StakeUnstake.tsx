import { Center, Flex, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import dynamic from "next/dynamic";
import { useState } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { IScFarmItem } from "utils/types/sc.interface";
import { ProteoItemContenxt } from "../../ProteoFarmItem";

const StakeModal: any = dynamic(() => import("./StakeModal"));
const UnstakeModal: any = dynamic(() => import("./UnstkeModal"));

interface IProps {
  farm: IScFarmItem;
}

const StakeUnstake = ({ farm }: IProps) => {
  const [openStake, setOpenStake] = useState(false);
  const [openUnstakeStake, setOpenUnstakeStake] = useState(false);

  return (
    <ProteoItemContenxt.Consumer>
      {(value) => {
        const { tokenInfo, tokenInfo2, decimals } = value;

        return (
          <Flex h="full" flexDir={"column"}>
            <Text color="white.400">
              STAKE {formatTokenI(farm.farm.stakingToken)} LP
            </Text>
            <Flex mt="2" gap="3" flex={1} alignItems="center">
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
                farm={farm}
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
                farm={farm}
                isOpen={openUnstakeStake}
                onClose={() => setOpenUnstakeStake((s) => !s)}
              />
            )}
          </Flex>
        );
      }}
    </ProteoItemContenxt.Consumer>
  );
};

export default StakeUnstake;
