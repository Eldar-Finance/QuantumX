import { MetaHead } from "components/MetaHead/MetaHead";
import Swap from "views/Swap/Swap";
const SwapPage = () => {
  return (
    <>
      <MetaHead
        metaTitle="QuantumX Network - Swap"
        metaDescription="QuantumX - xExchnage"
        metaImage="/images/swap.png"
      />

      <Swap />
    </>
  );
};

export default SwapPage;
