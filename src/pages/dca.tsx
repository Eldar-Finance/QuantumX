import { MetaHead } from "components/MetaHead/MetaHead";
import Dca from "views/Dca/Dca";
const DcaPage = () => {
  return (
    <>
      <MetaHead
        metaTitle="QuantumX - Dollar Cost-Averaging"
        metaDescription="The QuantumX Cost Averaging (DCA) Smart Contract is here to help you organise your investing strategy and also save you time. The DCA is taking the hassle and complexity of re-investing away, and it is AUTOMATICALLY swapping your EGLD into various ESDT tokens."
        metaImage="/images/dca.png"
      />
      <Dca />
    </>
  );
};

export default DcaPage;
