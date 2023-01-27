import { IFarmWithTvl } from "components/Farms/FarmsCard/FarmsCard";
import { noMaxTokens } from "utils/constants/farms";
import { orderSimpleData } from "./array";
import { formatBalanceDolar, formatNumber } from "./formatBalance";
import { preventExponetialNotation } from "./numbers";

export const getFeeBasedInEpoch = (epoch) => {
  if (epoch === undefined || epoch === null) {
    return null;
  }
  let fee = 0;
  if (epoch <= 1) {
    fee = 3;
  } else if (epoch > 1 && epoch <= 3) {
    fee = 2;
  } else if (epoch > 3 && epoch <= 19) {
    fee = 1;
  } else {
    fee = 0;
  }

  return fee;
};

export const haveMaxLimit = (token) => {
  return noMaxTokens.findIndex((t) => t === token) !== -1;
};

export const getSortedFarm = (
  tokenPrices,
  tokens,
  proteoArr,
  othersArr,
  generalFarmsData
) => {
  // let tvls: IFarmWithTvl[] = [];
  // calc total value locked for proteo farms

  //proteo farm token info []
  const prteoTokenInfo = proteoArr.map((pf) => {
    const { tokenIdentifier } = pf; // get static data of proteo farm (token idenfier)

    // find from the sc the info about the farm with the token idenfier
    const tokenInfo = generalFarmsData?.tokensInfo.find(
      (ti) => ti.tokenI === tokenIdentifier
    );

    // return an array of tokenns infos
    return { ...tokenInfo, pf: pf } as { staked?: number; tokenI; pf: any };
  });

  // now we can calc the total locked balance
  const proteoFarmTotalLockedBalanceArr: IFarmWithTvl[] = prteoTokenInfo.map(
    (tinfo) => {
      const decimals =
        tokens.find((t) => t.identifier === tinfo?.tokenI)?.decimals || 0;
      const tokenPrice =
        tokenPrices.find((tp) => tp.tokenI === tinfo?.tokenI)?.price || 0;
      const totalLocked = formatBalanceDolar(
        { balance: tinfo?.staked, decimals: decimals },
        tokenPrice
      );

      return {
        tokenI: tinfo?.tokenI,
        totalLocked: totalLocked,
        stakedTokenPrice: tokenPrice,
        stakedTokenDecimals: decimals,
        type: "proteo",
        farm: tinfo.pf,
      };
    }
  );
  // now I have all proteo farms total locked balance in dollars in an array (proteoFarmTotalLockedBalanceArr)

  /* --------------------------------- */

  // calculate farms2 total value locked
  const farms2TotalLockedBalanceArr: IFarmWithTvl[] = othersArr.allFarms.map(
    (farm) => {
      const decimals =
        tokens.find((t) => t.identifier === farm.farm.stakingToken)?.decimals ||
        0;
      const tokenPrice =
        tokenPrices.find((tp) => tp.tokenI === farm.farm.stakingToken)?.price ||
        0;

      const totalLocked = formatBalanceDolar(
        { balance: farm.stakedBalance, decimals: decimals },
        tokenPrice
      );
      const totalLockedBalance: IFarmWithTvl = {
        stakedTokenDecimals: decimals,
        stakedTokenPrice: tokenPrice,
        tokenI: farm.farm.stakingToken,
        totalLocked: totalLocked,
        type: "farms2",
        farm: farm,
      };
      return totalLockedBalance;
    }
  );

  // combine 2 arrays

  const tvls: IFarmWithTvl[] = [
    ...proteoFarmTotalLockedBalanceArr,
    ...farms2TotalLockedBalanceArr,
  ];

  const sortedTvls = orderSimpleData(tvls, "totalLocked", "desc");
  return sortedTvls;

  // setFarmStored(sortedTvls);
};

export const aprFarms = (
  price,
  stakingToken,
  lastRewardedEpoch,
  rewardToken,
  farm,
  stats
) => {
  let apr: string = "-";
  if (
    price &&
    stakingToken &&
    rewardToken &&
    lastRewardedEpoch &&
    farm.totalRewardsLeft > 0 &&
    farm.stakedBalance > 0
  ) {
    const epochDifference = lastRewardedEpoch + 1 - stats.epoch;

    if (epochDifference > 0) {
      apr =
        formatNumber(
          preventExponetialNotation(
            ((formatBalanceDolar(
              {
                balance: farm.totalRewardsLeft,
                decimals: rewardToken.decimals,
              },
              rewardToken.price
            ) /
              formatBalanceDolar(
                {
                  balance: farm.stakedBalance,
                  decimals: stakingToken.decimals,
                },
                price
              )) *
              100 *
              365) /
              epochDifference
          ).toString()
        ) + "%";
    }
  }
  return apr;
};
