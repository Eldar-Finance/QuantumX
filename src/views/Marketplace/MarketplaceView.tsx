import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import WrapperPages from "hoc/WrapperPages";
import withElronDapp from "hoc/withElronDapp";
import MarketplaceQxTag from "./components/MarketplaceQxTag";

const MarketplaceView = () => {
    return (
        <Layout>
            <MyContainer
                display={"flex"}
                flexDir="column"
                alignItems={"center"}
                pb={"500px"}
                pt={10}
            >
                <MarketplaceQxTag />
            </MyContainer>
        </Layout>
    );
};

export default withElronDapp(WrapperPages(MarketplaceView));
