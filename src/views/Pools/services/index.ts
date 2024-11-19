import { Address, AddressValue, BigUIntValue } from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";
import { INomalSmartSwap } from "utils/types/others.interface";
import { IScFarmItem } from "utils/types/sc.interface";
import {
  getFirstArgsOfLpSwaps,
  getNormalSwapArgs,
  getOthersArgsOfLpSwaps,
} from "views/Swap/services/swap";

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

export async function compound(
  farm: IScFarmItem,
  swapInfo: INomalSmartSwap[],
  isSwapToLp: boolean
) {
  if (farm.farm.stakingToken === farm.farm.rewardToken) {
    scCall(
      "farms2",
      "compound",
      [new BigUIntValue(new BigNumber(farm.farm.farmId))],
      360000000
    );
  } else {
    if (isSwapToLp) {
      const swapLpData = swapInfo.filter((_d, i) => i > 0) as INomalSmartSwap[];
      const lpSwapArg = getFirstArgsOfLpSwaps(swapInfo, 2);
      const multiswapArgs = getOthersArgsOfLpSwaps(swapLpData, 2);

      scCall(
        "farms2",
        "compound",
        [
          new BigUIntValue(new BigNumber(farm.farm.farmId)),
          ...lpSwapArg,
          new BigUIntValue(new BigNumber(swapLpData[0].NrSwaps)),
          ...multiswapArgs,
        ],
        360000000
      );
    } else {
      const dataToSend = getNormalSwapArgs(swapInfo, 2);
      scCall(
        "farms2",
        "compound",
        [new BigUIntValue(new BigNumber(farm.farm.farmId)), ...dataToSend],
        360000000
      );
    }
  }
}
