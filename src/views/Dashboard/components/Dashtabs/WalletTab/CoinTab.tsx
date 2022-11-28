import { Box } from "@chakra-ui/react";
import { EgldlogoIcon } from "components/Icons/ui";
import SearchTable from "components/Tables/SearchTable";
import orderBy from "lodash/orderBy";
import { useEffect, useState } from "react";
import {
  selectEgldBalance,
  selectMexPairsData,
  selectUserAccountData,
  selectUserAddress,
} from "redux/slices/userAcount/account-slice";
import {
  fetchEgld,
  fetchMexPairs,
  fetchNfts,
  fetchTokens,
} from "redux/slices/userAcount/funcs";
import {
  formatBalance,
  formatBalanceDolar,
} from "utils/functions/formatBalance";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { tokenColumns } from "./TableColumns";

const CoinTab = () => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);

  const egldData = useAppSelector(selectEgldBalance);
  const mexPairs = useAppSelector(selectMexPairsData);

  const tableData = useAppSelector(selectUserAccountData);

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchMexPairs());
    if (address) {
      dispatch(fetchEgld(address));
      dispatch(fetchTokens(address));
      dispatch(fetchNfts(address));
    }
  }, [address, dispatch]);

  useEffect(() => {
    const newData = [];
    tableData.data.forEach((token) => {
      newData.push({
        tokenBalance: token.price ? formatBalanceDolar(token, token.price) : 0,
        ...token,
      });
    });

    const orderData = orderBy(
      newData,
      [
        function(o) {
          return o.tokenBalance;
        },
      ],
      "desc"
    );

    const priceEgld = mexPairs.find((e) => e.baseName === "WrappedEGLD");
    const EgldData = {
      tokenBalance: formatBalance(egldData, false, 3),
      identifier: "EGLD",
      name: "EGLD",
      ticker: "EGLD",
      decimals: 18,
      assets: {
        img: <EgldlogoIcon /* size={"24px"} */ />,
      },

      price: priceEgld?.basePrice,

      balance: egldData.balance,
    };

    orderData.unshift(EgldData);
    setData(orderData);
  }, [tableData.data, egldData, mexPairs]);

  return (
    <Box w="full" maxW={"700px"} mx="auto" minH="70vh" overflow={"auto"}>
      {" "}
      <SearchTable tableData={data} columnsData={tokenColumns} />
    </Box>
  );
};

export default CoinTab;
