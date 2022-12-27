import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { proteoEliteWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { coinInfo } from "utils/constants/farms";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import useLogin from "utils/hooks/useLogin";
import { IProteoFarm } from "utils/types/farms.interface";

interface IProps {
  pf: IProteoFarm;
}

const Avilable = ({ pf }: IProps) => {
  const withDrawInfo = useAppSelector((state) => state.proteo.withDrawInfo);
  const { isLoggedIn, handleLogin } = useLogin();
  const handleWithDraw = async (tokenI) => {
    const scCall = (await import("api/sc/calls")).scCall;
    const BytesValue = (await import("@elrondnetwork/erdjs/out")).BytesValue;
    scCall(proteoEliteWsp, "withdraw", [BytesValue.fromUTF8(tokenI)], 60000000);
  };

  const t = withDrawInfo.data.find((t) => t.tokenI === pf.tokenIdentifier);

  const token = formatTokenI(t?.tokenI);
  return (
    <Box>
      <Flex w="full" justifyContent={"space-between"}>
        <Text color="white.400">Available to withdraw</Text>
        <Flex alignItems={"center"} gap={2}>
          <Text>
            {formatBalance({
              balance: t?.amount,
              decimals: coinInfo[token]?.decimals,
            })}
          </Text>
          {coinInfo[token]?.logo}
        </Flex>
      </Flex>
      <Center mt="2">
        <ActionButton
          onClick={isLoggedIn ? () => handleWithDraw(t?.tokenI) : handleLogin}
        >
          WITHDRAW
        </ActionButton>
      </Center>
    </Box>
  );
};

export default Avilable;
