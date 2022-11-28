import { ViewOffIcon } from "@chakra-ui/icons";
import { Center, Icon, Text } from "@chakra-ui/react";
import { EyeIcon } from "components/Icons/ui";
import { useEffect, useState } from "react";
import { setTotalBalance } from "redux/slices/userAcount/account-slice";
import { formatPrecision, getRealBalance } from "utils/functions/formatBalance";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { createStringWithCharAndLenght } from "views/Dashboard/funcs/functions";

const TotalAmount = () => {
  const dispatch = useAppDispatch();
  const mexPairs = useAppSelector((state) => state.userAccount.mexPairs.data);
  const tableData = useAppSelector((state) => state.userAccount.tableData.data);
  const egldData = useAppSelector(
    (state) => state.userAccount.egldBalance.data
  );
  const balance = useAppSelector((state) => state.userAccount.totalBalance);

  const [showBalance, setshowBalance] = useState(true);
  const hideBalance = () => {
    setshowBalance((bal) => !bal);
  };

  useEffect(() => {
    const egldMex = mexPairs.find((e) => e.baseName === "WrappedEGLD");
    if (egldMex) {
      let total: any = getRealBalance(
        egldMex.basePrice * egldData.balance,
        egldData.decimals
      );

      if (mexPairs.length > 0 && tableData.length > 0) {
        tableData.forEach((token) => {
          if (token.price) {
            total += // @ts-ignore
              getRealBalance(token.balance, token.decimals) * token.price;
          }
        });
      }
      dispatch(setTotalBalance(total));
    }
  }, [mexPairs, egldData, tableData, dispatch]);

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
