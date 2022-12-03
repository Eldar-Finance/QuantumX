import { toknesID } from "api/net.config";
import { egldProteoWsp, usdcProteoWsp } from "api/sc/sc";
import { EgldlogoIcon2, UsdclogoIcon } from "components/Icons/ui";

import { IProteoFarm } from "utils/types/proteo.interface";

export const proteoPools: {
  USDC: IProteoFarm;
  EGLD: IProteoFarm;
} = {
  USDC: {
    hc: 60,
    Icon: <UsdclogoIcon fontSize={"45px"} mr={2} />,
    stakedCoin: "USDC",
    decimals: 6,
    wsp: usdcProteoWsp,
    token: "USDC",
    customPrice: 1,
    aprEndpoint: "/usdcapi.php",
    tokenIdentifier: toknesID.usdc,
    type: "pool",
  },
  EGLD: {
    hc: 60,
    Icon: <EgldlogoIcon2 size={"45px"} wrapperProps={{ mr: "2" }} />,
    stakedCoin: "EGLD",
    wsp: egldProteoWsp,
    token: "WEGLD",
    aprEndpoint: "/egldapi.php",
    tokenIdentifier: toknesID.egld,
    type: "pool",
  },
};

const getProteFarmsArr = () => {
  const arr: IProteoFarm[] = [];
  for (const key in proteoPools) {
    arr.push(proteoPools[key]);
  }
  return arr;
};

export const proteoPoolsArr: IProteoFarm[] = getProteFarmsArr();
