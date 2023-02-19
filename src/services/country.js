import http from "./http";

const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/user`;

async function getActiveCountries() {
  const response = await http.get(`${API_ENDPOINT}/countries`);
  return response;
}

const exportedFunctions = {
  getActiveCountries,
};

export default exportedFunctions;
