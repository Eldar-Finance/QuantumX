import aeroEgld from "assets/logos/aeroegl.png";
import aeroImg from "assets/logos/aerologo.svg";
import zpayImg from "assets/logos/logo.svg";
import proteoEgldLpImg from "assets/logos/proteolp.png";
import sproteoImg from "assets/logos/sproteo.svg";
import zpayWegldImg from "assets/logos/zpaywegld.png";
import {
  CyberLogoIcon,
  EgldlogoIcon2,
  RidelogoIcon,
  UsdclogoIcon,
} from "components/Icons/ui";
import NextImage from "components/NextImage/NextImage";

export const noMaxTokens = [
  "PROTEOEGLDLP",
  "ZPAYWEGLD",
  "AEROWEGLD",
  "CYBERWEGLD",
];
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
  SPROTEO: { logo: <NextImage alt="" src={sproteoImg} width={27} /> },
  PROTEOEGLD: {
    logo: <NextImage alt="" src={proteoEgldLpImg} width={30} />,
  },
  RIDE: {
    logo: <RidelogoIcon fontSize={"27px"} />,
  },
  CYBER: {
    logo: <CyberLogoIcon fontSize={"27px"} />,
  },
};

export const farmsLogos = {};
