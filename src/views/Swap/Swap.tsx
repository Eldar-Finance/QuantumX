import React, { useState } from 'react';
import { Box, Card, Flex, IconButton, Image, Link, Text } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import SwapCard from './components/SmartSwap/SwapCard/SwapCard';
import Layout from 'components/Layout/Layout';
import MyContainer from 'components/Container/Container';
import withElronDapp from 'hoc/withElronDapp';
import WrapperPages from 'hoc/WrapperPages';

const Swap = () => {
  const [isSecondCardOpen, setIsSecondCardOpen] = useState(false);

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
            maxW="620px"
            bg="black.baseDark"
            borderRadius="30px"
            border="1px solid"
            borderColor="transparent"
            p={{ base: "10px", md: "20px" }}
            position="relative"
            mb={{ base: 4, md: 0 }}
          >
            <SwapCard />
            <IconButton
              aria-label="Toggle second card"
              icon={isSecondCardOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              position="absolute"
              right="-30px"
              top="50%"
              transform="translateY(-50%)"
              zIndex="2"
              onClick={toggleSecondCard}
              variant="ghost"
              background="none"
              fontSize={"3xl"}
              size={"xl"}
            />
          </Card>

          {/* Expandable Second Card */}
          {isSecondCardOpen && (
            <Card
              width="620px"
              bg="black.baseDark"
              borderRadius="10px"
              border="1px solid"
              borderColor="transparent"
              p={{ base: "10px", md: "20px" }}
              position="relative"
              height="100%" // Ensure the height matches the first card
              
            >
              <Box height="100%" overflow="hidden">
                <iframe
                  src="https://test.e-compass.io/quantumx/embed/MAIAR/RIDE/WEGLD/60"
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
          <Link
            href="https://app.ashswap.io/swap/"
            isExternal
          >
            <Image
              alt='ash'
              src="https://app.ashswap.io/logo.png"
              width={{ base: "64px", md: "96px" }}
              ml={2}
              mt={-2}
              ignoreFallback
            />
          </Link>
        </Flex>
      </MyContainer>
    </Layout>
  );
};

export default withElronDapp(WrapperPages(Swap));
