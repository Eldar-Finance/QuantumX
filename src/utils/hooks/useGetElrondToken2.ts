import { toknesID } from "api/net.config";
import { getFromAllTokens, getTokenPrice } from "api/rest/elrondApi/tokens";
import { getFromAllTokens2, getTokenPrice2 } from "api/rest/elrondApi/tokens/index2";
import useSWR from "swr";
import { IElrondToken } from "utils/types/elrond.interface";

const useGetElrondToken = (tokenIdeniifer: string) => {
  const { data, error } = useSWR(
    {
      identifier: tokenIdeniifer === "EGLD" ? null : tokenIdeniifer,
    },
    getFromAllTokens2
  );
  const { data: egldPrice, error: egkdError } = useSWR(
    tokenIdeniifer === "EGLD" ? toknesID.wegld : null,
    getTokenPrice2
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

  if (tokenIdeniifer === toknesID.nfttoken) {
    manualData = {
      ...dataApi,
      assets: {
        svgUrl: "/images/nfttoken.png",
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
