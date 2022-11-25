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

/**
 *
 * @param {Number} startDate - start date in milliseconds in UTC
 * @returns {array} - array of timestamps is milliseconds in UTC
 */
async function getAvailabilityForWeek(startDate) {
  const response = await http.get(
    `${API_ENDPOINT}/availability/single-week?startDate=${startDate}`
  );
  return response;
}

/**
 *
 * @param {Number} startDate - start date timestamp in milliseconds in UTC
 * @param {Number} slot - slot timestamp in milliseconds in UTC
 */
async function addAvailableSlot(startDate, slot) {
  const response = await http.put(`${API_ENDPOINT}/availability/single-week`, {
    startDate: startDate.toString(),
    slot: slot.toString(),
  });
  return response;
}

/**
 *
 * @param {Number} startDate - start date timestamp in milliseconds in UTC
 * @param {Number} slot - slot timestamp in milliseconds in UTC
 */
async function removeAvailableSlot(startDate, slot) {
  const response = await http.delete(
    `${API_ENDPOINT}/availability/single-week`,
    {
      data: {
        startDate: startDate.toString(),
        slot: slot.toString(),
      },
    }
  );
  return response;
}

async function addTemplateAvailability(data) {
  const response = await http.put(
    `${API_ENDPOINT}/availability/template`,
    data
  );
  return response;
}

async function getAllProviders() {
  const response = await http.get(`${API_ENDPOINT}/all`);
  return response;
}

async function getProviderById(id) {
  const response = await http.get(`${API_ENDPOINT}/by-id?providerId=${id}`);
  return response;
}

/**
 *
 * @param {number} startDate the timestamp of the start date of the week
 * @param {number} day the timestamp of the desired day
 * @param {String} providerId the id of the provider
 * @returns {Promise} resolving to an array with all the slots for the day
 */
async function getAvailableSlotsForSingleDay(startDate, day, providerId) {
  const response = await http.get(
    `${API_ENDPOINT}/availability/single-day?providerId=${providerId}&startDate=${startDate}&day=${day}`
  );
  return response;
}

/**
 *
 * @param {String} clientId the id of the client
 * @param {String} providerId the id of the provider
 * @param {number} slotTimestamp the timestamp of the slot
 * @returns {Promise} resolving to and object with the "consultation_id"
 */
async function blockSlot(clientId, providerId, slotTimestamp) {
  const response = await http.post(`${API_ENDPOINT}/consultation/block`, {
    clientId,
    providerId,
    time: JSON.stringify(slotTimestamp / 1000),
  });
  return response;
}

/**
 *
 * @param {String} consultationId the id of the consultation
 * @returns {Promise}
 */
async function scheduleConsultation(consultationId) {
  const response = await http.put(`${API_ENDPOINT}/consultation/schedule`, {
    consultationId,
  });
  return response;
}

async function cancelConsultation(consultationId) {
  const res = await http.put(`${API_ENDPOINT}/consultation/cancel`, {
    consultationId,
  });
  return res;
}

const exportedFunctions = {
  getProviderData,
  updateProviderData,
  changeImage,
  deleteImage,
  getAvailabilityForWeek,
  addAvailableSlot,
  removeAvailableSlot,
  addTemplateAvailability,
  getAllProviders,
  getProviderById,
  getAvailableSlotsForSingleDay,
  blockSlot,
  scheduleConsultation,
  cancelConsultation,
};
export default exportedFunctions;
