import Card from "components/Card/Card";
import MyContainer from "components/Container/Container";

import Layout from "components/Layout/Layout";
import withElronDapp from "hoc/withElronDapp";
import WrapperPages from "hoc/WrapperPages";
import SwapCard from "./components/SmartSwap/SwapCard/SwapCard";
import { Text , Image , Flex } from "@chakra-ui/react";

const Swap = () => {
  return (
    <Layout>
      <MyContainer
        display={"flex"}
        flexDir="column"
        alignItems={"center"}
        pb={"50px"}
      >
        <Card
      maxW={"620px"}
      bg={"black.baseDark"}
      borderRadius="30px"
      border="1px solid"
      borderColor="transparent"
      p={{ sm: "10px", md: "20px" }}
      position="relative" // Set the Card's position to relative
    >
      <Image
        alt="fire"
        src="https://i.ibb.co/MPFd8PQ/firelkk12.png" // Replace with your image URL
        position="absolute" // Position the image absolutely
        top="-1%" // Align top edge with the card's top edge
        left="2%" // Align left edge with the card's left edge
        width={{ sm: "0px", md: "100px" }} // Adjust the size as needed
        height="auto" // Maintain the aspect ratio
        zIndex="1" // Ensure the image is above other content
        transform="translate(-50%, -50%)"
      />
      <SwapCard />
    </Card>
        
        <Flex
  mt={"40px"}
  align="center" // This ensures the logo is aligned with the text
>
  <Text
    fontSize={{ xs: "sm", md: "md" }}
    color={"white.500"}
  >
    Powered by 
  </Text>
  <Image
    alt="ash"
    src="https://app.ashswap.io/logo.png" // Replace with your logo URL
    width={{ xs: "64px", md: "96px" }} // Set the width to match your text size or as desired
    ignoreFallback // Optional: prevents showing an alternative text when the image is loadin
    ml={2}
    marginTop={"-10px"}
  />
</Flex>



      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Swap));
