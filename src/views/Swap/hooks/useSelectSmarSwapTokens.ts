import { toknesID } from "api/net.config";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";

const useSelectSmarSwapTokens = (fromTokenIdentifier, tokens, field) => {
  let allWhitelistedTokens = [...tokens.data];
  if (field === "to") {
    if (
      fromTokenIdentifier === toknesID.egld ||
      fromTokenIdentifier === toknesID.wegld ||
      fromTokenIdentifier === toknesID.usdc
    ) {
      allWhitelistedTokens = [
        ...allWhitelistedTokens,
        ...tokens.wegldWhitelisted,
        ...tokens.usdcWhitelisted,
      ];
    }
  } else {
    allWhitelistedTokens = [...allWhitelistedTokens];
  }
  const { tokens: elrondTokens } = useGetMultipleElrondTokens(
    allWhitelistedTokens
  );

  return { elrondTokens };
};

export default useSelectSmarSwapTokens;
