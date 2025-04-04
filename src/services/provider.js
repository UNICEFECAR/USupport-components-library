import http from "./http";
const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/provider`;

async function getProviderData(signal = new AbortController().signal) {
  const response = await http.get(`${API_ENDPOINT}/`, {
    signal: signal,
  });
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

async function changeImageAsAdmin(providerId, image) {
  const response = await http.put(`${API_ENDPOINT}/image/admin`, {
    providerId,
    image,
  });
  return response;
}

async function deleteImage() {
  const response = await http.delete(`${API_ENDPOINT}/image`);
  return response;
}

async function deleteImageAsAdmin(providerId, image) {
  const response = await http.delete(`${API_ENDPOINT}/image/admin`, {
    data: { providerId, image },
  });
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
 * @param {Number} startDate - start date in milliseconds in UTC
 * @returns {array} - array of timestamps is milliseconds in UTC
 */
async function getConsultationsForWeek(startDate) {
  const response = await http.get(
    `${API_ENDPOINT}/consultation/single-week?startDate=${startDate}`
  );
  return response;
}

/**
 *
 * @param {Number} startDate - start date timestamp in milliseconds in UTC
 * @param {Number} slot - slot timestamp in milliseconds in UTC
 * @param {String} campaignId - campaign id
 * @param {String} organizationId - organization id
 */
async function addAvailableSlot(startDate, slot, campaignId, organizationId) {
  const payload = {
    startDate: startDate.toString(),
    slot: slot.toString(),
    campaignId,
    organizationId,
  };
  if (!campaignId) delete payload.campaignId;
  const response = await http.put(
    `${API_ENDPOINT}/availability/single-week`,
    payload
  );
  return response;
}

/**
 *
 * @param {Number} startDate - start date timestamp in milliseconds in UTC
 * @param {Number} slot - slot timestamp in milliseconds in UTC
 * @param {String} campaignId - campaign id
 * @param {String} organizationId - organization id
 */
async function removeAvailableSlot(
  startDate,
  slot,
  campaignId,
  organizationId
) {
  const data = {
    startDate: startDate.toString(),
    slot: slot.toString(),
    campaignId,
    organizationId,
  };
  if (!campaignId) delete data.campaignId;

  const response = await http.delete(
    `${API_ENDPOINT}/availability/single-week`,
    {
      data,
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

async function getAllProviders({
  campaignId,
  limit = 5,
  offset,
  filtersQueryString,
  onlyAvailable = true,
}) {
  let query = `${API_ENDPOINT}/all?offset=${offset}&limit=${limit}&onlyAvailable=${
    onlyAvailable ? "true" : "false"
  }`;
  if (filtersQueryString) {
    query += `&${filtersQueryString}`;
  }
  if (campaignId) {
    query += `&campaignId=${campaignId}`;
  }
  const response = await http.get(query);
  return response;
}

async function getProviderById(
  id,
  campaignId,
  signal = new AbortController().signal
) {
  const response = await http.get(
    `${API_ENDPOINT}/by-id?providerId=${id}${
      campaignId ? `&campaignId=${campaignId}` : ""
    }`,
    {
      signal: signal,
    }
  );
  return response;
}

/**
 *
 * @param {number} startDate the timestamp of the start date of the week
 * @param {number} day the timestamp of the desired day
 * @param {String} providerId the id of the provider
 * @returns {Promise} resolving to an array with all the slots for the day
 */
async function getAvailableSlotsForSingleDay(
  startDate,
  day,
  providerId,
  campaignId
) {
  const response = await http.get(
    `${API_ENDPOINT}/availability/single-day?providerId=${providerId}&startDate=${startDate}&day=${day}${
      campaignId ? `&campaignId=${campaignId}` : ""
    }`
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
async function blockSlot(
  clientId,
  providerId,
  slotTimestamp,
  rescheduleCampaignSlot
) {
  const response = await http.post(`${API_ENDPOINT}/consultation/block`, {
    clientId,
    providerId,
    rescheduleCampaignSlot,
    time:
      typeof slotTimestamp === "object"
        ? {
            campaign_id: slotTimestamp.campaign_id,
            organization_id: slotTimestamp.organization_id,
            time: JSON.stringify(new Date(slotTimestamp.time).getTime() / 1000),
          }
        : JSON.stringify(slotTimestamp / 1000),
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

async function rescheduleConsultation(consultationId, newConsultationId) {
  const res = await http.post(`${API_ENDPOINT}/consultation/reschedule`, {
    consultationId,
    newConsultationId,
  });
  return res;
}

/**
 *
 * @param {string} consultationId
 *
 * @returns {Promise}
 */
async function suggestConsultation(consultationId) {
  const res = await http.put(`${API_ENDPOINT}/consultation/suggest`, {
    consultationId,
  });
  return res;
}

async function getAllClients() {
  const res = await http.get(`${API_ENDPOINT}/clients`);
  return res;
}

async function getAllConsultationsByClientId(clientId) {
  const res = await http.get(
    `${API_ENDPOINT}/consultation/all/past/by-id?clientId=${clientId}`
  );
  return res;
}

async function getAllUpcomingConsultations(pageNumber = 1) {
  const res = await http.get(
    `${API_ENDPOINT}/consultation/all/upcoming?pageNo=${pageNumber}`
  );
  return res;
}

async function getAllPastConsultations() {
  const res = await http.get(`${API_ENDPOINT}/consultation/all/past`);
  return res;
}

async function getConsultationsForSingleDay(day) {
  const res = await http.get(
    `${API_ENDPOINT}/consultation/single-day?date=${JSON.stringify(day)}`
  );
  return res;
}

async function getCalendarData(startDate) {
  const startDateString = JSON.stringify(startDate);
  const res = await http.get(
    `${API_ENDPOINT}/calendar/five-weeks?startDate=${startDateString}`
  );
  return res;
}

async function acceptConsultation(consultationId) {
  const res = await http.put(`${API_ENDPOINT}/consultation/accept-suggest`, {
    consultationId,
  });
  return res;
}

async function rejectConsultation(consultationId) {
  const res = await http.put(`${API_ENDPOINT}/consultation/reject-suggest`, {
    consultationId,
  });
  return res;
}

async function getConsultationsTime(consultationId) {
  const res = await http.get(
    `${API_ENDPOINT}/consultation/time?consultationId=${consultationId}`
  );
  return res;
}

async function getProviderByIdAsAdmin(id) {
  const res = await http.get(`${API_ENDPOINT}/by-id/admin?providerId=${id}`);
  return res;
}

async function updateProviderDataByIdAsAdmin(data) {
  const res = await http.put(`${API_ENDPOINT}/by-id/admin`, {
    ...data,
  });
  return res;
}

async function deleteProvider(password) {
  const res = await http.delete(`${API_ENDPOINT}/`, {
    data: { password },
  });
  return res;
}

async function deleteProviderByIdAsAdmin(id) {
  const res = await http.delete(`${API_ENDPOINT}/by-id/admin`, {
    data: {
      providerId: id,
    },
  });
  return res;
}

/**
 *
 * @param {String} consultationId the id of the consultation
 * @param {String} userType the type of the user - client or provider
 * @returns
 */
async function leaveConsultation(consultationId, userType) {
  const res = await http.put(`${API_ENDPOINT}/consultation/leave`, {
    consultationId,
    userType,
  });
  return res;
}

async function getProviderActivities() {
  const res = await http.get(`${API_ENDPOINT}/activities`);
  return res;
}

async function getRandomProviders(limit) {
  const res = await http.get(
    `${API_ENDPOINT}/random-providers?numberOfProviders=${Number(limit)}`
  );
  return res;
}

async function getCampaigns() {
  const res = await http.get(`${API_ENDPOINT}/campaigns`);
  return res;
}

async function enrollProviderInCampaign(campaignId) {
  const res = await http.post(`${API_ENDPOINT}/campaigns/enroll`, {
    campaignId,
  });
  return res;
}

async function removeMultipleAvailableSlots(
  startDate,
  slot,
  campaignIds,
  organizationId
) {
  const data = {
    startDate: startDate.toString(),
    slot: slot.toString(),
    campaignIds,
    organizationId,
  };
  const res = await http.delete(`${API_ENDPOINT}/availability/clear-slot`, {
    data,
  });
  return res;
}

async function getConsultationsForCampaign(campaignId) {
  const res = await http.get(
    `${API_ENDPOINT}/campaigns/consultations?campaignId=${campaignId}`
  );
  return res;
}

async function getProviderStatusById(providerId) {
  const res = await http.get(`${API_ENDPOINT}/status?providerId=${providerId}`);
  return res;
}

async function getQuestions(type, languageId) {
  const res = await http.get(
    `${API_ENDPOINT}/my-qa/questions?type=${type}&languageId=${languageId}`
  );
  return res;
}

async function getQuestionTags() {
  const res = await http.get(`${API_ENDPOINT}/my-qa/tags`);
  return res;
}

async function addAnswerToQuestion(data) {
  const res = await http.post(`${API_ENDPOINT}/my-qa/create-answer`, data);
  return res;
}

async function archiveQuestion(data) {
  const res = await http.post(`${API_ENDPOINT}/my-qa/archive-question`, data);
  return res;
}

async function addPlatformRating(payload) {
  const response = await http.post(`${API_ENDPOINT}/add-rating`, payload);
  return response;
}

async function joinConsultation(payload) {
  const response = await http.put(`${API_ENDPOINT}/consultation/join`, payload);
  return response;
}

const exportedFunctions = {
  addAvailableSlot,
  addTemplateAvailability,
  blockSlot,
  cancelConsultation,
  changeImage,
  deleteImage,
  getAllClients,
  getAllConsultationsByClientId,
  getAllUpcomingConsultations,
  getAllPastConsultations,
  getAllProviders,
  getAvailabilityForWeek,
  getAvailableSlotsForSingleDay,
  getConsultationsForSingleDay,
  getConsultationsForWeek,
  getProviderById,
  getProviderByIdAsAdmin,
  getProviderData,
  getCalendarData,
  removeAvailableSlot,
  rescheduleConsultation,
  scheduleConsultation,
  suggestConsultation,
  updateProviderData,
  acceptConsultation,
  rejectConsultation,
  getConsultationsTime,
  updateProviderDataByIdAsAdmin,
  changeImageAsAdmin,
  deleteImageAsAdmin,
  deleteProvider,
  deleteProviderByIdAsAdmin,
  leaveConsultation,
  getProviderActivities,
  getRandomProviders,
  getCampaigns,
  enrollProviderInCampaign,
  removeMultipleAvailableSlots,
  getConsultationsForCampaign,
  getProviderStatusById,
  getQuestions,
  getQuestionTags,
  addAnswerToQuestion,
  archiveQuestion,
  addPlatformRating,
  joinConsultation,
};
export default exportedFunctions;
