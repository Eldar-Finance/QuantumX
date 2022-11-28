/* eslint-disable react/display-name */

import { DappProvider, DappUI } from "@elrondnetwork/dapp-core";
import { environment, network } from "api/net.config";

const {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal,
} = DappUI;

const withElronDapp = (Component) => (props) => {
  return (
    <DappProvider
      customNetworkConfig={{ ...network }}
      environment={environment}
    >
      <>
        <TransactionsToastList />
        <NotificationModal />
        <SignTransactionsModals className="custom-class-for-modals" />
        <>
          <Component {...props} />
        </>
      </>
    </DappProvider>
  );
};

export default withElronDapp;
