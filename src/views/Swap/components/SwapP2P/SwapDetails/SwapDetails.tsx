import { Stack } from "@chakra-ui/react";
import { FallingManIcon, SwapIcon } from "components/Icons/ui";
import {
  selectAverageRate,
  selectDefaultTokenFeeA,
  selectFees,
  selectjexFee,
} from "redux/slices/fastSwap/fastSwap";
import { formatPrecision } from "utils/functions/formatBalance";
import { useAppSelector } from "utils/hooks/redux";
import DetailBox from "./DetailBox";

const SwapDetails = () => {
  const jexTokenFee = useAppSelector(selectjexFee);
  const defaultFee = useAppSelector(selectDefaultTokenFeeA);
  const averageRate = useAppSelector(selectAverageRate);
  const fromToken = useAppSelector((state) => state.fastSwap.fromToken);
  const toToken = useAppSelector((state) => state.fastSwap.toToken);
  const { data: tableData } = useAppSelector(selectFees);
  const generalFeeData = tableData.find((feeI) => feeI.category === "General");

  const eldarFee = generalFeeData ? generalFeeData.fee : "...";
  const jexFee = jexTokenFee || defaultFee.data;
  return (
    <Stack w="full" spacing={"10px"} mt="30px">
      {toToken.token && (
        <DetailBox
          icon={SwapIcon}
          title="Swap rate"
          value={`${formatPrecision(averageRate)} ${toToken.token.ticker} / ${
            fromToken.token.ticker
          }`}
        />
      )}
      <DetailBox
        icon={FallingManIcon}
        title="Fee"
        value={`${eldarFee ? eldarFee + "%" : eldarFee} + ${jexFee}% (JEX Fee)`}
      />
    </Stack>
  );
};

export default SwapDetails;
