import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import WrapperPages from "hoc/WrapperPages";
import withElronDapp from "hoc/withElronDapp";
import TitleSection from "./TitleSection";
import CryptoTable from "./CryptoTable";
import { Center, Flex } from "@chakra-ui/react";
import Title from "components/Farms/Title/Title";

const Ecosystem = () => {
  return (
    <Layout>
      <MyContainer pb="70px">
        <Flex
          w="full"
          justifyContent={"center"}
          flexDir="column"
          alignContent={"center"}
          maxW="1500px"
          mx="auto"
        >
          <TitleSection />
          <Center textAlign={"center"}>
            <CryptoTable/>
          </Center>
        </Flex>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Ecosystem));
