import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import { pairs } from "utils/constants/lpPairs";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import { IElrondToken } from "utils/types/elrond.interface";

interface IProps {
  lpToken: IElrondToken;
}

const LpTokenImage = ({ lpToken }: IProps) => {
  const lpData = pairs.find((pair) => pair.lpidentifier === lpToken.identifier);

  const { tokens } = useGetMultipleElrondTokens(
    lpData ? [lpData.token1lp, lpData.token2lp] : []
  );

  if (!tokens || tokens.length === 0) return null;

  return (
    <Flex>
      <Image src={tokens[0].assets.svgUrl} alt="" width={27} height={27} />
      <Image src={tokens[1].assets.svgUrl} alt="" width={27} height={27} />
    </Flex>
  );
};

export default LpTokenImage;
