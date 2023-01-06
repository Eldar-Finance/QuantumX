import { Center, Text } from "@chakra-ui/react";
import srbImage from "assets/hub/srbcatalog.jpg";
import vacineImage from "assets/hub/vacine.png";
import NftCard from "../NftCard/NftCard";

const NftList = () => {
  const onSubmit = () => {};
  return (
    <Center flexWrap={"wrap"} gap={12} mt={8}>
      <NftCard
        iamge={srbImage}
        text={
          <Text>
            Pay 5 SBEAR <br /> Get a random SRB
          </Text>
        }
        onSubmit={onSubmit}
      />
      <NftCard
        iamge={vacineImage}
        onSubmit={onSubmit}
        text={
          <Text>
            Pay 1 SPRICK <br /> Get an Abominator
          </Text>
        }
      />
    </Center>
  );
};

export default NftList;
