import BigNumber from "bignumber.js";
import { IFarmWithTvl } from "components/Farms/FarmsCard/FarmsCard";
import { isArray } from "lodash";
import { IElrondToken } from "utils/types/elrond.interface";
import { IScFarm2RewardsLeft, IScFarmItem } from "utils/types/sc.interface";
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


export const getSortedFarm = (
  tokenPrices,
  tokens,
  othersArr,
) => {


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

      const othersLockedValues = farm.extraPools.map((item) => {
        let val = 0;
        const decimals =
          tokens.find((t) => t.identifier === item.stakedToken)?.decimals || 0;
        const price =
          tokenPrices.find((tp) => tp.tokenI === item.stakedToken)?.price || 0;

        if (price && decimals) {
          val = formatBalanceDolar(
            {
              balance: item.stakedBalance,
              decimals: decimals,
            },
            price
          );
        }

        return val;
      });

      const total = othersLockedValues.reduce((a, b) => a + b, 0) + totalLocked;

      const totalLockedBalance: IFarmWithTvl = {
        stakedTokenDecimals: decimals,
        stakedTokenPrice: tokenPrice,
        tokenI: farm.farm.stakingToken,
        totalLocked: total,
        type: "farms2",
        farm: farm,
      };
      return totalLockedBalance;
    }
  );

  // combine 2 arrays

  const tvls: IFarmWithTvl[] = farms2TotalLockedBalanceArr;

  const sortedTvls = orderSimpleData(tvls, "totalLocked", "desc");
  return sortedTvls;

  // setFarmStored(sortedTvls);
};

export const aprFarms = (
  price: number | { tokenI: string; price: number }[],
  stakingToken: IElrondToken[],
  lastRewardedEpoch,
  rewardTokens,
  farm: IScFarmItem,
  stats,
  type: "single" | "multi" = "single",
  multifarmRewardsLeft: IScFarm2RewardsLeft[] = undefined,
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
      if (isArray(price)) {
        const stakedTokens = [
          farm.stakedToken,
          ...farm.extraPools.map((e) => e.stakedToken),
        ];
        const totalDollarStakedAmount = stakedTokens.reduce(
          (acc, stakedToken) => {
            const tokenPrice =
              price.find((p) => p.tokenI === stakedToken)?.price || 0;
            const decimals =
              stakingToken.find((t) => t.identifier === stakedToken)
                ?.decimals || 0;
            const stakedBalance =
              farm.stakedToken === stakedToken
                ? farm.stakedBalance
                : farm.extraPools.find((e) => e.stakedToken === stakedToken)
                    ?.stakedBalance || 0;
            const dollarStakedAmount = formatBalanceDolar(
              { balance: stakedBalance, decimals: decimals },
              tokenPrice
            );
            return acc + dollarStakedAmount;
          },
          0
        );

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
                totalDollarStakedAmount) *
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
                    totalDollarStakedAmount) *
                    100 *
                    365) /
                    epochDifference
                ).toString()
              ) + " %";
          }
        } else {
          if (multifarmRewardsLeft) {
            const rewardLeftTokens = rewardTokens as IElrondToken[];

            const rewardsLeftDolarAmount = rewardLeftTokens.reduce(
              (acc, token) => {
                const tokenRewardsLeft: IScFarm2RewardsLeft =
                  multifarmRewardsLeft.find(
                    (r) => r.token === token.identifier
                  );

                let price = token.price;

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
                ((rewardsLeftDolarAmount / totalDollarStakedAmount) *
                  100 *
                  365) /
                epochDifference;
            } else {
              apr =
                formatNumber(
                  preventExponetialNotation(
                    ((rewardsLeftDolarAmount / totalDollarStakedAmount) *
                      100 *
                      365) /
                      epochDifference
                  ).toString()
                ) + " %";
            }
          }
        }
      } else {
        const realStakedToken = stakingToken.find(
          (t) => t.identifier === farm.stakedToken
        );
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
                    decimals: realStakedToken?.decimals,
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
                        decimals: realStakedToken?.decimals,
                      },
                      price
                    )) *
                    100 *
                    365) /
                    epochDifference
                ).toString()
              ) + " %";
          }
        } else {
          if (multifarmRewardsLeft) {
            const rewardLeftTokens = rewardTokens as IElrondToken[];

            const rewardsLeftDolarAmount = rewardLeftTokens.reduce(
              (acc, token) => {
                const tokenRewardsLeft: IScFarm2RewardsLeft =
                  multifarmRewardsLeft.find(
                    (r) => r.token === token.identifier
                  );

                let price = token.price;

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
                      decimals: realStakedToken?.decimals,
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
                          decimals: realStakedToken?.decimals,
                        },
                        price
                      )) *
                      100 *
                      365) /
                      epochDifference
                  ).toString()
                ) + " %";
            }
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

export const parseMultipleFarms = (
  inputArray: IScFarmItem[]
): IScFarmItem[] => {
  const outputArray: IScFarmItem[] = [];
  const processedFarmIds: Set<number> = new Set();

  inputArray.forEach((item) => {
    if (!processedFarmIds.has(item.farm.farmId)) {
      processedFarmIds.add(item.farm.farmId);
      const mainItem = inputArray.find(
        (i) =>
          i.farm.farmId === item.farm.farmId &&
          i.stakedToken === i.farm.stakingToken
      );

      if (mainItem) {
        const extraPools = inputArray
          .filter(
            (i) =>
              i.farm.farmId === item.farm.farmId &&
              i.stakedToken !== i.farm.stakingToken
          )
          .map((i) => ({ ...i, extraPools: undefined }));

        outputArray.push({ ...mainItem, extraPools });
      }
    }
  });
  return outputArray;
};

export const unparseMultipleFarms = (
  inputArray: IScFarmItem[]
): IScFarmItem[] => {
  const outputArray: IScFarmItem[] = [];

  inputArray.forEach((item) => {
    if (item.extraPools) {
      outputArray.push(item);
      item.extraPools.forEach((extraPool) => {
        outputArray.push(extraPool);
      });
    } else {
      outputArray.push(item);
    }
  });
  return outputArray;
};
