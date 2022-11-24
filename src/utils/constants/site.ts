// Your Dapp hostname example: https://www.mydapp.com it should come from env vars
export const host = process.env.NEXT_PUBLIC_HOST;

// HTML metata and og tags, default values for MetaHead.tsx component
export const defaultMetaTags = {
  title: "QuantumX - Tools Build On MultiversX Ecosystem",
  description:
    "QuantumX is a Platform that provides a tightly integrated ecosystem of dApps, that aims to get full advantage of the capabilities of MultiversX Network.",
  image: `${host}/images/dashboard.jpg`,
};
