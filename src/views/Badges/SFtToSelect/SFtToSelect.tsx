import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import VideoBackground from "components/VideoBackground/VideoBackground";
import Counter from "components/Counter/Counter";

const SFtToSelect = ({ sft, setSftAmount, sftAmount }) => {
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
      badgeName = sft.name;
      break;
  }
  return (
    <Box mb={4} px={1}>
      <Box
        w={"290px"}
        height="130px"
        mb={10}
        position="relative"
        borderRadius={"12px"}
      >
        <VideoBackground bgCard={badgeVideo} /* bgCard={sft.url} */ />
      </Box>

      <Flex justifyContent={"center"} fontWeight="bold" mb={4}>
        <Text>
          {sft.balance}x {badgeName}
        </Text>
      </Flex>
      <Box>
        <Counter
          stock={Number(sft.balance)}
          initial={0}
          count={sftAmount}
          setCountAction={setSftAmount}
        />
      </Box>
    </Box>
  );
};

export default SFtToSelect;
