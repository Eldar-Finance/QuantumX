import { Center, Flex } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import ActionModal from "components/ProteoComponents/ActionModal/ActionModal";
import ProteoFarmsCard from "components/ProteoComponents/ProteoFarmsCard/ProteoFarmsCard";
import Search from "components/ProteoComponents/Search/Search";
import Selector from "components/ProteoComponents/Selector/Selector";
import Title from "components/ProteoComponents/Title/Title";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import { proteoFarmsArr } from "./constants";

const ProteoFarms = () => {
  return (
    <Layout pt="150px">
      <MyContainer pb="100px">
        <Flex
          w="full"
          justifyContent={"center"}
          flexDir="column"
          alignContent={"center"}
          maxW="1000px"
          mx="auto"
        >
          <Title title="Farms" />
          <Flex w="full" justifyContent={"flex-end"} mt="12">
            <Flex gap="20px">
              <Search />
              <Selector
                onchange={(e) => console.log(e)}
                sortKey="new"
                sorts={["new", "amount"]}
              />
            </Flex>
          </Flex>
          <Center mt="50px" w="full">
            <ProteoFarmsCard proteoArr={proteoFarmsArr} />
          </Center>
        </Flex>
        <ActionModal isOpen={false} onClose={() => console.log("close")} />
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(ProteoFarms));
