// Your Dapp hostname example: https://www.mydapp.com it should come from env vars
export const host = process.env.NEXT_PUBLIC_HOST;

// HTML metata and og tags, default values for MetaHead.tsx component
export const defaultMetaTags = {
  title:
    "QuantumX Network - Friction-less swaps. Quantum level latency. Next-level interface.",
  description:
    "QuantumX's goal is to create dApps that provide true value to their users, by combining traditional DEFI investing methods with real world applications.",
  image: `${host}/img.jpg`,
};

// Kostas
export const KostasAddress1 =
  "erd1hqaczk7hmszly8jt2a4yd3pk6dkvffjk0efy9uz6p3r65dnpfhas6nxvyd";
export const KostasAddress2 =
  "erd13j00d82gs7ec665z202lh25l7tjw6lpaxwe7th4e6uwlsk3r8pgq555qzg";
export const KostasAddress3 =
  "erd1lnmfa5p9j6qy40kjtrf0wfq6cl056car6hyvrq5uxdcalc2gu7zsrwalel";
//  Dinos address
export const DinosAddress =
  "erd1s5ufsgtmzwtp6wrlwtmaqzs24t0p9evmp58p33xmukxwetl8u76sa2p9rv";
/* My address */
export const ArmandoAddress =
  "erd1ag6nvusjhcw90ntutyzsn7gntmgx9rv8xz2qczgquy48ltaxqghqxs0rkl";

export const admins = [
  ArmandoAddress,
  DinosAddress,
  KostasAddress1,
  KostasAddress2,
  KostasAddress3,
];
