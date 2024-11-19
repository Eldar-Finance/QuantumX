import { Flex, Text } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import TitlePage from "components/TitlePage/TitlePage";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import { useEffect } from "react";

import { useAppDispatch } from "utils/hooks/redux";
import ConvertCard from "./components/ConvertCard/MoonDustXCard";

const ConverterView = () => {

  return (
    <Layout>
      <MyContainer maxW="730px" mt={0} mb={20}>
        <TitlePage
          title="MoonDustX"
          subtitle={
            <Flex
              as="span"
              alignItems={"center"}
              justifyContent="center"
              textAlign="center"
              flexWrap={"wrap"}
            >
              <Text>
                Convert your small balances to any of our carefully selected tokens - in just one click.
              </Text>
              <Text>
                Easy, fast, and secure.
              </Text>
            </Flex>
          }
          mb={10}
        />

        <ConvertCard />
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(ConverterView));
