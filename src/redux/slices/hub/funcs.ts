import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { scQuery } from "api/sc/queries";
import store from "redux/store";
import { IHubCreatorInfo } from "utils/types/sc.interface";

export const fetchCreatorInfo = createAsyncThunk(
  "hub/fetchCreatorInfo",
  async () => {
    const address = store.getState().userAccount.connectedAddress;
    const response = await scQuery("hubWsp", "getCreatorTable", [
      new AddressValue(new Address(address)),
    ]);
    const { firstValue } = response;

    const data: IHubCreatorInfo[] = firstValue
      .valueOf()
      .map((hubCreatorInfo) => {
        const data: IHubCreatorInfo = {
          id: hubCreatorInfo.field0.id.toNumber(),
          collection: hubCreatorInfo.field0.collection,
          creator: hubCreatorInfo.field0.creator.bech32(),
          price: hubCreatorInfo.field0.price.toNumber(),
          token: hubCreatorInfo.field0.token,
          withdrawableFounds: hubCreatorInfo.field1.toNumber(),
          nftsNonces: hubCreatorInfo.field2,
        };
        return data;
      });

    return data;
  }
);
