import AmountBox1 from "components/InfoBox/AmountBox1";
import useGetTotalValueInHype from "utils/hooks/useGetTotalValueInHype";

const LockedInPools = () => {
  const totalValueLocked = useGetTotalValueInHype();
  return <AmountBox1 type="HYPEZONE" value={totalValueLocked} />;
};

export default LockedInPools;
