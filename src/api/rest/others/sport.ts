import axios from "axios";
const BASE_URL = "https://www.thesportsdb.com/api/v1/json/50130162";

const axiosSports = axios.create({
  baseURL: BASE_URL,
});

export default axiosSports;

export const getTeamInfoByName = async (name) => {
  return await axiosSports.get("/searchteams.php", {
    params: {
      t: name,
    },
  });
};
