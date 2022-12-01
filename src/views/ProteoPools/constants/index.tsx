import { toknesID } from "api/net.config";
import { egldProteoWsp, usdcProteoWsp } from "api/sc/sc";
import aeroEgld from "assets/logos/aeroegl.png";
import aeroImg from "assets/logos/aerologo.svg";
import zpayImg from "assets/logos/logo.svg";
import proteoEgldLpImg from "assets/logos/proteolp.png";
import zpayWegldImg from "assets/logos/zpaywegld.png";
import {
  EgldlogoIcon2,
  ProteoIcon,
  RidelogoIcon,
  UsdclogoIcon,
} from "components/Icons/ui";
import NextImage from "components/NextImage/NextImage";

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
  },
  EGLD: {
    hc: 60,
    Icon: <EgldlogoIcon2 size={"45px"} wrapperProps={{ mr: "2" }} />,
    stakedCoin: "EGLD",
    wsp: egldProteoWsp,
    token: "WEGLD",
    aprEndpoint: "/egldapi.php",
    tokenIdentifier: toknesID.egld,
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

export const rewardsToken = ["SPROTEO", "RIDE", "AERO", "ZPAY"];
export const coinInfo = {
  ZPAYWEGLD: {
    logo: <NextImage alt="" src={zpayWegldImg} width={27} />,
  },
  AEROWEGLD: {
    logo: <NextImage alt="" src={aeroEgld} width={30} />,
  },
  AERO: {
    logo: <NextImage alt="" src={aeroImg} width={30} />,
  },
  ZPAY: {
    logo: <NextImage alt="" src={zpayImg} width={30} />,
  },
  USDC: { logo: <UsdclogoIcon fontSize={"27px"} />, decimals: 6 },
  EGLD: { logo: <EgldlogoIcon2 size={"27px"} /> },
  SPROTEO: { logo: <ProteoIcon w={"27px"} /> },
  PROTEOEGLD: {
    logo: <NextImage alt="" src={proteoEgldLpImg} width={30} />,
  },
  RIDE: {
    logo: <RidelogoIcon fontSize={"27px"} />,
  },
};

export const noMaxTokens = ["PROTEOEGLD", "EGLDRIDE", "ZPAYWEGLD", "AEROWEGLD"];
export const titles = ["PROTEO-EGLD", "USDC", "EGLD", "AERO-EGLD", "ZPAYWEGLD"];
