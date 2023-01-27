import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useGetAccountInfo } from "@elrondnetwork/dapp-core";
import {
  selectUserAddress,
  selectUserTokens,
} from "redux/slices/userAcount/account-slice";
import { fetchTokens } from "redux/slices/userAcount/funcs";
import { useAppDispatch } from "./redux";

const useGetUserTokens = (indentifier?: string, onlyEsdt?: boolean) => {
  const dispatch = useAppDispatch();
  const tokensData = useSelector(selectUserTokens);
  const addrees = useSelector(selectUserAddress);
  const acc = useGetAccountInfo();

  const userTokens = tokensData.allTokens;
  const [tokens, setTokens] = useState<any>([]);
  const [token, setToken] = useState<any>();

  useEffect(() => {
    if (addrees) {
      dispatch(fetchTokens(addrees));
    }
  }, [addrees, dispatch]);

  useEffect(() => {
    const newTokens = [...userTokens];
    if (!onlyEsdt) {
      newTokens.push({
        identifier: "EGLD",
        ticker: "EGLD",
        name: "EGLD",
        decimals: 18,
        assets: {
          svgUrl: "/images/egld.svg",
        },
        balance: acc.account.balance,
      });
    }
    if (indentifier) {
      const newtoken = newTokens.find((t) => t.identifier === indentifier);
      setToken(newtoken);
    }
    setTokens(newTokens);
  }, [acc.account.balance, userTokens, indentifier, onlyEsdt]);

  return [tokens, token];
};

export default useGetUserTokens;
