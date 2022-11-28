import { IElrondNFT } from "utils/types/elrond.interface";
import { noShowMedia } from "./medias";

export const filterNftsWithMedia = (nfts: IElrondNFT[]) => {
  const newNfts = nfts.filter((nft) => !noShowMedia(nft));

  return newNfts;
};
