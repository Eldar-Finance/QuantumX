import { scQuery } from "api/sc/queries";
import { IHubAvilableOffers } from "utils/types/sc.interface";

export const fetchScHubOffers = async () => {
  const res = await scQuery("hubWsp", "getAllOffers");
  console.log("res.firstValue", res.firstValue.valueOf());
  const data: IHubAvilableOffers[] = res.firstValue
    .valueOf()
    .map((offer: any) => {
      const d: IHubAvilableOffers = {
        id: offer.field0.id.toNumber(),
        collection: offer.field0.collection,
        creator: offer.field0.creator.bech32(),
        price: offer.field0.price.toNumber(),
        token: offer.field0.token,
        numberOfAvilableNfts: offer.field1.toNumber(),
      };
      return d;
    });

  return data;
};
