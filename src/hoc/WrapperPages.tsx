/* eslint-disable react/display-name */
/* eslint-disable react-hooks/rules-of-hooks */
import { useGetAccountInfo, useGetLoginInfo } from "@elrondnetwork/dapp-core";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import {
  openLogin,
  selectIsLoginModal,
} from "redux/slices/settings/settings-reducer";
import { setAddress } from "redux/slices/userAcount/account-slice";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";

const Login: any = dynamic(() => import("components/Login/Login"));
const WrapperPages = (Component) => (props) => {
  const dispatch = useAppDispatch();
  const { address } = useGetAccountInfo();

  const { isLoggedIn } = useGetLoginInfo();
  const isLoginOpen = useAppSelector(selectIsLoginModal);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(openLogin(false));
    }
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    dispatch(
      setAddress(
        "erd1m6d6nhpmch9hn6kxl2x2jcap0wng3y90cxalxdnwempq2nejve8qn5mp7y"
      )
    );
  }, [dispatch, address]);

  return (
    <>
      {isLoginOpen && <Login isLoginOpen={isLoginOpen} />}

      <Component {...props} />
    </>
  );
};

export default WrapperPages;
