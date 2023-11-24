import React, { useEffect, useState } from 'react';
import { Box, Card, Flex, IconButton, Image, Link, Text } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import SwapCard from './components/SmartSwap/SwapCard/SwapCard';
import Layout from 'components/Layout/Layout';
import MyContainer from 'components/Container/Container';
import withElronDapp from 'hoc/withElronDapp';
import WrapperPages from 'hoc/WrapperPages';
import { PiChartLine, PiChartLineBold } from "react-icons/pi";
import { HiOutlineChartBarSquare } from "react-icons/hi2";



const Swap = () => {
  const [isSecondCardOpen, setIsSecondCardOpen] = useState(false);
  const [graphTokens, setGraphTokens] = useState([]);
  const [isNftSwap, setIsNftSwap] = useState(false);
  const [tok1, setVariable1] = useState('');
  const [tok2, setVariable2] = useState('');
  //console.log("⚠️ ~ file: Swap.tsx:13 ~ graphTokens:", graphTokens)
  const [url, setUrl] = useState(`https://test.e-compass.io/quantumx/embed/MAIAR/${tok2}/USDC/60`);
  useEffect(() => {
    setUrl(`https://test.e-compass.io/quantumx/embed/MAIAR/${tok2}/USDC/60`);
}, [tok2]); // This will trigger the effect whenever token2 changes



  useEffect(() => {
    if (graphTokens.length >= 1) {
      const token1 = graphTokens[0].split('-')[0];
      setVariable1(token1);
    }
  
    if (graphTokens.length >= 2) {
      const token2 = graphTokens[1].split('-')[0];
      setVariable2(token2);
    }
  }, [graphTokens]);

  const toggleSecondCard = () => {
    setIsSecondCardOpen(!isSecondCardOpen);
  };

  return (
    <Layout>
      <MyContainer
        display="flex"
        flexDirection="column"
        alignItems="center"
        pb="50px"
        width="100%"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          width="100%"
          align="stretch"
          justify="center"
          gap="4"
        >
          {/* First Card */}
          <Card
            maxW={"520px"}
            width="100%"
            bg={"black.baseDark"}
            borderRadius="30px"
            border="1px solid"
            borderColor="transparent"
            p={{ sm: "10px", md: "20px" }}
            position="relative"
          >
          {/* The image now uses negative values to sit outside the top left corner */}
          <ImageQxAshFire/>
              <SwapCard setGraphTokens={setGraphTokens} setIsNftSwap={setIsNftSwap}/>
              {!isNftSwap && <IconButton
                aria-label="Toggle second card"
                icon={isSecondCardOpen ? < HiOutlineChartBarSquare style={{ width: '30px', height: '30px' }} />: <HiOutlineChartBarSquare style={{ width: '30px', height: '30px' }} />              }
                position="absolute"
                right="40px"
                top="4%"
                zIndex="4"
                onClick={toggleSecondCard}
                variant="ghost"
                background="none"
                fontSize={"3xl"}
                size={"xl"}
                sx={{
                  '@media screen and (max-width: 480px)': { // Adjust the breakpoint as needed
                    //display: 'none',
                    //display: 'none',
                    top: "2%",
                    zIndex:"4",
                    right: "28px",
                  },
                }}
              />}
            </Card>

          {/* Expandable Second Card */}
          {isSecondCardOpen && (
            <Card
              width="620px"
              bg="black.baseDark"
              borderRadius="30px"
              border="1px solid"
              marginLeft={"-15px"}
              borderColor="transparent"
              p={{ base: "10px", md: "20px" }}
              position="relative"
              height="100%" // Ensure the height matches the first card
              sx={{
                '@media screen and (max-width: 480px)': { // Adjust the breakpoint as needed
                  //display: 'none',
                  //display: 'none',
                  width:"100%",
                  marginLeft:"-5px"
                },
              }}
              
            >
              <Box height="100%" overflow="hidden">
                <iframe
                  src={url}
                  title="QuantumX"
                  width="100%"
                  height="500px" // Adjust the height to match the content of the iframe
                  style={{ border: 'none' }}
                />
              </Box>
            </Card>
          )}
        </Flex>

        {/* Footer Text and Image */}
        <Flex
          mt="40px"
          align="center"
        >
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="white.500"
          >
            Powered by 
          </Text>
          {/* <Link
            href="https://app.ashswap.io/swap/"
            isExternal
          > */}
            <Image
              alt='ash'
              src={
                isNftSwap ?
                "https://xoxno.com/_next/image?url=%2Fimg%2Fsymbols%2Fxoxno_banner.png&w=256&q=100" :
                "https://app.ashswap.io/logo.png"
              }
              width={{ base: "64px", md: "96px" }}
              ml={2}
              mt={isNftSwap ? 0 : -2}
              ignoreFallback
            />
          {/* </Link> */}
        </Flex>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Swap));


// define ImageQxAshFire component
export const ImageQxAshFire = ({ ...props }) => {
  return (
    <Image
      alt='fire'
      src="https://i.ibb.co/MPFd8PQ/firelkk12.png" // Replace with your image URL
      position="absolute"
      top="0%" // Adjust this value as needed to move the image up
      left="2%" // Adjust this value as needed to move the image left
      width={{ sm: "70px", md: "100px" }} // Adjust the size as needed
      height="auto"
      zIndex="2" // Ensure the image is above other content
      transform="translate(-50%, -50%)" // Center the image's top-left corner precisely at the card's top-left corner
      {...props}
    />
  );
};