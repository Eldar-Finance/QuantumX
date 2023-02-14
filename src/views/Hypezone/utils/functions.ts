import { toknesID } from "api/net.config";
import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import { ESDTTransferOnlyTx } from "api/sc/calls";
import { addressToReceiveRareInTx } from "./constants";

export const getTxForRareFee = async () => {
  const { data: rareTokenData } = await getFromAllTokens({
    identifiers: toknesID.rare,
  });
  if (rareTokenData[0]) {
    const feeElrondToken = rareTokenData[0];
    const t1 = ESDTTransferOnlyTx({
      funcName: "fee",
      token: feeElrondToken,
      contractAddr: addressToReceiveRareInTx,
      val: 0.5,
    });

    return t1;
  }
  return null;
};
