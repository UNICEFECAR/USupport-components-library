import http from "./http";
const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/video`;

async function getTwilioToken(consultationId) {
  const response = await http.get(
    `${API_ENDPOINT}/twilio-token?consultationId=${consultationId}`
  );
  return response;
}

/**
 *
 * @param {String} consultationId the id of the consultation
 * @param {String} userType the type of the user - client or provider
 * @returns
 */
async function leaveConsultation(consultationId, userType) {
  const res = await http.put(`${API_ENDPOINT}/leave`, {
    consultationId,
    userType,
  });
  return res;
}

async function updateConsultationStatus(data) {
  const res = await http.put(`${API_ENDPOINT}/status`, {
    ...data,
  });
  return res;
}

export default { getTwilioToken, leaveConsultation, updateConsultationStatus };
