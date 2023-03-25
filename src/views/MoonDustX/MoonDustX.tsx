import { Flex } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import TitlePage from "components/TitlePage/TitlePage";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import { useEffect } from "react";
import { FetchWhitelistedTokens } from "redux/slices/smartSwaps/funcs";
import { useAppDispatch } from "utils/hooks/redux";
import ConvertCard from "./components/ConvertCard/MoonDustXCard";
import Layout from "./components/Layout/Layout";

const ConverterView = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(FetchWhitelistedTokens());
  }, [dispatch]);
  return (
    <Layout>
      <MyContainer maxW="730px" mt={-8} mb={20}>
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
              Welcome to MoonDustX! Convert all your favorite tokens to WEGLD or
              USDC in one click. Easy, fast, and secure.
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
