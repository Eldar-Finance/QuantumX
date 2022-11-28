import axiosEldron from "api/rest/axiosEldron";

// export const getFromAllTokens = async () => {
//   return await axiosEldron.get("/tokens?size=10000");
// };
export const getFromAllTokens = async ({
  size = 10000,
  name = undefined,
  identifier = undefined,
  identifiers = undefined,
  search = undefined,
}) => {
  return await axiosEldron.get("/tokens", {
    params: {
      identifier,
      identifiers,
      name,
      size,
      search,
    },
  });
};
