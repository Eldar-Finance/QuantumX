import { BytesValue } from "@multiversx/sdk-core/out";
import { EGLDPayment } from "api/sc/calls";
import { IScQxTagPurchaseMarketplace } from "utils/types/sc.interface";

export const purchaseQxTagMarketplace = async (username: string, extension: string): Promise<IScQxTagPurchaseMarketplace> => {
    const res = await EGLDPayment(
        "tagsWsp",
        "buyQtag",
        0,
        [
            BytesValue.fromUTF8(username),
            BytesValue.fromUTF8(extension),
        ],
        10000000,
    );
    return res;
};