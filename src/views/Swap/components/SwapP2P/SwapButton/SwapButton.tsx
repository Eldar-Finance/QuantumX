import { ButtonProps } from "@chakra-ui/react";
import { BigUIntValue } from "@multiversx/sdk-core/out";
import { useTrackTransactionStatus } from "@multiversx/sdk-dapp/hooks";
import { contractAddr } from "api/net.config";
import { fastSwapInJex } from "api/sc/calls/swap/fastSwap";
import { scQuery } from "api/sc/queries";
import { jexWsp } from "api/sc/sc";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import { useState } from "react";

import { useSelector } from "react-redux";
import { selectOffers, selectUserOrders } from "redux/slices/fastSwap/fastSwap";
import Swal from "sweetalert2";
import { useAppSelector } from "utils/hooks/redux";

interface IProps extends ButtonProps {
  disableButton?: boolean;
}

const SwapButton = ({ disableButton, ...props }: IProps) => {
  const { data: offers } = useAppSelector(selectOffers);
  const toToken = useAppSelector((state) => state.fastSwap.toToken);
  const liquidity = useAppSelector((state) => state.fastSwap.liquidity);
  const [sessionId, setSessionId] = useState<string>();

  const userOders = useSelector(selectUserOrders);
  const txs = useTrackTransactionStatus({
    transactionId: sessionId,
    onSuccess: (txI) => {
      if (window) {
        window.location.reload();
      }
    },
  });

  const handleSwap = async () => {
    const ordersStatus = await Promise.all(
      userOders.map(async (order) => {
        const orderRes = await scQuery(jexWsp, "offerById", [
          new BigUIntValue(new BigNumber(order.orderId)),
        ]);

        return {
          id: order.orderId,
          isActive: orderRes.firstValue.valueOf().status.name === "Open",
        };
      })
    );

    const orders = userOders.filter((order) => {
      const orderStatus = ordersStatus.find((o) => o.id === order.orderId);

      return orderStatus.isActive;
    });

    const noUsedOrders = userOders.filter((order) => {
      const orderStatus = ordersStatus.find((o) => o.id === order.orderId);

      return !orderStatus.isActive;
    });

    if (noUsedOrders.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: `Only ${orders.length} of ${userOders.length} orders can be filled.`,

        confirmButtonText: "Accept",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await fastSwapInJex(orders, contractAddr.fastp2pswap);
          setSessionId(res.sessionId);
        }
      });
    } else {
      const res = await fastSwapInJex(orders, contractAddr.fastp2pswap);
      setSessionId(res.sessionId);
    }
  };

  return (
    <ActionButton
      mt={8}
      height={"auto"}
      variant={"ghost"}
      borderRadius={"12px"}
      padding={"20px"}
      width={"full"}
      disabled={
        disableButton ||
        offers.length === 0 ||
        userOders.length === 0 ||
        liquidity.data < toToken.value
      }
      onClick={handleSwap}
      {...props}
    >
      {disableButton
        ? "Enter an amount"
        : offers.length === 0
        ? "No available offers"
        : "Quantum Swap"}
    </ActionButton>
  );
};

export default SwapButton;
