import http from "./http";

const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/client`;

async function getClientData() {
  const response = await http.get(`${API_ENDPOINT}/`);
  return response;
}

async function updateClientData(data) {
  const response = await http.put(`${API_ENDPOINT}/`, data);
  return response;
}

async function deleteClientProfile(password) {
  const response = await http.delete(`${API_ENDPOINT}/`, {
    data: { password },
  });
  return response;
}

async function changeImage() {
  const response = await http.put(`${API_ENDPOINT}/image`);
  return response;
}

async function changeDataProcessingAgreement(dataProcessing) {
  const response = await http.put(`${API_ENDPOINT}/data-processing-agreement`, {
    dataProcessing,
  });
  return response;
}

async function deleteImage() {
  const response = await http.delete(`${API_ENDPOINT}/image`);
  return response;
}

/**
 *
 * @param {String} providerId the id of the provider
 * @param {number} slotTimestamp the timestamp of the slot
 * @returns {Promise} resolving to and object with the "consultation_id"
 */
async function blockSlot(providerId, slotTimestamp) {
  const response = await http.post(`${API_ENDPOINT}/consultation/block`, {
    providerId,
    time: JSON.stringify(slotTimestamp / 1000),
  });
  return response;
}

const exportedFunctions = {
  getClientData,
  updateClientData,
  deleteClientProfile,
  deleteImage,
  changeImage,
  changeDataProcessingAgreement,
  blockSlot,
};

export default exportedFunctions;
