import http from "./http";
const API_ENDPOINT = `${
  import.meta.env.VITE_API_ENDPOINT
}/v1/admin/organization`;

const getAllOrganizations = async () => {
  const response = await http.get(`${API_ENDPOINT}/all`);
  return response.data;
};

const getOrganizationsWithDetails = async () => {
  const response = await http.get(`${API_ENDPOINT}/all/details`);
  return response.data;
};

const createOrganization = async (payload) => {
  const response = await http.post(`${API_ENDPOINT}/`, payload);
  return response.data;
};

const editOrganization = async (payload) => {
  const response = await http.put(`${API_ENDPOINT}/`, payload);
  return response.data;
};

const exportedFunctions = {
  getAllOrganizations,
  getOrganizationsWithDetails,
  createOrganization,
  editOrganization,
};

export default exportedFunctions;
