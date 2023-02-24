import { toknesID } from "api/net.config";
import { getFromAllTokens, getTokenPrice } from "api/rest/elrondApi/tokens";
import useSWR from "swr";
import { IElrondToken } from "utils/types/elrond.interface";

const useGetElrondToken = (tokenIdeniifer: string) => {
  console.log("tokenIdeniifer", tokenIdeniifer);

  const { data, error } = useSWR(
    {
      identifier: tokenIdeniifer === "EGLD" ? null : tokenIdeniifer,
    },
    getFromAllTokens
  );
  const { data: egldPrice, error: egkdError } = useSWR(
    tokenIdeniifer === "EGLD" ? toknesID.wegld : null,
    getTokenPrice
  );

  const dataApi = data?.data.length > 0 && data?.data[0];
  let manualData = null;
  if (tokenIdeniifer === "EGLD") {
    if (egldPrice) {
      manualData = {
        type: "FungibleESDT",
        identifier: "EGLD",
        name: "EGLD",
        ticker: "EGLD",
        decimals: 18,
        assets: {
          svgUrl: "/images/egld.svg",
        },
        price: egldPrice,
      };
    }
  }
  if (tokenIdeniifer === toknesID.prick) {
    manualData = {
      ...dataApi,
      assets: {
        svgUrl: "/images/prick.png",
      },
    };
  }
  if (tokenIdeniifer === toknesID.bear) {
    manualData = {
      ...dataApi,
      assets: {
        svgUrl: "/images/bear.png",
      },
    };
  }

  const finalDAta: IElrondToken = manualData || dataApi;
  return {
    token: finalDAta,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGetElrondToken;
