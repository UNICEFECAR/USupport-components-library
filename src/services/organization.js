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

const getOrganizationById = async (organizationId) => {
  const response = await http.get(`${API_ENDPOINT}/${organizationId}`);
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

const assignProvidersToOrganization = async (payload) => {
  const response = await http.post(`${API_ENDPOINT}/assign-provider`, payload);
  return response.data;
};

const removeProviderFromOrganization = async (payload) => {
  const response = await http.put(`${API_ENDPOINT}/remove-provider`, payload);
  return response.data;
};

const exportedFunctions = {
  getAllOrganizations,
  getOrganizationsWithDetails,
  getOrganizationById,
  createOrganization,
  editOrganization,
  assignProvidersToOrganization,
  removeProviderFromOrganization,
};

export default exportedFunctions;
