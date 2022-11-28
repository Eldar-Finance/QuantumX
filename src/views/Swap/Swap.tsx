import MyContainer from "components/Container/Container";

import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";

const Swap = () => {
  return (
    <Layout>
      <MyContainer>Swap</MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Swap));
