import axiosEldron from "api/rest/axiosEldron";
import axiosNewEl from "api/rest/axiosNewEl";
import { formatBalance } from "utils/functions/formatBalance";
import { IElrondToken } from "utils/types/elrond.interface";

// export const getFromAllTokens = async () => {
//   return await axiosEldron.get("/tokens?size=10000");
// };
export const getFromAllTokens2 = async ({
  size = 400,
  name = undefined,
  identifier = undefined,
  identifiers = undefined,
  search = undefined,
}) => {
  return await axiosNewEl.get<IElrondToken[]>("/tokens", {
    params: {
      identifier,
      identifiers,
      name,
      size,
      search,
    },
  });
};

//export const getTokenPrice2 = async (identifier: string) => {
  //const res = axiosNewEl.get<{ price: number }>(
    //`/tokens/${identifier}?fields=price`
  //);

  //return (await res).data.price;
//};

export const getTokenPrice2 = async (identifier: string) => {
  try {
    const response = await fetch(`https://api.web3ninja.eu/api/pricecall.php?tokenA=${identifier}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.price) {
      throw new Error(`Response does not contain a price field`);
    }

    return data.price;
  } catch (error) {
    throw new Error(`Failed to fetch token price: ${error.message}`);
  }
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
