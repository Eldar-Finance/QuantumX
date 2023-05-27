import { toknesID } from "api/net.config";
import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import { ESDTTransferOnlyTx } from "api/sc/calls";
import { addressToReceiveRareInTx, rareFee } from "./constants";

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
      val: rareFee,
      realValue: realAmount,
      gasL: 5000000,
    });

    return t1;
  }
  return null;
};
