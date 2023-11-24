/* eslint-disable react/display-name */

import dynamic from "next/dynamic";

import { EnvironmentsEnum } from "@multiversx/sdk-dapp/types";
import { AxiosInterceptorContext } from "@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext";
import { Box, Flex } from "@chakra-ui/react";
import { network } from "api/net.config";
import { sampleAuthenticatedDomains } from "../config";
import classNames from "classnames";

export const DappProvider = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/wrappers/DappProvider')).DappProvider;
  },
  { ssr: false }
);

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

const withElronDapp = (Component) => (props) => {
  return ( 
    <>
      <AxiosInterceptorContext.Provider>
        {/* @ts-ignore */}
        <AxiosInterceptorContext.Interceptor
          authenticatedDomanis={sampleAuthenticatedDomains}
        >
          <DappProvider
            environment={network.id}
            customNetworkConfig={{
              name: "quantumxConfig",
              walletConnectV2ProjectId: "6bec64742092caa5f1b382312bb17be2",
            }}
            dappConfig={{
              shouldUseWebViewProvider: true,
            }}
          >
            <AxiosInterceptorContext.Listener>
              <TransactionsToastList
                // customToastClassName="transactions-toast-class"
                // transactionToastClassName="transactions-toast-class"
                successfulToastLifetime={6000}
              />
              <NotificationModal/>
              <SignTransactionsModals
                verifyReceiverScam={true}
                className="sign-transactions-class"
              />
              <Component {...props} />
            </AxiosInterceptorContext.Listener>
          </DappProvider>
        </AxiosInterceptorContext.Interceptor>
      </AxiosInterceptorContext.Provider>
    </>
  );
};

export default withElronDapp;
