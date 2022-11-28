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
