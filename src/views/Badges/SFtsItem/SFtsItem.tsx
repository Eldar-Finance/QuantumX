import { Box, Flex, Text } from "@chakra-ui/react";
import VideoBackground from "components/VideoBackground/VideoBackground";

const SFtsItem = ({
  onClick = undefined,
  sft,
  isHoverEffect = true,
  videoProps = undefined,
}) => {
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
    <Box
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

      <Flex justifyContent={"center"} fontWeight="bold">
        <Text mb={2}>
          {sft.balance}x {badgeName}
        </Text>
      </Flex>
    </Box>
  );
};

export default SFtsItem;
