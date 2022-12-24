import { toknesID } from "api/net.config";
import {
  aeroWegldWsp,
  proteoEgldEliteWsp,
  zpayEgldEliteDualWsp,
} from "api/sc/sc";
import aeroEgld from "assets/logos/aeroegl.png";
import proteoEgldLpImg from "assets/logos/proteolp.png";

import zpayWegldImg from "assets/logos/zpaywegld.png";
import NextImage from "components/NextImage/NextImage";

import rareUsdcImage from "assets/logos/rare-usdc.png";
import { IProteoFarm } from "utils/types/farms.interface";

export const proteoFarms: {
  ZPAYWEGLD: IProteoFarm;
  AEROWEGLD: IProteoFarm;
  PROTEOEGLDLP: IProteoFarm;
} = {
  PROTEOEGLDLP: {
    hc: 20,
    Icon: <NextImage alt="" src={proteoEgldLpImg} width={45} />,
    stakedCoin: "PROTEO-EGLD",
    wsp: proteoEgldEliteWsp,
    token: "PROTEOEGLD",
    aprEndpoint: "/proteoegldapi.php",
    tokenIdentifier: toknesID.proteoEgldLp,
    getFarm:
      "https://arda.run/swap?from=single-wallet-&to=lpMaiar-wallet-PROTEOEGLD-baf054",
    viewContract: "https://explorer.elrond.com/tokens/PROTEOEGLD-baf054",
    seePair: "https://e-compass.io/maiars/chart/proteo/wegld",
    type: "farm",
  },
  ZPAYWEGLD: {
    hc: 20,
    Icon: <NextImage alt="" src={zpayWegldImg} width={45} />,
    stakedCoin: "ZPAY-WEGLD",
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
    type: "farm",
  },
  AEROWEGLD: {
    hc: 20,
    Icon: <NextImage alt="" src={aeroEgld} width={45} />,
    stakedCoin: "AERO-WEGLD",
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
    type: "farm",
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

export const farms2Data = {
  RAREUSDC: {
    logo: rareUsdcImage,
    name: "RAREUSDCLP",
    lpToken1: toknesID.rare,
    lpToken2: toknesID.usdc,
    scFarmAddress:
      "erd1qqqqqqqqqqqqqpgqjz5k2a7ed2xtd0d92zt0j8e7aap70y7g2jpsjz5z4r",
  },
};
