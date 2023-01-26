import http from "./http";

const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/client`;

async function getClientData() {
  const response = await http.get(`${API_ENDPOINT}/`);
  return response;
}

async function getClientDataById(id) {
  const response = await http.get(`${API_ENDPOINT}/by-id?clientId=${id}`);
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

async function changeImage(imageName) {
  const response = await http.put(`${API_ENDPOINT}/image`, {
    image: imageName,
  });
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

async function getAllConsultations() {
  const response = await http.get(`${API_ENDPOINT}/consultation/all`);
  return response;
}

/**
 *
 * @param {number} date timestamp of the date
 * @param {string} mood the value of the mood
 * @returns {Promise} the response of the request
 */
async function addMoodTrack(mood, comment) {
  const response = await http.post(`${API_ENDPOINT}/mood-tracker`, {
    comment,
    mood,
  });
  return response;
}

async function getMoodTrackForToday() {
  const response = await http.get(`${API_ENDPOINT}/mood-tracker/today`);
  return response;
}

async function getMoodTrackForWeek(startDate) {
  const response = await http.get(
    `${API_ENDPOINT}/mood-tracker/week?startDate=${JSON.stringify(startDate)}`
  );
  return response;
}

async function getSecurityCheckAnswersByConsultationId(consultationId) {
  const response = await http.get(
    `${API_ENDPOINT}/consultation/security-check?consultationId=${consultationId}`
  );
  return response;
}

async function createConsultationSecurityCheck(payload) {
  const response = await http.post(
    `${API_ENDPOINT}/consultation/security-check`,
    payload
  );
  return response;
}

async function updateConsultationSecurityCheck(payload) {
  const response = await http.put(
    `${API_ENDPOINT}/consultation/security-check`,
    payload
  );
  return response;
}

async function sendInformationPortalSuggestion(suggestion) {
  const response = await http.post(
    `${API_ENDPOINT}/information-portal-suggestion`,
    { suggestion }
  );
  return response;
}

const exportedFunctions = {
  addMoodTrack,
  getClientData,
  getClientDataById,
  updateClientData,
  deleteClientProfile,
  deleteImage,
  changeImage,
  changeDataProcessingAgreement,
  getAllConsultations,
  getSecurityCheckAnswersByConsultationId,
  createConsultationSecurityCheck,
  updateConsultationSecurityCheck,
  sendInformationPortalSuggestion,
  getMoodTrackForToday,
  getMoodTrackForWeek,
};

export default exportedFunctions;
