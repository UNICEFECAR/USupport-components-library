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

const exportedFunctions = {
  getProviderData,
  updateProviderData,
  changeImage,
  deleteImage,
  getAvailabilityForWeek,
  addAvailableSlot,
  removeAvailableSlot,
  addTemplateAvailability,
};
export default exportedFunctions;
