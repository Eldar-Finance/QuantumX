import { toknesID } from "api/net.config";
import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import { ESDTTransferOnlyTx } from "api/sc/calls";
import { addressToReceiveRareInTx } from "./constants";

export const getTxForRareFee = async (
  identifier?: string,
  realAmount?: number | string
) => {
  const { data: rareTokenData } = await getFromAllTokens({
    identifiers: identifier ?? toknesID.rare,
  });
  if (rareTokenData[0]) {
    const feeElrondToken = rareTokenData[0];
    const t1 = ESDTTransferOnlyTx({
      funcName: "fee",
      token: feeElrondToken,
      contractAddr: addressToReceiveRareInTx,
      val: 0.5,
      realValue: realAmount,
    });

    return t1;
  }
  return null;
};
