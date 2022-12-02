import { toknesID } from "api/net.config";
import {
  aeroWegldWsp,
  proteoEgldEliteWsp,
  zpayEgldEliteDualWsp,
} from "api/sc/sc";
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

export const proteoFarms: {
  ZPAYWEGLD: IProteoFarm;
  "AERO-EGLD": IProteoFarm;
  "PROTEO-EGLD": IProteoFarm;
} = {
  "PROTEO-EGLD": {
    hc: 20,
    Icon: <NextImage alt="" src={proteoEgldLpImg} width={45} />,
    stakedCoin: "PROTEOEGLD",
    wsp: proteoEgldEliteWsp,
    token: "PROTEOEGLDLP",
    aprEndpoint: "/proteoegldapi.php",
    tokenIdentifier: toknesID.proteoEgldLp,
    getFarm:
      "https://arda.run/swap?from=single-wallet-&to=lpMaiar-wallet-PROTEOEGLD-baf054",
    viewContract: "https://explorer.elrond.com/tokens/PROTEOEGLD-baf054",
    seePair: "https://e-compass.io/maiars/chart/proteo/wegld",
  },
  ZPAYWEGLD: {
    hc: 20,
    Icon: <NextImage alt="" src={zpayWegldImg} width={45} />,
    stakedCoin: "ZPAYWEGLD",
    wsp: zpayEgldEliteDualWsp,
    token: "ZPAYWEGLD",
    aprEndpoint: "/zpayegldapi.php",
    tokenIdentifier: toknesID.zpayWegldLp,
    tokenRewards: { name: "ZPAY", tokenI: toknesID.zpay },
    endpointDefinition: "getMyStakedInfoLPDUALFARMS",
    getFarm:
      "https://arda.run/swap?from=single-wallet-&to=lpMaiar-wallet-ZPAYWEGLD-34e5c1",
    viewContract: "https://explorer.elrond.com/tokens/ZPAYWEGLD-34e5c1",
    seePair: "https://e-compass.io/maiars/chart/zpay/wegld",
  },
  "AERO-EGLD": {
    hc: 20,
    Icon: <NextImage alt="" src={aeroEgld} width={45} />,
    stakedCoin: "AEROWEGLD",
    wsp: aeroWegldWsp,
    token: "AEROWEGLD",
    aprEndpoint: "/aeroegldapi.php",
    tokenIdentifier: toknesID.aerowegld,
    tokenRewards: { name: "AERO", tokenI: toknesID.aero },
    endpointDefinition: "getMyStakedInfoLPDUALFARMS",
    getFarm:
      "https://arda.run/swap?from=single-wallet-&to=lpMaiar-wallet-AEROWEGLD-81cc37",
    viewContract: "https://explorer.elrond.com/tokens/AEROWEGLD-81cc37",
    seePair: "https://e-compass.io/maiars/chart/aero/wegld",
  },
};

const getProteFarmsArr = () => {
  const arr: IProteoFarm[] = [];
  for (const key in proteoFarms) {
    arr.push(proteoFarms[key]);
  }
  return arr;
};

export const proteoFarmsArr: IProteoFarm[] = getProteFarmsArr();

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
