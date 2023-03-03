import { Center, CheckboxGroup, Flex, Spinner, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import { selectConvertInfo } from "redux/slices/converter/converter-slice";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import { IElrondAccountToken } from "utils/types/elrond.interface";
import RowToken from "./RowToken";

const SelectTokens = () => {
  const [userTokens, _t, isLoading]: IElrondAccountToken[][] =
    useGetUserTokens();
  const tokens = useAppSelector((state) => state.smartSwap.tokens);
  const selectedTokens = useAppSelector(selectConvertInfo);

  const finalTokens = userTokens.filter((userToken) => {
    if (
      tokens.data.includes(userToken.identifier) &&
      userToken.identifier !== "EGLD" &&
      formatBalanceDolar(userToken, userToken.price) > 3
    ) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <Card
      as={Flex}
      flexDir={"column"}
      gap={"17px"}
      py={5}
      maxH="500px"
      overflow={"auto"}
    >
      {isLoading || tokens.status === "loading" ? (
        <Center w="full" minH="400px">
          <Spinner />
        </Center>
      ) : (
        <CheckboxGroup
          colorScheme="green"
          value={selectedTokens.map((item) => item.identifier)}
        >
          {finalTokens.map((token) => {
            return <RowToken key={token.identifier} token={token} />;
          })}

          {finalTokens.length === 0 && (
            <Center w="full" minH="200px">
              <Text fontSize={"xl"}>No tokens found</Text>
            </Center>
          )}
        </CheckboxGroup>
      )}
    </Card>
  );
};

export default SelectTokens;
