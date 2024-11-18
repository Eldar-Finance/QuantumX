import axios from "axios";

// const BASE_URL = "https://sprightly-tarsier-537dc5.netlify.app";
// const BASE_URL = "http://localhost:3000";
const BASE_URL = process.env.NEXT_PUBLIC_HOST || "https://www.quantumx.network";

const axiosNext = axios.create({
  baseURL: BASE_URL + "/api",
  headers: {
    // Remove User-Agent if it's being set
    // 'User-Agent': 'YourUserAgent' // This line should be removed
  },
});

export default axiosNext;
