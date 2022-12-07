import { Box, Center, Flex, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import CustomTooltip from "components/CustomTooltip/CustomTooltip";
import dynamic from "next/dynamic";
import { useState } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import { IProteoFarm } from "utils/types/farms.interface";
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
              <Center w="full">
                <ActionButton
                  onClick={() => setOpenStake((s) => !s)}
                  variant={"outline"}
                  w="full"
                  maxW={"500px"}
                >
                  STAKE LP
                </ActionButton>
              </Center>
              <Center flexDir={"column"} w="full">
                <Flex
                  justifyContent={"flex-end"}
                  alignItems="center"
                  fontSize={"small"}
                  mb="2"
                  color="gray.300"
                >
                  <CustomTooltip
                    text={
                      <Box fontWeight="bold" fontSize={"14px"}>
                        <Text mb={1}>Unstake Fees</Text>
                        <Text mb={1}>
                          Fees are changing from 0 to 3% according to new
                          deposits.
                        </Text>
                        <Text mb={1}>
                          Check the fee live every time you want to Unstake.
                        </Text>
                        <Text mb={1} fontWeight="bold">
                          Depositing or Unstaking resets the timer.
                        </Text>
                      </Box>
                    }
                  />

                  <Text ml={1}>Info about fees for Unstaking</Text>
                </Flex>

                <Center flex="1">
                  <ActionButton onClick={() => setOpenUnstakeStake((s) => !s)}>
                    UNSTAKE
                  </ActionButton>
                </Center>
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
