import AmountBox1 from "components/InfoBox/AmountBox1";
import useGetTotalValuePools from "utils/hooks/useGetTotalValuePools";

const LockedInPools = () => {
  const totalValueLocked = useGetTotalValuePools();
  return <AmountBox1 type="POOLS" value={totalValueLocked} />;
};

export default LockedInPools;
