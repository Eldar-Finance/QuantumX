/* eslint-disable camelcase */
import axios from "axios";
const BASE_URL = "https://microservice.jexchange.io/v3";

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
  return await axiosJex.get("/offers", {
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
