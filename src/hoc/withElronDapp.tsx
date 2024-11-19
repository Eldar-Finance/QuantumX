/* eslint-disable react/display-name */
import { AxiosInterceptorContext } from "@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext";
import { MetamaskSnapWalletAddress, network } from "api/net.config";
import { sampleAuthenticatedDomains } from "../config";
import { DappProvider } from "@multiversx/sdk-dapp/wrappers/DappProvider/DappProvider";
import { TransactionsToastList } from "@multiversx/sdk-dapp/UI/TransactionsToastList";
import { NotificationModal } from "@multiversx/sdk-dapp/UI/NotificationModal";
import { SignTransactionsModals } from "@multiversx/sdk-dapp/UI/SignTransactionsModals";

const withElronDapp = (Component) => (props) => {
  return ( 
    <>
      <AxiosInterceptorContext.Provider>
        {/* @ts-ignore */}
        <AxiosInterceptorContext.Interceptor
          authenticatedDomains={sampleAuthenticatedDomains}
        >
          <DappProvider
            environment={network.id}
            customNetworkConfig={{
              name: "quantumxConfig",
              walletConnectV2ProjectId: "6bec64742092caa5f1b382312bb17be2",
              metamaskSnapWalletAddress: MetamaskSnapWalletAddress
            }}
            dappConfig={{
              isSSR: false,
              shouldUseWebViewProvider: true,
            }}
          >
            <AxiosInterceptorContext.Listener>
              <TransactionsToastList
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
