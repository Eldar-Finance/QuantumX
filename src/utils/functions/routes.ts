export const getWebUrl = (path: string = ""): string => {
  return `${window.location.origin + path}`;
};

export const optionalRedirect = (callbackUrl?: string) => {
  if (typeof window !== "undefined" && callbackUrl != null) {
    setTimeout(() => {
      if (!window.location.pathname.includes(callbackUrl)) {
        window.location.href = callbackUrl;
      }
    }, 200);
  }
};

export const buildTwitterShareUrl = (
  nft: {
    collectionName;
    rank?: number;
    price?: string;
    link;
  },
  options?: {
    posted?: boolean;
    isForCollection?: boolean;
  }
): string => {
  let finalUrl = "";
  if (options?.isForCollection) {
    const collectionUrl = `https://twitter.com/intent/tweet?text=Awesome collection on NewMoon !%0A
    Collection: ${nft.collectionName}%0A
    ${nft.link}`;
    finalUrl = collectionUrl;
  } else {
    const nftUrl = `https://twitter.com/intent/tweet?text=I just ${
      options?.posted ? "posted" : "found"
    } a new NFT on NewMoon !%0A Collection: ${nft.collectionName}%0A ${
      nft.rank ? `Rank%3A%20${nft.rank}%0A` : ""
    } Price: ${nft.price} EGLD%0A ${nft.link}`;
    finalUrl = nftUrl;
  }
  return finalUrl;
};

export const buildUrlToNftPage = (
  nftIndentifier: string,
  fullUrl?: boolean
): string => {
  return fullUrl
    ? process.env.NEXT_PUBLIC_HOST + "nft/" + nftIndentifier
    : "nft/" + nftIndentifier;
};

export const buildUrlToCollectionPage = (
  collectionIdentifier: string,
  fullUrl?: boolean
): string => {
  return fullUrl
    ? process.env.NEXT_PUBLIC_HOST + "collections/" + collectionIdentifier
    : "collections/" + collectionIdentifier;
};

export const getParamFromUrl = (paramName: string) => {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get(paramName);
  }
};
