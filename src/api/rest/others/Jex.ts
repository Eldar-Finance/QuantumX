/* eslint-disable camelcase */
import axios from "axios";
const BASE_URL = "https://microservice.jexchange.io";

const axiosJex = axios.create({
  baseURL: BASE_URL,
});

export default axiosJex;

export const getOffers = async ({
  token_a_identifier,
  token_b_identifier,
  hide_reserved_offers = true,
  sort = "rate",
  include_one_shot = "false",
  status = 0,
  limit = 20,
  min_fill = 1,
}) => {
  return await axiosJex.get("/v3/offers", {
    params: {
      token_a_identifier,
      token_b_identifier,
      hide_reserved_offers,
      include_one_shot,
      sort,
      status,
      limit,
      min_fill,
    },
  });
};

export const getJexPrice = async ([key, identifier]: [
  string,
  string
]): Promise<number> => {
  const { data } = await axiosJex.get(`/prices/${identifier}`);
  return data.rate;
};
