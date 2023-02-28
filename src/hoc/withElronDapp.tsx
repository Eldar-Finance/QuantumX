/* eslint-disable react/display-name */

import { DappUI } from "@elrondnetwork/dapp-core";

const {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal,
} = DappUI;

const withElronDapp = (Component) => (props) => {
  return (
    <>
      <Component {...props} />
    </>
  );
};

export default withElronDapp;
