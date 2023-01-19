import { getEconomics } from "api/rest/elrondApi/network";
import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import useSWR from "swr";
import { IElrondToken } from "utils/types/elrond.interface";

const useGetMultipleElrondTokens = (tokensIdentifiers: string[]) => {
  const isEgldonTokens = tokensIdentifiers.includes("EGLD");
  const { data, error } = useSWR(
    tokensIdentifiers.length !== 0
      ? {
          identifiers: tokensIdentifiers.join(","),
        }
      : null,
    getFromAllTokens
  );

  const { data: egldData, error: egkdError } = useSWR(
    {
      identifier: isEgldonTokens ? {} : null,
    },
    getEconomics
  );

  const finalData: IElrondToken[] = data?.data;

  if (isEgldonTokens) {
    if (egldData && finalData) {
      if (finalData.findIndex((item) => item.identifier === "EGLD") === -1) {
        finalData.unshift({
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
        });
      }
    }
  }

  return {
    tokens: finalData || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGetMultipleElrondTokens;
