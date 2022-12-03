import { Center, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import Image from "next/image";
import { formatTokenI } from "utils/functions/tokens";
import { IElrondNFT } from "utils/types/elrond.interface";
interface IProps {
  collection: string;
  selected?: boolean;
  onClick?: () => void;
  nftsArr: IElrondNFT[];
}

const OwnedNFItem = ({ selected, collection, onClick, nftsArr }: IProps) => {
  const bg = useColorModeValue("lightGray.base", "#202020");

  return (
    <Flex
      alignItems={"center"}
      gap={4}
      cursor="pointer"
      position={"relative"}
      py={"16px"}
      px={4}
      borderRadius={"xl"}
      bg={selected ? "main" : bg}
      zIndex={selected && "10"}
      onClick={onClick}
    >
      <Center
        boxSize="50px"
        borderRadius={"full"}
        position="relative"
        overflow={"hidden"}
      >
        {nftsArr && nftsArr[0]?.media && (
          <Image
            src={nftsArr[0]?.media[0]?.thumbnailUrl}
            alt={""}
            layout="fill"
          />
        )}
      </Center>
      <Text fontSize={"lg"} color={selected ? "black" : "white"}>
        {formatTokenI(collection)}
      </Text>
    </Flex>
  );
};

export default OwnedNFItem;
