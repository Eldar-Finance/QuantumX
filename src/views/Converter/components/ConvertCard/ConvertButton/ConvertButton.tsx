import ActionButton from "components/ActionButton/ActionButton";
import { selectConvertInfo } from "redux/slices/converter/converter-slice";
import { useAppSelector } from "utils/hooks/redux";
import { convertTokens, IConvertTokenData } from "views/Converter/utils/scCall";

const ConvertButton = () => {
  const swapInfo = useAppSelector(selectConvertInfo);
  const handleSubmit = () => {
    const data: IConvertTokenData[] = swapInfo.map((si) => {
      const data: IConvertTokenData = {
        fromToken: {
          token: si.identifier,
          value: si.balance,
        },
        slipapge: 2,
        swapInfo: si.data,
      };
      return data;
    });
    convertTokens(data);
  };

  return (
    <ActionButton
      onClick={handleSubmit}
      mt={16}
      disabled={swapInfo.length === 0}
    >
      Convert tokens
    </ActionButton>
  );
};

export default ConvertButton;
