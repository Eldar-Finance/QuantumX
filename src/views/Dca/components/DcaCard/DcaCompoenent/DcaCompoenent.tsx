import { Box } from "@chakra-ui/react";
import {
  BigUIntType,
  BigUIntValue,
  List,
  ListType,
  TokenIdentifierType,
  TokenIdentifierValue,
} from "@elrondnetwork/erdjs/out";
import { contractAddr } from "api/net.config";
import { EGLDPayment } from "api/sc/calls";
import { fastSwapInJex } from "api/sc/calls/swap/fastSwap";
import { dcaWsp, EGLD_VAL } from "api/sc/sc";
import BigNumber from "bignumber.js";
import Card from "components/Card/Card";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  selectJexPairs,
  setEgldPercentsAmounts,
  setTokensByEgldPercent,
  setTokensIdentifiers,
} from "redux/slices/dca/dca-slice";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { getDcaAmount } from "views/Dca/funcs";

import DCAButton from "./DCAButton/DCAButton";
import DCAOptions from "./DCAOptions/DCAOptions";
import EGLDField from "./EGLDField/EGLDField";
import SliderEgldValue from "./SliderEgldValue/SliderEgldValue";
import UserReturn from "./UserReturn/UserReturn";
const JexReturns: any = dynamic(() => import("./JexReturns/JexReturns"));
const SLIPAGE = 1;
const DcaCompoenent = () => {
  const [value, setValue] = useState(0);
  const dispatch = useAppDispatch();
  const [dataModal, setDataModal] = useState([]);
  const [slectedOption, setslectedOption] = useState(1);
  const { data: jexPairs } = useAppSelector(selectJexPairs);

  const tokensByEgldPercent = useAppSelector(
    (state) => state.lkmexAveraging.tokensByEgldPercent
  );
  const egldData = useAppSelector(
    (state) => state.userAccount.egldBalance.data
  );

  const tokensIdentifiers = useAppSelector(
    (state) => state.lkmexAveraging.tokensIdentifiers
  );
  const egldPercentsAmounts = useAppSelector(
    (state) => state.lkmexAveraging.egldPercentsAmounts
  );
  const handleChangeOption = (e) => {
    const val = e.target.value;
    setslectedOption(Number(val));
  };
  const handleSubmit = async () => {
    if (slectedOption === 5) {
      const finalOrders = [];

      jexPairs.forEach((jp) => {
        jp.userOrders.forEach((offer) => {
          finalOrders.push(offer);
        });
      });
      fastSwapInJex(finalOrders, contractAddr.fastp2pswap);
    } else {
      const amountArr = tokensByEgldPercent.map((amount) => {
        const realAmount = amount - (amount * SLIPAGE) / 100;
        return new BigNumber(realAmount).toFixed(0);
      });

      // console.log("tokensIdentifiers", tokensIdentifiers);
      // console.log("amountArr", amountArr);
      // console.log("egldPercentsAmounts", egldPercentsAmounts);

      const encodeIndent = tokensIdentifiers.map((ident) => {
        return new TokenIdentifierValue(ident);
      });
      const encodeAmount = egldPercentsAmounts.map((amount) => {
        return new BigUIntValue(new BigNumber(Number(amount * EGLD_VAL)));
      });
      const encodeMinAmount = amountArr.map((amount) => {
        return new BigUIntValue(new BigNumber(amount));
      });

      EGLDPayment(
        dcaWsp,
        "splitEGLD",
        Number(value),
        [
          new List(new ListType(new TokenIdentifierType()), encodeIndent),
          new List(new ListType(new BigUIntType()), encodeAmount),
          new List(new ListType(new BigUIntType()), encodeMinAmount),
        ],
        95000000
      );
    }
  };

  useEffect(() => {
    if (dataModal.length > 0) {
      const tokensI = dataModal.map((token) => {
        if (!token) {
          return null;
        }
        return token.identifier;
      });
      const percentArr = dataModal.map((token) => {
        if (!token) {
          return null;
        }
        console.log("token", token);

        return getDcaAmount(value, token);
      });
      const amountArr = dataModal.map((token) => {
        const amount = getDcaAmount(value, token, true);
        return amount * Math.pow(10, token.decimals);
      });
      dispatch(setTokensIdentifiers(tokensI));
      dispatch(setEgldPercentsAmounts(percentArr));
      dispatch(setTokensByEgldPercent(amountArr));
    }
  }, [dispatch, dataModal, value]);

  const handleOnChange = (val) => {
    setValue(Number(val));
  };
  return (
    <Card
      width={"full"}
      p={{ xs: "30px 15px", md: "60px" }}
      borderRadius={{ xs: "3xl", md: "6xl" }}
      bg="black.light"
    >
      <Box flexDir="column" p={0}>
        <EGLDField
          value={value}
          onChange={handleOnChange}
          balance={egldData.balance}
        />
        <SliderEgldValue
          value={value}
          setValue={setValue}
          balance={egldData.balance}
        />
        <DCAOptions
          slectedOption={slectedOption}
          handleChangeOption={handleChangeOption}
        />

        <UserReturn
          egldAmount={value}
          slectedOption={slectedOption}
          dataModal={dataModal}
          setDataModal={setDataModal}
        />
        {slectedOption === 5 && <JexReturns egldAmount={value} />}

        <DCAButton onClick={handleSubmit} disabled={value < 0.05} />
      </Box>
    </Card>
  );
};

export default DcaCompoenent;
