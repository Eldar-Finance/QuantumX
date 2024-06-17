export interface IElrondnftswapNFT {
  _id: string;
  nativeAttributes: {
    trait_type: string;
    value: string;
    _id: string;
  }[];
  attributes: {
    trait_type: string;
    value: string;
    _id: string;
  }[];
  media: {
    thumbnailUrl: string;
    originalUrl: string;
    fileType: "image/png";
    url: string;
    _id: string;
  }[];
  royalties: string;
  creator: string;
  url: string;
  name: string;
  nonce: number;
  nftCollection: string;
  identifier: string;
  __v: number;
  rarityScore: number;
  rank: number;
}

export interface INomalSmartSwap {
  NrSwaps?: string;
  token1: string;
  token2: string;
  amountsend: string;
  amountReceiv: string;
  amountReceivDec: string;
  smartcontract: string;
  dollarAmount?: string;
  type?: "exchange";
  finalvalue?: string;
}

export interface ILpSmartSwap {
  lpamounttoreceive: string;
  lptokenidentifier: string;
  smartcontract: string;
  token1identifier: string;
  token1lpamount: string;
  token2identifier: string;
  token2lpamount: string;
  dollarAmount?: string;
  finalvalue?: string;
}

export type ISmartSwapData = INomalSmartSwap | ILpSmartSwap;
