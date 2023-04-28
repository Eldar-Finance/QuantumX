import ActionButton from "components/ActionButton/ActionButton";
import Link from "next/link";
import { routeNames } from "utils/routes";

const QTagButton = () => {
  const tag = "mandy.quantumx";
  return (
    /* @ts-ignore */
    <ActionButton as={Link} href={routeNames.qtags}>
      {tag || "   Create QxTags"}
    </ActionButton>
  );
};

export default QTagButton;
