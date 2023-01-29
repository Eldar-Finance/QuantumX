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

export function exportToCsv(data: any[], filename: string) {
  const replacer = (key, value) => (value === null ? "" : value);
  const header = Object.keys(data[0]);
  let csv = data.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(",")
  );
  csv.unshift(header.join(","));
  let csvArray = csv.join("\r\n");

  var blob = new Blob([csvArray], { type: "text/csv" });
  /* @ts-ignore */
  if (window.navigator.msSaveOrOpenBlob) {
    /* @ts-ignore */
    window.navigator.msSaveBlob(blob, filename);
  } else {
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
