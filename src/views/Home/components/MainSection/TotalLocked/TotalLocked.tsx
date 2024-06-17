import AmountBox2 from "components/InfoBox/AmountBox2";
import useGetTotalValueInFarms from "utils/hooks/useGetTotalValueInFarms";
import useGetTotalValueInHype from "utils/hooks/useGetTotalValueInHype";
import useGetTotalValuePools from "utils/hooks/useGetTotalValuePools";

const TotalLocked = () => {
  const totalValueLockedInFarms = useGetTotalValueInFarms();
  const totalValueLockedInPools = useGetTotalValuePools();
  const totalValueLockedInHype = useGetTotalValueInHype();

  return <AmountBox2 value={
    totalValueLockedInFarms + totalValueLockedInPools + totalValueLockedInHype
  } />;
};

export default TotalLocked;
