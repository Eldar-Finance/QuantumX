// function that receive 2 numbers arrays and return true return true if at least one of the numbers in the first array is in the second array
export const isOneOfTheNumbersInArray = (
  numbers: number[],
  array: number[]
) => {
  return numbers.some((number) => array.includes(number));
};
