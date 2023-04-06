import BigNumber from "bignumber.js";
import { IFarmWithTvl } from "components/Farms/FarmsCard/FarmsCard";
import { noMaxTokens } from "utils/constants/farms";
import { IElrondToken } from "utils/types/elrond.interface";
import { IScFarm2RewardsLeft } from "utils/types/sc.interface";
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
        { balance: farm.stakedBalance, decimals: decimals || 18 }, // decimals is 18 by default because can show really big numbers
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
  rewardTokens,
  farm,
  stats,
  type: "single" | "multi" = "single",
  multifarmRewardsLeft: IScFarm2RewardsLeft[] = undefined,
  extraPrices: { tokenI: string; price: number }[] = [],
  onlyNumber?: boolean
) => {
  let apr: string | number = "-";

  if (
    price &&
    stakingToken &&
    rewardTokens &&
    lastRewardedEpoch &&
    (farm.totalRewardsLeft > 0 || type === "multi") &&
    farm.stakedBalance > 0
  ) {
    const epochDifference = lastRewardedEpoch + 1 - stats.epoch;

    if (epochDifference > 0) {
      if (type === "single") {
        if (onlyNumber) {
          apr =
            ((formatBalanceDolar(
              {
                balance: farm.totalRewardsLeft,
                decimals: rewardTokens.decimals,
              },
              rewardTokens.price
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
            epochDifference;
        } else {
          apr =
            formatNumber(
              preventExponetialNotation(
                ((formatBalanceDolar(
                  {
                    balance: farm.totalRewardsLeft,
                    decimals: rewardTokens.decimals,
                  },
                  rewardTokens.price
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
      } else {
        if (multifarmRewardsLeft) {
          const rewardLeftTokens = rewardTokens as IElrondToken[];

          const rewardsLeftDolarAmount = rewardLeftTokens.reduce(
            (acc, token) => {
              const tokenRewardsLeft: IScFarm2RewardsLeft =
                multifarmRewardsLeft.find((r) => r.token === token.identifier);

              let price = token.price;
              const extraTokenPrice = extraPrices.find(
                (ept) => ept.tokenI === token.identifier
              );
              if (extraTokenPrice) {
                price = extraTokenPrice.price;
              }

              return (
                acc +
                formatBalanceDolar(
                  {
                    balance: tokenRewardsLeft.amount,
                    decimals: token.decimals,
                  },
                  price
                )
              );
            },
            0
          );

          if (onlyNumber) {
            apr =
              ((rewardsLeftDolarAmount /
                formatBalanceDolar(
                  {
                    balance: farm.stakedBalance,
                    decimals: stakingToken.decimals,
                  },
                  price
                )) *
                100 *
                365) /
              epochDifference;
          } else {
            apr =
              formatNumber(
                preventExponetialNotation(
                  ((rewardsLeftDolarAmount /
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
      }
    }
  }
  return apr;
};

export const apyFarms = (apr: number | string) => {
  if (apr === "-") {
    return "-";
  }
  const compoundingPeriods = 365;

  const apy = new BigNumber(
    new BigNumber(1).plus(
      new BigNumber(apr).dividedBy(100).dividedBy(compoundingPeriods)
    )
  )
    .pow(compoundingPeriods)

    .minus(1)
    .multipliedBy(100)
    .toFixed(2);

  return apy;
};
