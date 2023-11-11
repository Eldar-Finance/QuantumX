import ActionButton from "components/ActionButton/ActionButton";
import { selectConvertInfo } from "redux/slices/moondustx/moondustx-slice";
import { useAppSelector } from "utils/hooks/redux";
import { convertSlippage } from "views/MoonDustX/utils/contants";

import { convertTokens, IConvertTokenData } from "views/MoonDustX/utils/scCall";

const ConvertButton = () => {
  const swapInfo = useAppSelector(selectConvertInfo);
  const handleSubmit = () => {
    const data: IConvertTokenData[] = swapInfo.map((si) => {
      const data: IConvertTokenData = {
        fromToken: {
          token: si.identifier,
          value: si.balance,
        },
        slipapge: convertSlippage,
        swapInfo: si.data,
      };
      return data;
    });
    convertTokens(data);
  };

  return (
    <ActionButton
      onClick={handleSubmit}
      minW={"40%"}
      mt={16}
      disabled={swapInfo.length === 0}
      fontWeight="600"
      alignSelf={"center"}
    >
      Convert tokens
    </ActionButton>
  );
};

export default ConvertButton;
