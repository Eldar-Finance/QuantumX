import { Flex } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import Title from "components/Farms/Title/Title";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import useGetTotalValueInFarms from "utils/hooks/useGetTotalValueInFarms";
import FarmsList from "./components/FarmsList/FarmsList";

const Farms = () => {
  const totalValueLocked = useGetTotalValueInFarms();

  return (
    <Layout>
      <MyContainer pb="100px">
        <Flex
          w="full"
          justifyContent={"center"}
          flexDir="column"
          alignContent={"center"}
          maxW="1000px"
          mx="auto"
        >
          <Title
            title="Farms"
            subtitle="Stake Liquidity Pool (LP) tokens"
            amount={totalValueLocked}
          />
          <FarmsList />
        </Flex>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Farms));
