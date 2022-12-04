import { ReactNode } from "react";

export type SORTTYPE = "new" | "amount";
export interface IProteoFarm {
  Icon: ReactNode;
  stakedCoin: string;
  tokenIdentifier: string;
  decimals?: number;
  wsp: string;
  hc: number;
  token: string;
  customPrice?: number;
  aprEndpoint: string;
  noRewards?: boolean;
  tokenRewards?: { name: string; tokenI: string };
  fixedRewards?: number;
  endpointDefinition?: string;
  withHarvest?: boolean;
  getFarm?: string;
  viewContract?: string;
  seePair?: string;
  type: "pool" | "farm";
}
