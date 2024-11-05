import "../styles/globals.css";

import { Provider } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";
import { MetaHead } from "components/MetaHead/MetaHead";

import store from "redux/store";
import customTheme from "theme/chakra";

import { Manrope } from "next/font/google";
/* eslint-disable react/display-name */

import dynamic from "next/dynamic";

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
const inter = Manrope({ subsets: ["latin"], display: 'swap', adjustFontFallback: false });

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
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default QuantumXApp;
