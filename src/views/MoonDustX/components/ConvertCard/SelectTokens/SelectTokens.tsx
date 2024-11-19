import { Center, CheckboxGroup, Flex, Spinner, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import {
  selectConvertInfo,
  selectToTokenDust,
} from "redux/slices/moondustx/moondustx-slice";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import { IElrondAccountToken } from "utils/types/elrond.interface";
import { limitDollarAmount } from "views/MoonDustX/utils/contants";
import RowToken from "./RowToken";

const SelectTokens = () => {
  const toTokenToConvert = useAppSelector(selectToTokenDust);

  const [userTokens, _t, isLoading]: IElrondAccountToken[][] = useGetUserTokens();

  const selectedTokens = useAppSelector(selectConvertInfo);

  const finalTokens = userTokens.filter((userToken) => {
    if (
      userToken.identifier !== "EGLD" &&
      formatBalanceDolar(userToken, userToken.price) > limitDollarAmount &&
      userToken.identifier !== toTokenToConvert
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
      rounded="xl"
      px={{ xs: "12px", md: "20px" }}
    >
      {isLoading ? (
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
