import { Flex } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import Layout from "components/Layout/Layout";
import NextImage from "components/NextImage/NextImage";
import TitlePage from "components/TitlePage/TitlePage";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import { useEffect } from "react";
import { FetchWhitelistedTokens } from "redux/slices/smartSwaps/funcs";
import { useAppDispatch } from "utils/hooks/redux";
import useGetElrondToken from "utils/hooks/useGetElrondToken";
import ConvertCard from "./components/ConvertCard/ConvertCard";
import { toTokenToConvert } from "./utils/contants";

const ConverterView = () => {
  const dispatch = useAppDispatch();
  const { token } = useGetElrondToken(toTokenToConvert);
  useEffect(() => {
    dispatch(FetchWhitelistedTokens());
  }, [dispatch]);
  return (
    <Layout>
      <MyContainer maxW="730px" mt={-8} mb={20}>
        <TitlePage
          title="Raretopia"
          subtitle={
            <Flex
              as="span"
              alignItems={"center"}
              justifyContent="center"
              textAlign="center"
              flexWrap={"wrap"}
            >
              Welcome to Raretopia! Convert all your favorite tokens to{" "}
              {token && token?.assets ? (
                <Flex as="span" w="30px" mx={2} my={1}>
                  <NextImage
                    alt="RARE"
                    src={token.assets.svgUrl}
                    width={40}
                    height={40}
                  />
                </Flex>
              ) : (
                "RARE"
              )}{" "}
              in one click. Easy, fast, and secure.
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
