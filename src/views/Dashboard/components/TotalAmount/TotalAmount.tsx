import { ViewOffIcon } from "@chakra-ui/icons";
import { Center, Icon, Text } from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import { EyeIcon } from "components/Icons/ui";
import { useEffect, useState } from "react";
import { setTotalBalance } from "redux/slices/userAcount/account-slice";
import { formatPrecision, getRealBalance } from "utils/functions/formatBalance";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import useGetTokenPrice from "utils/hooks/useGetTokenPrice";
import { createStringWithCharAndLenght } from "views/Dashboard/funcs/functions";

const TotalAmount = () => {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => state.userAccount.tableData.data);
  const egldData = useAppSelector(
    (state) => state.userAccount.egldBalance.data
  );
  const balance = useAppSelector((state) => state.userAccount.totalBalance);
  const [egldPrice] = useGetTokenPrice(toknesID.egld);

  const [showBalance, setshowBalance] = useState(true);
  const hideBalance = () => {
    setshowBalance((bal) => !bal);
  };

  useEffect(() => {
    if (egldPrice) {
      let total: any = getRealBalance(
        egldPrice * egldData.balance,
        egldData.decimals
      );

      if (tableData.length > 0) {
        tableData.forEach((token) => {
          if (token.price) {
            total += // @ts-ignore
              getRealBalance(token.balance, token.decimals) * token.price;
          }
        });
      }
      dispatch(setTotalBalance(total));
    }
  }, [egldData, tableData, dispatch, egldPrice]);

  const balanceDisplayed = formatPrecision(balance, 2);
  return (
    <Center
      position={"relative"}
      p="20px 50px 20px 30px"
      bg="black.dark"
      borderRadius="xl"
    >
      <Text fontSize={"4xl"} fontWeight="500">
        {showBalance
          ? `$${balanceDisplayed}`
          : createStringWithCharAndLenght(
              "*",
              balanceDisplayed.toString().length
            )}
      </Text>
      <Center
        position={"absolute"}
        boxSize="70px"
        bg="black.baseDark"
        borderRadius={"15px"}
        right={"-35px"}
        cursor="pointer"
        onClick={hideBalance}
      >
        <Icon as={showBalance ? ViewOffIcon : EyeIcon} fontSize={"18px"} />
      </Center>
    </Center>
  );
};

export default TotalAmount;
