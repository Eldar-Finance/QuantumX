import Image, { ImageProps } from "next/legacy/image";

const NextImage = ({ ...props }: ImageProps) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} />;
};

export default NextImage;
