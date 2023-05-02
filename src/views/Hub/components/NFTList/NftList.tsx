import { Center, Text } from "@chakra-ui/react";
import { BigIntValue } from "@multiversx/sdk-core/out";
import { contractAddr } from "api/net.config";
import { EGLDPayment, ESDTTransfer } from "api/sc/calls";
import srbImage from "assets/hub/srbcatalog.jpg";
import vacineImage from "assets/hub/vacine.png";
import miceCityImage from "assets/hub/miceCityImage.jpg";
import BigNumber from "bignumber.js";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetOffers from "views/Hub/hooks/useGetOffers";
import NftCard from "../NftCard/NftCard";

const NftList = () => {
  const { offers } = useGetOffers();
  const { tokens } = useGetMultipleElrondTokens(
    offers ? [offers[0].token, offers[1].token, offers[2].token] : []
  );

  if (!offers || !tokens) return null;

  const offer1 = {
    ...offers[1],
    elrondToken: tokens.find((t) => t.identifier === offers[1].token),
  };
  const offer2 = {
    ...offers[0],
    elrondToken: tokens.find((t) => t.identifier === offers[0].token),
  };
  const offer3 = {
    ...offers[3],
    elrondToken: tokens.find((t) => t.identifier === offers[3].token),
  };

  const handleSubmitHubOffer = (offer) => {
    const funcName = "buyNft";
    // const token = {
    //   decimals:0,
    //   identifier:""
    // }
    if (offer.token === "EGLD") {
      EGLDPayment(
        "hubWsp",
        funcName,
        0,
        [new BigIntValue(new BigNumber(offer.id))],
        10000000,
        offer.price
      );
    } else {
      ESDTTransfer({
        funcName,
        token: offer.elrondToken,
        contractAddr: contractAddr.hub,
        realValue: offer.price,
        args: [new BigIntValue(new BigNumber(offer.id))],
      });
    }
  };

  return (
    <Center flexWrap={"wrap"} gap={12} mt={8}>
      <NftCard
        iamge={srbImage}
        token={offer1.token}
        text={
          <Text>
            Pay{" "}
            {formatBalance(
              {
                balance: offer1.price,
                decimals: offer1.elrondToken?.decimals,
              },
              false,
              8
            )}{" "}
            {formatTokenI(offer1.token)}
            <br /> Get a random SRB
          </Text>
        }
        onSubmit={() => handleSubmitHubOffer(offer1)}
      />
      <NftCard
        token={offer2.token}
        iamge={vacineImage}
        onSubmit={() => handleSubmitHubOffer(offer2)}
        text={
          <Text>
            Pay{" "}
            {formatBalance({
              balance: offer2.price,
              decimals: offer2.elrondToken?.decimals,
            })}{" "}
            {formatTokenI(offer2.token)} <br /> Get an Abominator
          </Text>
        }
      />
      <NftCard
        token={offer3.token}
        iamge={miceCityImage}
        onSubmit={() => handleSubmitHubOffer(offer3)}
        text={
          <Text>
            Pay{" "}
            {formatBalance({
              balance: offer3.price,
              decimals: offer3.elrondToken?.decimals,
            })}{" "}
            {formatTokenI(offer3.token)} <br /> Get a random Mice
          </Text>
        }
        disabled={offer3.numberOfAvilableNfts === 0}
      />
    </Center>
  );
};

export default NftList;
