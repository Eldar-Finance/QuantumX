import { Address, AddressValue, BigUIntValue } from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";
import { INomalSmartSwap } from "utils/types/others.interface";
import { IScFarmItem } from "utils/types/sc.interface";
import { getNormalSwapArgs } from "views/Swap/services/swap";

export async function fetchInfoForNumber7Pool([key, address]) {
  const res = await scQuery("xoxnoSrbPoolsInfoWsp", "getWalletPools", [
    new AddressValue(new Address(address)),
  ]);
  let data: number[] = [];
  if (res?.firstValue?.valueOf()) {
    data = res.firstValue.valueOf().map((num: BigNumber) => num.toNumber());
  }

  return data;
}

export async function compound(farm: IScFarmItem, swapInfo: INomalSmartSwap[]) {
  const dataToSend = getNormalSwapArgs(swapInfo, 2);
  scCall(
    "farms2",
    "compound",
    [new BigUIntValue(new BigNumber(farm.farm.farmId)), ...dataToSend],
    180000000
  );
}
