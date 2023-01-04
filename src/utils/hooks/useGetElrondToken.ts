import { toknesID } from "api/net.config";
import { getEconomics } from "api/rest/elrondApi/network";
import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import useSWR from "swr";
import { host } from "utils/constants/site";
import { IElrondToken } from "utils/types/elrond.interface";

const useGetElrondToken = (tokenIdeniifer: string) => {
  const { data, error } = useSWR(
    {
      identifier: tokenIdeniifer === "EGLD" ? null : tokenIdeniifer,
    },
    getFromAllTokens
  );
  const { data: egldData, error: egkdError } = useSWR(
    {
      identifier: tokenIdeniifer === "EGLD" ? {} : null,
    },
    getEconomics
  );

  const dataApi = data?.data.length > 0 && data?.data[0];
  let manualData = null;
  if (tokenIdeniifer === "EGLD") {
    if (egldData) {
      manualData = {
        type: "FungibleESDT",
        identifier: "EGLD",
        name: "EGLD",
        ticker: "EGLD",
        decimals: 18,
        assets: {
          svgUrl: "/images/egld.svg",
        },

        price: egldData.data.price,
        marketCap: egldData.data.marketCap,
        supply: egldData.data.totalSupply,
        circulatingSupply: egldData.data.circulatingSupply,
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
        svgUrl: host + "/images/bear.png",
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
