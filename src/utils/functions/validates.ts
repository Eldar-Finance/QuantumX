import { Address } from "@elrondnetwork/erdjs/out";

export function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const validateAddress = (address: string) => {
  if (!address) {
    return false;
  }
  try {
    new Address(address);
  } catch (err) {
    return false;
  }

  return true;
};

export function isValidIdentifier(identifier) {
  // Regular expression for identifier format
  const identifierRegex = /^[A-Z]+-[a-zA-Z0-9]{6}$/;
  return identifierRegex.test(identifier);
}
