import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { MexlockIcon } from "components/Icons/ui";
import BadgeStaticBox from "../SftsStaking/components/BadgeStaticBox/BadgeStaticBox";
// import LogoImg from "components/LogoImg/LogoImg";

const InvestorsCard = () => {
  return (
    <Card px={5} bg="secondary" w="full">
      <CardHeader flexDir="column">
        <Flex justifyContent="space-between" w={"full"}>
          <Box>
            <Text
              fontSize={"4xl"}
              as="h2"
              fontWeight={"extrabold"}
              display={{ xs: "none", md: "block" }}
              color="white"
            >
              Early Supporter
            </Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody px={{ xs: "0px", md: "15px" }}>
        <Card bg="black.baseDark">
          <CardBody>
            <Flex gap={"25px"} alignItems="center">
              <ActionButton>Claim</ActionButton>
              <Center>
                <BadgeStaticBox
                  title={"You have earned"}
                  content={
                    <Center textAlign={"center"}>
                      <Text mr={2} w="full" textAlign={"center"}>
                        {556500000}
                      </Text>
                      <MexlockIcon size={"24px"} />
                    </Center>
                  }
                />
              </Center>
              <Center>
                <BadgeStaticBox
                  title={"Avilabel for claim"}
                  content={
                    <Center textAlign={"center"}>
                      <Text mr={2} w="full" textAlign={"center"}>
                        {556500000}
                      </Text>
                      <MexlockIcon size={"24px"} />
                    </Center>
                  }
                />
              </Center>
            </Flex>
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  );
};

export default InvestorsCard;
