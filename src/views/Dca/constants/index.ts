import EgldLogoImg from "assets/logos/egld.svg";

export const lkmexAvaragingData = [
  {
    token: "ITHEUM",
    baseName: "Itheum",
    identifier: "ITHEUM-df6f26",
    percent: 20,
  },
  {
    token: "RIDE",
    baseName: "holoride",
    identifier: "RIDE-7d18e9",
    percent: 20,
  },
  {
    token: "ZPAY",
    baseName: "ZoidPay",
    identifier: "ZPAY-247875",
    percent: 20,
  },
  {
    token: "UTK",
    baseName: "Utrust",
    identifier: "UTK-2f80e9",
    percent: 20,
  },
  {
    token: "BHAT",
    baseName: "BHNetwork",
    identifier: "BHAT-c1fde3",
    percent: 20,
  },
];
export const minimalLkmexAvaragingData = [
  {
    token: "RIDE",
    baseName: "holoride",
    identifier: "RIDE-7d18e9",
    percent: 40,
  },
  {
    token: "ITHEUM",
    baseName: "Itheum",
    identifier: "ITHEUM-df6f26",
    percent: 30,
  },
  {
    token: "CRT",
    baseName: "CRT",
    identifier: "CRT-52decf",
    percent: 30,
  },
];
export const hightRiskLkmexAvaragingData = [
  {
    token: "PROTEO",
    baseName: "PROTEO",
    identifier: "PROTEO-0c7311",
    percent: 40,
  },
  {
    token: "QWT",
    baseName: "QoWatt",
    identifier: "QWT-46ac01",
    percent: 30,
    api: {
      url: "https://graph.maiar.exchange/graphql",
      method: "post",
      data: {
        query:
          '{  pairs(address: "erd1qqqqqqqqqqqqqpgq5fj4ttp8vylx8napuuruye5rewflqr542jpsv8tauj") {    price : firstTokenPrice  }}',
        variables: {},
      },
    },
  },
  {
    token: "AERO",
    baseName: "Aerovek",
    identifier: "AERO-458bbf",
    percent: 30,
  },
];

export const EgldToken = {
  identifier: "EGLD",
  name: "EGLD",
  ticker: "EGLD",
  decimals: 18,
  assets: {
    description: "EGLD",
    static: EgldLogoImg,
  },
};
