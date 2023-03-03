import ActionButton from "components/ActionButton/ActionButton";
import { selectConvertInfo } from "redux/slices/converter/converter-slice";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppSelector } from "utils/hooks/redux";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import {
  convertSlippage,
  protocolFee,
  protocolFeeToken,
} from "views/Converter/utils/contants";
import { convertTokens, IConvertTokenData } from "views/Converter/utils/scCall";

const ConvertButton = () => {
  const swapInfo = useAppSelector(selectConvertInfo);
  const [s, userProtocolToken] = useGetUserTokens(protocolFeeToken, true);
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

  const canUserPayProtocolFee =
    userProtocolToken && formatBalance(userProtocolToken, true) >= 0.5;

  return (
    <ActionButton
      onClick={handleSubmit}
      mt={16}
      disabled={swapInfo.length === 0 || !canUserPayProtocolFee}
      fontWeight="600"
    >
      {canUserPayProtocolFee
        ? "Convert tokens"
        : `You need ${protocolFee} ${formatTokenI(protocolFeeToken)}`}
    </ActionButton>
  );
};

export default ConvertButton;
