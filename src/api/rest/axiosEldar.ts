import axios from "axios";
// const BASE_URL = process.env.REACT_APP_HOST;
const BASE_URL = "https://eldar-back.herokuapp.com";
// const BASE_URL = "http://localhost:1337";

const axiosEldar = axios.create({
  baseURL: BASE_URL + "/api",
});

export default axiosEldar;
