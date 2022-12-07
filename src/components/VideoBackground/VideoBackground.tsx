import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

const VideoBackground = ({ bgCard, ...props }) => {
  return (
    <VideoBack
      as={"video"}
      autoPlay="autoplay"
      loop="loop"
      id="video_background"
      preload="auto"
      muted
      playsInline
      {...props}
    >
      <source src={bgCard} type="video/mp4" />
    </VideoBack>
  );
};

export default VideoBackground;

const VideoBack = styled(Box)`
  position: absolute;
  border-radius: 20px;
  top: 0;

  right: 0px;

  min-width: 100%;

  min-height: 100%;

  width: auto;

  height: auto;

  z-index: -1000;

  overflow: hidden;
  border-radius: inherit;
`;
