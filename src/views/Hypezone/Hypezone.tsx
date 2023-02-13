import { Flex } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import Title from "components/Farms/Title/Title";
import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import FarmList from "./components/Farms/FarmsList/FarmList";

const Hypezone = () => {
  return (
    <Layout>
      <MyContainer pb="70px">
        <Flex
          w="full"
          justifyContent={"center"}
          flexDir="column"
          alignContent={"center"}
          maxW="1000px"
          mx="auto"
        >
          {" "}
          <Title
            title="Hypezone"
            subtitle="Hight Yield farming & pools for SRB $HYPE token"
            amount={148167.88}
            tvlText="Total value Locked on Hypezone"
          />
          <FarmList title="Farms" />
          <FarmList title="Pools" subtitle="[Stake $HYPE Earn $RARE]" />
          <FarmList title="Pools" subtitle="[Stake $RARE Earn $HYPE]" />
        </Flex>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Hypezone));
