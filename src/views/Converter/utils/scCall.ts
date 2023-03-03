import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
} from "@multiversx/sdk-core/out";
import { contractAddr } from "api/net.config";
import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import { ESDTTransferOnlyTx } from "api/sc/calls";
import { sendMultipleTransactions } from "api/sc/sc";
import BigNumber from "bignumber.js";
import { isArray } from "lodash";
import { INomalSmartSwap } from "utils/types/others.interface";
import { addressToReceiveRareInTx } from "views/Hypezone/utils/constants";
import { protocolFee, protocolFeeToken } from "./contants";

export interface IConvertTokenData {
  swapInfo: INomalSmartSwap[];
  slipapge: number;
  fromToken: {
    value: number | string;
    token: string;
  };
}
export const convertTokens = async (
  data: IConvertTokenData[],
  gasL?: number
) => {
  const swapTxs = await Promise.all(
    data.map(async (convertData) => {
      const tokensRes = await getFromAllTokens({
        identifier: convertData.fromToken.token,
      });
      if (!tokensRes || !tokensRes.data || !isArray(tokensRes.data)) {
        throw new Error("From token not found");
      }

      const fromElrondToken = tokensRes.data[0];
      const { fromToken, slipapge, swapInfo } = convertData;
      let isAshaStable = false;
      let scEndpoint = "swap";

      swapInfo.forEach((swapI) => {
        if (swapI?.type === "exchange") {
          isAshaStable = true;
        }
      });

      if (isAshaStable) {
        scEndpoint = "swapStable";
      }

      const dataToSend = swapInfo.flatMap((item) => {
        let scSwap = "swapTokensFixedInput";
        if (item?.type === "exchange") {
          scSwap = "exchange";
        }
        const amountWithSlipage = new BigNumber(item.amountReceivDec)
          .multipliedBy(slipapge)
          .dividedBy(100)
          .toNumber();

        const finalAmount = new BigNumber(item.amountReceivDec)
          .minus(amountWithSlipage)
          .toFixed(0);

        return [
          new AddressValue(new Address(item.smartcontract)),
          BytesValue.fromUTF8(scSwap),
          BytesValue.fromUTF8(item.token2),
          new BigUIntValue(new BigNumber(finalAmount)),
        ];
      });

      const tx = await ESDTTransferOnlyTx({
        funcName: scEndpoint,
        token: fromElrondToken,
        realValue: fromToken.value,
        contractAddr: contractAddr.smartSwap,
        args: dataToSend,
        gasL: gasL || 100000000,
      });

      return tx;
    })
  );

  const elrondProtocolTokenFeeRes = await getFromAllTokens({
    identifier: protocolFeeToken,
  });
  if (
    !elrondProtocolTokenFeeRes ||
    !elrondProtocolTokenFeeRes.data ||
    !isArray(elrondProtocolTokenFeeRes.data)
  ) {
    throw new Error("Protocol fee token not found");
  }
  const feeElrondToken = elrondProtocolTokenFeeRes.data[0];

  const protocoFeeTx = await ESDTTransferOnlyTx({
    funcName: "fee",
    token: feeElrondToken,
    contractAddr: addressToReceiveRareInTx,
    val: protocolFee,
    gasL: 20000000,
  });

  const convertTx = [protocoFeeTx, ...swapTxs];

  return await sendMultipleTransactions({ txs: convertTx });
};
