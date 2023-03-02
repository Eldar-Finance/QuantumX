import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import { logout } from "@multiversx/sdk-dapp/utils";
import { useRouter } from "next/router";
import { openLogin } from "redux/slices/settings/settings-reducer";
import { getWebUrl } from "utils/functions/routes";
import { useAppDispatch } from "./redux";

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const location = useRouter().asPath;
  const { isLoggedIn } = useGetLoginInfo();

  const handleLogout = () => {
    logout(getWebUrl(location));
  };
  const handleConnect = () => {
    dispatch(openLogin(true));
  };

  return {
    isLoggedIn,
    handleLogout,
    handleConnect,
  };
};

export default useAuthentication;
