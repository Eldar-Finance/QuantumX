// Your Dapp hostname example: https://www.mydapp.com it should come from env vars
export const host = process.env.NEXT_PUBLIC_HOST;

// HTML metata and og tags, default values for MetaHead.tsx component
export const defaultMetaTags = {
  title: "QuantumX",
  description:
    "QuantumX is a Platform that provides a tightly integrated ecosystem of dApps, that aims to get full advantage of the capabilities of MultiversX Network.",
  image: `${host}/images/dashboard.jpg`,
};

// Kostas
export const KostasAddress =
  "erd1wlz5dy2m766fxgmygy7e30380h8tgqqj6k7rr7jzr0q6cthw64qsp6qr4s";
//  Dinos address
export const DinosAddress =
  "erd1s5ufsgtmzwtp6wrlwtmaqzs24t0p9evmp58p33xmukxwetl8u76sa2p9rv";
/* My address */
export const ArmandoAddress =
  "erd1ag6nvusjhcw90ntutyzsn7gntmgx9rv8xz2qczgquy48ltaxqghqxs0rkl";

export const admins = [ArmandoAddress, DinosAddress, KostasAddress];
