import { Spinner } from "@chakra-ui/react";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import ActionButton from "components/ActionButton/ActionButton";
import Link from "next/link";
import { routeNames } from "utils/routes";
import useGetUserQTag from "views/Tags/hooks/useGetQTag";

const QTagButton = () => {
  const { tagInfo, isLoading } = useGetUserQTag();
  const { isLoggedIn } = useGetLoginInfo();
  return (
    <>
      {isLoggedIn && (
        /* @ts-ignore */
        <ActionButton as={Link} href={routeNames.qtags} fontWeight={"normal"}>
          {tagInfo.tag || (isLoading ? <Spinner size={"sm"} /> : "Claim QxTag")}
        </ActionButton>
      )}
    </>
  );
};

export default QTagButton;
