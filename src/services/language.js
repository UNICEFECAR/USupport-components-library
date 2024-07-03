import http from "./http";

const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/user`;

async function getActiveLanguages(forGlobal = false) {
  let qs = "";
  if (forGlobal) {
    qs = "?forGlobal=true";
  }
  const response = await http.get(`${API_ENDPOINT}/languages${qs}`);
  return response;
}
async function getAllLanguages() {
  const response = await http.get(`${API_ENDPOINT}/languages/all`);
  return response;
}

const exportedFunctions = {
  getActiveLanguages,
  getAllLanguages,
};

export default exportedFunctions;
