import { toknesID } from "api/net.config";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";

const useSelectSmarSwapTokens = (fromTokenIdentifier, tokens, field) => {
  let allWhitelistedTokens = [...tokens.data];
  if (field === "to") {
    if (
      fromTokenIdentifier === toknesID.egld ||
      fromTokenIdentifier === toknesID.wegld
    ) {
      allWhitelistedTokens = [
        ...allWhitelistedTokens,
        ...tokens.wegldWhitelisted,
      ];
    }
    if (fromTokenIdentifier === toknesID.usdc) {
      allWhitelistedTokens = [
        ...allWhitelistedTokens,
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
