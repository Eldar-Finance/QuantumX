import React, { useEffect, useState } from 'react';
import { Box, Card, Center, Flex, IconButton, Image, Link, Modal, ModalCloseButton, Text, useMediaQuery } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import SwapCard from './components/Swap/SwapCard/SwapCard';
import Layout from 'components/Layout/Layout';
import MyContainer from 'components/Container/Container';
import withElronDapp from 'hoc/withElronDapp';
import WrapperPages from 'hoc/WrapperPages';
import { PiChartLine, PiChartLineBold } from "react-icons/pi";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import MyModal from 'components/Modal/Modal';
import { breakpoints } from 'theme/chakra';
import xExchangeLogo from "assets/logos/xexchange-light.svg";

export function ChartIcon(isSecondCardOpen: boolean) {
  return (
    <Center
      bg={isSecondCardOpen ? 'main' : 'black.base'}
      boxSize={"32px"}
      color={isSecondCardOpen ? 'black.base' : 'main'}
      borderRadius="full"
      border={"2px solid"}
      borderColor="transparent"
      _hover={{
        bg: isSecondCardOpen ? 'main' : 'black.base',
        color: isSecondCardOpen ? 'black.base' : 'main',
        borderColor: "main"
      }}
    >
      <PiChartLine size={"20"}/>
    </Center>
  )
}

const Swap = () => {
  const [isSecondCardOpen, setIsSecondCardOpen] = useState(false);
  const [graphTokens, setGraphTokens] = useState([]);
  const [isNftSwap, setIsNftSwap] = useState(false);
  const [isMainSwap, setIsMainSwap] = useState(true);
  const [tok1, setVariable1] = useState('');
  const [tok2, setVariable2] = useState('');

  const [isLargeScreen] = useMediaQuery(`(min-width: ${breakpoints["md"]})`);
  
  const ecompassLink = `https://test.e-compass.io/quantumx/embed/MAIAR/${tok2 != "EGLD" ? tok2 : "WEGLD"}/USDC/60`;
  const [url, setUrl] = useState(ecompassLink);
  useEffect(() => {
    setUrl(ecompassLink);
}, [ecompassLink]); // This will trigger the effect whenever token2 changes



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
        mt={{sm: 8}}
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
            px={{ sm: "10px", md: "20px" }}
            py={{ sm: "15px", md: "20px" }}
            position="relative"
            direction={"row"}
          >
            {/* The image now uses negative values to sit outside the top left corner */}
            <ImageQxAshFire/>
            <SwapCard setGraphTokens={setGraphTokens} setIsNftSwap={setIsNftSwap} setIsMainSwap={setIsMainSwap}/>
            
            {/* {isMainSwap && <IconButton
                aria-label="Toggle chart"
                icon={ChartIcon(isSecondCardOpen)}
                variant={"none"}
                zIndex="15"
                onClick={toggleSecondCard}
                fontSize={"3xl"}
                size={"xl"}
                w={"fit-content"}
                h={"fit-content"}
                mr={-20}
                ml={-8}
                mt={-2}
              />} */}

          </Card>

          {/* Expandable Second Card */}
          {isSecondCardOpen && ( !isLargeScreen ?
            <MyModal
              isOpen={isSecondCardOpen}
              onClose={toggleSecondCard}
              isCentered
              bg={"transparent"}
              // size={"full"}
              width={"95%"}
            >
              <ModalCloseButton mt={-12} color={"main"} bg={"black.baseDark"} borderRadius={"full"}/>
              <Card
                maxW={"520px"}
                width="100%"
                bg={"black.baseDark"}
                borderRadius="30px"
                // border="1px solid"
                // borderColor="transparent"
                p={{ sm: "10px", md: "20px" }}
                position="relative"
                height="100%" // Ensure the height matches the first card              
              >
                <Box height="100%" overflow="hidden" borderRadius={"30px"}>
                  <iframe
                    src={url}
                    title="QuantumX"
                    width="100%"
                    height="650px" // Adjust the height to match the content of the iframe
                    // style={{ border: 'none' }}
                  />
                </Box>
              </Card>
            </MyModal> :
            (isMainSwap && <Card
              maxW={"520px"}
              width="100%"
              bg={"black.baseDark"}
              borderRadius="30px"
              // border="1px solid"
              // borderColor="transparent"
              p={{ sm: "10px", md: "20px" }}
              position="relative"
              height="100%" // Ensure the height matches the first card              
             >
               <Box height="100%" overflow="hidden" borderRadius={"30px"}>
                 <iframe
                   src={url}
                   title="QuantumX"
                   width="100%"
                   height="628px" // Adjust the height to match the content of the iframe
                   // style={{ border: 'none' }}
                 />
               </Box>
             </Card>)
            )
          }

          
        </Flex>
        {/* Footer Text and Image */}
        <Flex
          mt="50px"
          align="center"
        >
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="white.500"
          >
            Powered by {isMainSwap ? "AshSwap" : ""}
          </Text>
          {/* <Link
            href="https://app.ashswap.io/swap/"
            isExternal
          > */}
            <Image
              alt='img'
              src={
                isNftSwap ?
                "https://xoxno.com/_next/image?url=%2Fimg%2Fsymbols%2Fxoxno_banner.png&w=256&q=100" :
                isMainSwap ? "https://ashswap.io/_next/static/media/logo-ashswap.1639138c.png" : "https://cdn.sanity.io/images/27df2ffs/production/57daf687f81ef2cc9a7ebfbbf9c76ddf4bad9dae-210x36.svg?auto=format"
              }
              width={{ sm: "64px", md: isMainSwap ? "24px" : "100px" }}
              ml={2}
              // mt={isNftSwap ? 0 : isMainSwap ? 0 : 0}
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
      // zIndex="2" // Ensure the image is above other content
      transform="translate(-50%, -50%)" // Center the image's top-left corner precisely at the card's top-left corner
      {...props}
    />
  );
};