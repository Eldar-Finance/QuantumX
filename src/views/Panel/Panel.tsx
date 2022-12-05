import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchCreatorsFarms } from "redux/slices/farms2/funcs";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { useAppDispatch } from "utils/hooks/redux";
import PanelTable from "./components/PanelTable/PanelTable";
import PanelTitle from "./components/PanelTitle/PanelTitle";

const Panel = () => {
  const dispatch = useAppDispatch();
  const address = useSelector(selectUserAddress);
  useEffect(() => {
    if (address) {
      dispatch(fetchCreatorsFarms(address));
    }
  }, [address, dispatch]);

  return (
    <Layout>
      <MyContainer
        display={"flex"}
        justifyContent="center"
        flexDir={"column"}
        alignItems={"center"}
        h="full"
        gap="25px"
        w="full"
      >
        <PanelTitle />
        <PanelTable />
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Panel));
