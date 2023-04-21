import { BigUIntValue, BytesValue } from "@multiversx/sdk-core/out";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";
import useSwr from "swr";

const useMultiSakingRatio = (farmId: number, secondaryToken: string) => {
  const { data, isLoading, error } = useSwr(
    `farms2:multistakedTokenRatio:${farmId}:${secondaryToken}`,
    async () => {
      const sc = await scQuery("farms2", "multistakedTokenRatio", [
        new BigUIntValue(new BigNumber(farmId)),
        BytesValue.fromUTF8(secondaryToken),
      ]);
      const data = sc.firstValue.valueOf().toNumber();
      console.log("secondaryToken", secondaryToken);
      console.log("data", data);
      return data;
    }
  );

  return {
    ratio: data,
    isLoading,
    error,
  };
};

export default useMultiSakingRatio;
