import { Address, AddressValue } from "@multiversx/sdk-core/out";
import { scQuery } from "api/sc/queries";
import { proteoEliteWsp } from "api/sc/sc";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import useSwr from "swr";
import { useAppSelector } from "utils/hooks/redux";
const fetchHarvestableRewards = async ([key, address]: [string, string]) => {
  const res = await scQuery(proteoEliteWsp, "getUserAllClaimable", [
    new AddressValue(new Address(address)),
  ]);

  const data: {
    stakedTokenI: string;
    claimableAmount: string;
    claimableTokenI: string;
  }[] = res.firstValue?.valueOf().map((r) => {
    return {
      stakedTokenI: r.field0,
      claimableAmount: r.field1.toString(),
      claimableTokenI: r.field2,
    };
  });

  return data;
};
const useGetHarvestableRewards = () => {
  const address = useAppSelector(selectUserAddress);
  const { data, isLoading, error } = useSwr<
    {
      stakedTokenI: string;
      claimableAmount: string;
      claimableTokenI: string;
    }[]
  >(["proteoElite:getUserAllClaimable", address], fetchHarvestableRewards);

  return {
    rewards: data || [],
    isLoading,
    error,
  };
};

export default useGetHarvestableRewards;
