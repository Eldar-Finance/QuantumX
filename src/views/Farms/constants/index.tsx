import { toknesID } from "api/net.config";
import epunkUsdcimg from "assets/logos/epunksusdc.png";
import estarusdcImage from "assets/logos/estarusdc.png";
import rareUsdcImage from "assets/logos/rare-usdc.png";

export const farms2Data = {
  RAREUSDC: {
    logo: rareUsdcImage,
    name: "RAREUSDCLP",
    lpToken1: toknesID.rare,
    lpToken2: toknesID.usdc,
    scFarmAddress:
      "erd1qqqqqqqqqqqqqpgqjz5k2a7ed2xtd0d92zt0j8e7aap70y7g2jpsjz5z4r",
  },
  ESTARUSDC: {
    logo: estarusdcImage,
    name: "ESTARUSDCLP",
    lpToken1: toknesID.estar,
    lpToken2: toknesID.usdc,
    scFarmAddress: "",
  },
  EPUNKSUSDC: {
    logo: epunkUsdcimg,
    name: "EPUNKSUSDCLP",
    lpToken1: toknesID.epunks,
    lpToken2: toknesID.usdc,
    scFarmAddress: "",
  },
};

export const farmsTobeShutDown = [22, 26, 27, 36, 37, 47, 49];

// 1) bonez-hype - id 37
// 2) rare-bonez - id 36
// 3) hypelegld - id 47
// 4) rareusdc-wegld - id 49
// 5) hypeusdc-hype - id 22
// 6) 25, 26, 27 (the bear pools)