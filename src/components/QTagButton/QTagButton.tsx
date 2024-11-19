import { Box, Spinner } from "@chakra-ui/react";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks/account/useGetLoginInfo";
import ActionButton from "components/ActionButton/ActionButton";
import Link from "next/link";
import { routeNames } from "utils/routes";
import useGetUserQTag from "views/Tags/hooks/useGetQTag";

const QTagButton = ({...props}) => {
  const { tagInfo, isLoading } = useGetUserQTag();
  // const { isLoggedIn } = useGetLoginInfo();
  return (
    <ActionButton
      as={Link}
      /* @ts-ignore */
      href={routeNames.qtags}
      fontWeight={"500"}
      fontSize={{ xs: "14px", "2xl": "md" }}
      variant={"ghost"}
      {...props}
    >
      {tagInfo.tag || (isLoading ? <Spinner size={"sm"} /> : "Claim QxTag")}
    </ActionButton>
  );
};

export default QTagButton;
