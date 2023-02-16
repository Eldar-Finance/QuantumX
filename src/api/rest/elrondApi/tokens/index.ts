import axiosEldron from "api/rest/axiosEldron";
import { formatBalance } from "utils/functions/formatBalance";
import { IElrondToken } from "utils/types/elrond.interface";

// export const getFromAllTokens = async () => {
//   return await axiosEldron.get("/tokens?size=10000");
// };
export const getFromAllTokens = async ({
  size = 10000,
  name = undefined,
  identifier = undefined,
  identifiers = undefined,
  search = undefined,
}) => {
  return await axiosEldron.get<IElrondToken[]>("/tokens", {
    params: {
      identifier,
      identifiers,
      name,
      size,
      search,
    },
  });
};

export const getTokenPrice = async (identifier: string) => {
  const res = axiosEldron.get<{ price: number }>(
    `/tokens/${identifier}?fields=price`
  );

  return (await res).data.price;
};

export const getLpTokenPrice = async (
  accountAddress,
  token1: string,
  lpToken: string
) => {
  try {
    const { data } = await axiosEldron.get<
      {
        identifier: string;
        ticker: string;
        balance: string;
        valueUsd: number;
        decimals: number;
      }[]
    >(
      `/accounts/${accountAddress}/tokens?fields=valueUsd,balance,identifier,decimals,ticker`
    );

    const val1 = data.find((token) => token.identifier === token1).valueUsd;

    const { data: supply } = await axiosEldron.get<{
      supply: string;
      circulatingSupply: string;
      minted: string;
      burnt: string;
      initialMinted: string;
    }>(`/tokens/${lpToken}/supply`);
    const USDC_VALUE = Number(val1);
    const minted = supply.minted;
    const burned = supply.burnt;

    const rareLpData = formatBalance(
      {
        balance: Number(minted) - Number(burned),
        decimals: 18,
      },
      true
    );
    const lpTokenInDollar = (2 * USDC_VALUE) / rareLpData;

    return lpTokenInDollar;
  } catch (error) {
    console.log("error", error);
  }
};
