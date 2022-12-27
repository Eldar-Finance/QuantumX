import { logout, useGetLoginInfo } from "@elrondnetwork/dapp-core";
import { useRouter } from "next/router";
import { openLogin } from "redux/slices/settings/settings-reducer";
import { getWebUrl } from "utils/routes";
import { useAppDispatch } from "./redux";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const location = useRouter().asPath;

  const { isLoggedIn } = useGetLoginInfo();

  const handleLogin = () => {
    if (isLoggedIn) {
      logout(getWebUrl(location));
    } else {
      dispatch(openLogin(true));
    }
  };
  const handleOpenLogin = () => {
    dispatch(openLogin(true));
  };
  const handleLogOut = () => {
    logout(getWebUrl(location));
  };

  return { isLoggedIn, handleLogin, handleOpenLogin, handleLogOut };
};

export default useLogin;
