type ElrondType = "NonFungibleESDT" | "SemiFungibleESDT" | "MetaESDT ";

interface IElrondSocial {
  blog?: string;
  twitter?: string;
  whitepaper?: string;
  discord?: string;
  telegram?: string;
}

export interface IElrondNFT {
  identifier: string;
  collection: string;
  timestamp: number;
  attributes: string;
  nonce: number;
  type: ElrondType;
  name: string;
  creator: string;
  royalties?: number;
  uris?: string[];
  url: string;
  media?: {
    url: string;
    fileSize?: number;
    fileType?: string;
    originalUrl?: string;
    thumbnailUrl?: string;
  }[];
  isWhitelistedStorage?: boolean;
  metadata?: {
    description: string;
    compiler?: string;
    attributes?: any[];
  };
  supply?: string;
  ticker: string;
  rarities?: any;

  thumbnailUrl?: string;
  tags?: string[];

  owner?: string;
  balance?: string;
  decimals?: number;
  assets: {
    website?: string;
    description?: string;
    status?: string;
    pngUrl?: string;
    svgUrl?: string;
    ledgerSignature?: string;
    lockedAccounts?: string;
    extraTokens?: string[];
    preferredRankAlgorithm?: string;

    social?: IElrondSocial;
  };
  scamInfo?: {
    type?: string;
    info: string;
  };
  score?: number;
  rank?: number;

  isNsfw?: boolean;

  unlockSchedule?: {
    remainingEpochs: number;
    percent: number;
  }[];
}

export interface IMexPair {
  address?: string;
  id?: string;
  symbol?: string;
  name?: string;
  price?: number;
  baseId: string;
  basePrice: number;
  baseSymbol?: string;
  baseName?: string;
  quoteId?: string;
  quotePrice?: number;
  quoteSymbol?: string;
  quoteName?: string;
  totalValue?: number;
  volume24h?: number;
  state?: string;
  type?: string;
}

export interface CollectionTrait {
  name: string;
  occurrenceCount: number;
  occurrencePercentage: number;
  attributes: {
    name: string;
    occurrenceCount: number;
    occurrencePercentage: number;
  }[];
}

export interface IElrondCollection {
  collection: string;
  type: ElrondType;
  name: string;
  ticker: string;
  owner?: string;
  timestamp?: number;
  canFreeze?: boolean;
  canWipe?: boolean;
  canPause?: boolean;
  canTransferNftCreateRole?: boolean;
  roles: [
    {
      address: string;
      canCreate?: boolean;
      canBurn?: boolean;
      canAddQuantity?: boolean;
      canUpdateAttributes?: boolean;
      canAddUri?: boolean;
      roles: string[];
    }
  ];
  canTransfer?: boolean;

  decimals?: number;
  assets?: {
    website: string;
    description: string;
    status: "active" | "inactive ";
    pngUrl: string;
    svgUrl: string;
    ledgerSignature?: string;
    lockedAccounts?: string;
    extraTokens?: string[];
    preferredRankAlgorithm?: string;
    social?: IElrondSocial;
  };

  scamInfo?: {
    type?: string;
    info: string;
  };

  traits: any;
}

export interface IElrondEconomics {
  totalSupply: number;
  circulatingSupply: number;
  staked: number;
  price: number;
  marketCap: number;
  apr: number;
  topUpApr: number;
  baseApr: number;
  tokenMarketCap: number;
}
