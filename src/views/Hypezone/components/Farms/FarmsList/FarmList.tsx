import { Accordion, Box, Flex, Heading, Text } from "@chakra-ui/react";
import NextImage from "components/NextImage/NextImage";
import hypeImage from "../../../assets/hypelogo.webp";
import FarmItem from "../FarmItem/FarmItem";
interface IProps {
  title: string;
  subtitle?: string;
}
const FarmList = ({ title, subtitle }: IProps) => {
  return (
    <Box mt={20}>
      <Flex mb={6} gap={4} transform={{ xs: "none", lg: "translateX(-50px)" }}>
        <Box>
          <NextImage src={hypeImage} alt="Hypezone" width={60} height={60} />
        </Box>
        <Flex gap={2} alignItems="center">
          <Heading fontSize={"3xl"}>{title}</Heading>
          {subtitle && <Text>{subtitle}</Text>}
        </Flex>
      </Flex>
      <Accordion allowMultiple borderRadius={"xl"} overflow="hidden" w="full">
        <FarmItem />
        <FarmItem />
        <FarmItem />
        <FarmItem />
      </Accordion>
    </Box>
  );
};

export default FarmList;
