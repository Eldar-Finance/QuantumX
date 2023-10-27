import { fetchEligibleAddresses } from "api/rest/others/EldarSolutions";
import useSWR from "swr";
const useGetEligibleAddresses = () => {
  const { data, isLoading, error } = useSWR(
    "eligibilityapi.php",
    fetchEligibleAddresses
  );

  return {
    addresses: data || [],
  };
};

export default useGetEligibleAddresses;
