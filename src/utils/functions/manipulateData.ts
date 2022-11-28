import { Many } from "lodash";
import orderBy from "lodash/orderBy";

export const orderSimpleData = (
  array = [],
  field,
  order: Many<boolean | "desc" | "asc"> = "desc"
) => {
  const orderData = orderBy(
    array,
    [
      function(o) {
        return typeof o[field] === "string"
          ? o[field].toString().toLowerCase()
          : o[field];
      },
    ],
    order
  );
  return orderData;
};
