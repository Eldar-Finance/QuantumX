import { Box, BoxProps } from "@chakra-ui/react";
import Image from "next/legacy/image";

interface IProps extends BoxProps {
  src?: any;
  unoptimized?: boolean;
  quality?: number;
}

const ImageBg = ({
  src,
  unoptimized = false,
  sx,
  quality,
  ...props
}: IProps) => {
  if (!src) {
    return null;
  }
  return (
    <Box
      sx={sx}
      as={Image}
      objectFit="cover"
      layout="fill"
      src={src}
      alt={""}
      quality={quality || 100}
      placeholder="blur"
      blurDataURL={typeof src === "string" ? src : src.src}
      unoptimized={unoptimized}
      zIndex="-1"
      {...props}
    />
  );
};

export default ImageBg;
