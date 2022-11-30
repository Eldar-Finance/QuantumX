import { Flex } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import Search from "./components/Search/Search";
import Selector from "./components/Selector/Selector";

const ProteoFarms = () => {
  return (
    <Layout>
      <MyContainer>
        <Flex w="full" justifyContent={"flex-end"}>
          <Flex gap="20px">
            <Search />
            <Selector
              onchange={(e) => console.log(e)}
              sortKey="new"
              sorts={["new", "amount"]}
            />
          </Flex>
        </Flex>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(ProteoFarms));
