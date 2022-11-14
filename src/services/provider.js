import http from "./http";
import jwtDecode from "jwt-decode";
const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/provider`;

async function getProviderData() {
  const response = await http.get(`${API_ENDPOINT}/`);
  return response;
}

const exportedFunctions = {
  getProviderData,
};
export default exportedFunctions;
