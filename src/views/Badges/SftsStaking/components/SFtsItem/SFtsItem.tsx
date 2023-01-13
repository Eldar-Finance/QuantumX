import { Center } from "@chakra-ui/react";
import { EldarSftCollection } from "api/net.config";
import { createIndentifierByCollectionAndNonce } from "utils/functions/tokens";
import useGetNfts from "utils/hooks/useGetNfts";
import SftMedia from "../SftMedia/SftMedia";

const SFtsItem = ({
  onClick = undefined,
  sft,
  isHoverEffect = true,
  videoProps = undefined,
  imageProps = undefined,
}) => {
  const isBadge = sft.collection === EldarSftCollection;

  const { nfts } = useGetNfts(
    isBadge
      ? null
      : createIndentifierByCollectionAndNonce(sft.collection, sft.nonce)
  );

  return (
    <Center
      flexDir={"column"}
      mb={8}
      px={1}
      cursor="pointer"
      transition=" transform .2s"
      _hover={{
        transform: isHoverEffect ? "scale(1.1)" : undefined,
      }}
      onClick={onClick}
      position="relative"
      zIndex={1}
    >
      <SftMedia
        sft={isBadge ? sft : nfts ? nfts[0] : null}
        videoProps={videoProps}
        imageProps={imageProps}
      />
    </Center>
  );
};

export default SFtsItem;
