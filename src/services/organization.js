import http from "./http";
const API_ENDPOINT = `${
  import.meta.env.VITE_API_ENDPOINT
}/v1/admin/organization`;

const getAllOrganizations = async () => {
  const response = await http.get(`${API_ENDPOINT}/all`);
  return response.data;
};

const exportedFunctions = {
  getAllOrganizations,
};

export default exportedFunctions;
