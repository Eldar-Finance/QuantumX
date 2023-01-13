import { Box, Flex, Text } from "@chakra-ui/react";
import { EldarSftCollection } from "api/net.config";
import NextImage from "components/NextImage/NextImage";
import VideoBackground from "components/VideoBackground/VideoBackground";
import { IElrondNFT } from "utils/types/elrond.interface";

interface IProps {
  sft: IElrondNFT;
  removeBottomText?: boolean;
  videoProps?: any;
}

const SftMedia = ({ sft, removeBottomText, videoProps }: IProps) => {
  const isBadge = sft.collection === EldarSftCollection;

  if (isBadge) {
    let badgeVideo = "";
    let badgeName = "";
    switch (sft.nonce) {
      case 1:
        badgeVideo = "/video/ezgif.com-gif-maker.mp4";
        badgeName = "Marble Gold Badge";
        break;
      case 2:
        badgeVideo = "/video/ezgif.com-gif-maker2.mp4";
        badgeName = "Marble Silver Badge";
        break;
      case 3:
        badgeVideo = "/video/ezgif.com-gif-maker3.mp4";
        badgeName = "Rose Gold Badge";
        break;

      default:
        break;
    }

    return (
      <>
        <Box
          w={"240px"}
          height="130px"
          mb={3}
          position="relative"
          borderRadius={"12px"}
          {...videoProps}
        >
          <VideoBackground bgCard={badgeVideo} />
        </Box>
        {!removeBottomText && (
          <Flex justifyContent={"center"} fontWeight="bold">
            <Text mb={2}>
              {sft.balance}x {badgeName}
            </Text>
          </Flex>
        )}
      </>
    );
  } else {
    return (
      <>
        <Box
          boxSize={"130px"}
          mb={3}
          position="relative"
          borderRadius={"12px"}
          overflow="hidden"
          // {...videoProps}
        >
          {sft?.media && (
            <NextImage
              src={sft.media[0].thumbnailUrl}
              alt={sft.name}
              width={240}
              height={240}
            />
          )}
        </Box>
        {!removeBottomText && (
          <Flex justifyContent={"center"} fontWeight="bold">
            <Text mb={2}>1x {sft.name}</Text>
          </Flex>
        )}
      </>
    );
  }
};

export default SftMedia;
