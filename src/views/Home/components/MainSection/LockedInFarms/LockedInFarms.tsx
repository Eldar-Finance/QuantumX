import AmountBox1 from "components/InfoBox/AmountBox1";
import useGetTotalValueInFarms from "utils/hooks/useGetTotalValueInFarms";

const LockedInFarms = () => {
  const totalValueLocked = useGetTotalValueInFarms();

  return <AmountBox1 type="FARMS" value={totalValueLocked} />;
};

export default LockedInFarms;
