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

const getOrganizationById = async (organizationId, filters) => {
  let filtersQuery = "";

  const startTime = filters.startTime.split("").slice(0, 2).join("");
  const endTime = filters.endTime.split("").slice(0, 2).join("");

  const startDateTimestamp = JSON.stringify(
    new Date(new Date(filters.startDate).setHours(0, 0, 0, 0)).getTime() / 1000
  );

  const endDateTimestamp = JSON.stringify(
    new Date(new Date(filters.endDate).setHours(23, 59, 59)).getTime() / 1000
  );

  filtersQuery += `&startDate=${startDateTimestamp}
                   &endDate=${endDateTimestamp}
                   &startTime=${startTime}
                   &endTime=${endTime}
                   &weekdays=${filters.weekdays ? 1 : 0}
                   &weekends=${filters.weekends ? 1 : 0}`;

  if (filters.search) {
    filtersQuery += `&search=${filters.search}`;
  }

  const response = await http.get(
    `${API_ENDPOINT}/${organizationId}?${filtersQuery}`
  );
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

const getOrganizationWorkWith = async () => {
  const response = await http.get(`${API_ENDPOINT}/work/with`);
  return response.data;
};

const getDistricts = async () => {
  const response = await http.get(`${API_ENDPOINT}/districts`);
  return response.data;
};

const getPaymentMethods = async () => {
  const response = await http.get(`${API_ENDPOINT}/payment-methods`);
  return response.data;
};

const getUserInteractions = async () => {
  const response = await http.get(`${API_ENDPOINT}/user-interactions`);
  return response.data;
};

const getOrganizationSpecialisations = async () => {
  const response = await http.get(`${API_ENDPOINT}/specialisations`);
  return response.data;
};

async function getOrganizationMetadata() {
  const response = await http.get(`${API_ENDPOINT}/metadata`);
  return response.data;
}

const exportedFunctions = {
  getAllOrganizations,
  getOrganizationsWithDetails,
  getOrganizationById,
  createOrganization,
  editOrganization,
  assignProvidersToOrganization,
  removeProviderFromOrganization,
  getOrganizationWorkWith,
  getDistricts,
  getPaymentMethods,
  getUserInteractions,
  getOrganizationSpecialisations,
  getOrganizationMetadata,
};

export default exportedFunctions;
