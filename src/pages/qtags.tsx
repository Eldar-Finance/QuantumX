import { MetaHead } from "components/MetaHead/MetaHead";
import { Fragment } from "react";
import Tags from "views/Tags/Tags";

const QtagsPage = () => {
  return (
    <Fragment>
      <MetaHead
        metaTitle="QuantumX Network - Tags"
        metaDescription="Create or change your QuantumX tag here!"
      />
      <Tags />
    </Fragment>
  );
};

export default QtagsPage;
