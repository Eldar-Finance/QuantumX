import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import useSwr from "swr";
import { useAppSelector } from "utils/hooks/redux";
import { IScQxTagExtension, IScQxTagInfo } from "utils/types/sc.interface";
import { fetchExtensionsList, fetchUserTag } from "../services/queries";
const useGetUserQTag = () => {
  const address = useAppSelector(selectUserAddress);

  const { data: tagInfo, isLoading } = useSwr<IScQxTagInfo>(
    address ? `tagsWsp:getUserInfo:${address}` : null,
    async () => {
      return await fetchUserTag(address);
    },
    {
      fallbackData: {
        username: "",
        extension: "",
        tag: "",
      },
    }
  );

  return {
    tagInfo,
    isLoading,
  };
};

export default useGetUserQTag;

export const useGetExtensionsList = () => {
  const {
    data: extensions,
    isLoading,
    error,
  } = useSwr<IScQxTagExtension[]>(
    `tagsWsp:getExtensionsList`,
    async () => {
      return await fetchExtensionsList();
    },
    {
      fallbackData: [],
    }
  );

  return {
    extensionsInfo: extensions,
    isLoading,
    error,
  };
};
