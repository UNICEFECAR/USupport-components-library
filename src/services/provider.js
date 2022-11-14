import http from "./http";
import jwtDecode from "jwt-decode";
const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/provider`;

async function getProviderData() {
  const response = await http.get(`${API_ENDPOINT}/`);
  return response;
}

async function updateProviderData(data) {
  const response = await http.put(`${API_ENDPOINT}/`, data);
  return response;
}

async function changeImage() {
  const response = await http.put(`${API_ENDPOINT}/image`);
  return response;
}

async function deleteImage() {
  const response = await http.delete(`${API_ENDPOINT}/image`);
  return response;
}

const exportedFunctions = {
  getProviderData,
  updateProviderData,
  changeImage,
  deleteImage,
};
export default exportedFunctions;
