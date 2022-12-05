import { Many } from "lodash";
import orderBy from "lodash/orderBy";

export const removeDuplicates = (
  array: any[],
  options: {
    accesor?: string;
    accessors?: string[];
  }
) => {
  const finalArray = [];
  const values = [];
  const keys: string[] = options.accessors || [options.accesor];

  array.forEach((element) => {
    const value = keys.reduce((acc, key) => acc[key], element);
    if (!values.includes(value)) {
      finalArray.push(element);
      values.push(value);
    }
  });
  return finalArray;
};

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
