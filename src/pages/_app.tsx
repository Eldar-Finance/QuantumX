import "../styles/globals.css";

import { Provider } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";
import { MetaHead } from "components/MetaHead/MetaHead";

import store from "redux/store";
import customTheme from "theme/chakra";

import { Manrope } from "@next/font/google";
/* eslint-disable react/display-name */

import { Box } from "@chakra-ui/react";

import { EnvironmentsEnum } from "@multiversx/sdk-dapp/types";
import { AxiosInterceptorContext } from "@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext";
import { DappProvider } from "@multiversx/sdk-dapp/wrappers/DappProvider";

import { network } from "api/net.config";
import dynamic from "next/dynamic";
import { sampleAuthenticatedDomains } from "../config";

const SignTransactionsModals: any = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/SignTransactionsModals"))
      .SignTransactionsModals;
  },
  { ssr: false }
);
const NotificationModal: any = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/NotificationModal"))
      .NotificationModal;
  },
  { ssr: false }
);
const TransactionsToastList: any = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/TransactionsToastList"))
      .TransactionsToastList;
  },
  { ssr: false }
);
// If loading a variable font, you don't need to specify the font weight
const inter = Manrope({ subsets: ["latin"] });

const QuantumXApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS theme={customTheme}>
        <style jsx global>{`
          html,
          body {
            font-family: ${inter.style.fontFamily} !important;
          }
        `}</style>
        <MetaHead metaTitle="QuantumX - Friction-less swaps. Quantum level latency" />
        <AxiosInterceptorContext.Provider>
          {/* @ts-ignore */}
          <AxiosInterceptorContext.Interceptor
            authenticatedDomanis={sampleAuthenticatedDomains}
          >
            <DappProvider
              environment={EnvironmentsEnum.mainnet}
              customNetworkConfig={{
                name: "quantumxConfig",
                walletConnectV2ProjectId: "cf388e978587b4cba673b4080fb9d89b",
                ...network,
              }}
            >
              <AxiosInterceptorContext.Listener />
              <Box color="black">
                <TransactionsToastList />
                <NotificationModal />
                <SignTransactionsModals className="custom-class-for-modals" />
              </Box>
              <Component {...pageProps} />
            </DappProvider>
          </AxiosInterceptorContext.Interceptor>
        </AxiosInterceptorContext.Provider>
      </ChakraProvider>
    </Provider>
  );
};

export default QuantumXApp;
