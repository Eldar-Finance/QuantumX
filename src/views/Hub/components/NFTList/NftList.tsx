import { Center, Text } from "@chakra-ui/react";
import { BigIntValue } from "@multiversx/sdk-core/out";
import { contractAddr } from "api/net.config";
import { EGLDPayment, ESDTTransfer } from "api/sc/calls";
import srbImage from "assets/hub/srbcatalog.jpg";
import vacineImage from "assets/hub/vacine.png";
import vipImage from "assets/hub/vip.png";
import miceCityImage from "assets/hub/miceCityImage.jpg";
import cowImage from "assets/hub/cow.jpg";
import pepeImage from "assets/hub/pepe.jpg";
import gnogenImage from "assets/hub/gnogen.jpg";
import BigNumber from "bignumber.js";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import useGetOffers from "views/Hub/hooks/useGetOffers";
import NftCard from "../NftCard/NftCard";

const NftList = () => {
  const { offers } = useGetOffers();
  const { tokens } = useGetMultipleElrondTokens(
    offers ? [offers[8].token, offers[9].token, offers[10].token, offers[11].token] : []
  );

  if (!offers || !tokens) return null;

  const offer1 = {
    ...offers[11],
    elrondToken: tokens.find((t) => t.identifier === offers[11].token),
  };
  const offer2 = {
    ...offers[0],
    elrondToken: tokens.find((t) => t.identifier === offers[0].token),
  };
  const offer3 = {
    ...offers[10],
    elrondToken: tokens.find((t) => t.identifier === offers[10].token),
  };
  const offer7 = {
    ...offers[8],
    elrondToken: tokens.find((t) => t.identifier === offers[8].token),
  };
  const offer8 = {
    ...offers[9],
    elrondToken: tokens.find((t) => t.identifier === offers[9].token),
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
        token={offer1.token}
        iamge={vipImage}
        onSubmit={() => handleSubmitHubOffer(offer1)}
        text={
          <Text>
            Pay{" "}
            {formatBalance({
              balance: offer1.price,
              decimals: offer1.elrondToken?.decimals,
            })}{" "}
            {formatTokenI(offer1.token)} <br /> Get a VIP CARD
            <br /> <br /> Available NFTs: <br /> {offer1.numberOfAvilableNfts}
          </Text>
        }
        disabled={offer1.numberOfAvilableNfts === 0}
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
            <br /> <br /> Available NFTs: <br /> {offer2.numberOfAvilableNfts}
          </Text>
        }
        disabled={offer2.numberOfAvilableNfts === 0}
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
            <br /> <br /> Available NFTs: <br /> {offer3.numberOfAvilableNfts}
          </Text>
        }
        disabled={offer3.numberOfAvilableNfts === 0}
      />
      {/* <NftCard
        iamge={cowImage}
        token={offer4.token}
        text={
          <Text>
            Pay{" "}
            {formatBalance(
              {
                balance: offer4.price,
                decimals: offer4.elrondToken?.decimals,
              },
              false,
              8
            )}{" "}
            {formatTokenI(offer4.token)}
            <br /> Get a random Cow
            <br /> <br /> Available NFTs: <br /> {offer4.numberOfAvilableNfts}
          </Text>
        }
        onSubmit={() => handleSubmitHubOffer(offer4)}
        disabled={offer4.numberOfAvilableNfts === 0}
      />
      <NftCard
        iamge={gnogenImage}
        token={offer5.token}
        text={
          <Text>
            Pay{" "}
            {formatBalance(
              {
                balance: offer5.price,
                decimals: offer5.elrondToken?.decimals,
              },
              false,
              8
            )}{" "}
            {formatTokenI(offer5.token)}
            <br /> Get a random Gnogon
            <br /> <br /> Available NFTs: <br /> {offer5.numberOfAvilableNfts}
          </Text>
        }
        onSubmit={() => handleSubmitHubOffer(offer5)}
        disabled={offer5.numberOfAvilableNfts === 0}
      /> */}
      <NftCard
        iamge={srbImage}
        token={offer8.token}
        text={
          <Text>
            Pay{" "}
            {formatBalance(
              {
                balance: offer8.price,
                decimals: offer8.elrondToken?.decimals,
              },
              false,
              8
            )}{" "}
            {formatTokenI(offer8.token)}
            <br /> Get a random SRB
            <br /> <br /> Available NFTs: <br /> {offer8.numberOfAvilableNfts}
          </Text>
        }
        onSubmit={() => handleSubmitHubOffer(offer8)}
        disabled={offer8.numberOfAvilableNfts === 0}
      />
      <NftCard
        iamge={pepeImage}
        token={offer7.token}
        text={
          <Text>
            Pay{" "}
            {formatBalance(
              {
                balance: offer7.price,
                decimals: offer7.elrondToken?.decimals,
              },
              false,
              8
            )}{" "}
            {formatTokenI(offer7.token)}
            <br /> Get a random Pepe
            <br /> <br /> Available NFTs: <br /> {offer7.numberOfAvilableNfts}
          </Text>
        }
        onSubmit={() => handleSubmitHubOffer(offer7)}
        disabled={offer7.numberOfAvilableNfts === 0}
      />
    </Center>
  );
};

export default NftList;
