import http from "./http";
const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/notifications`;

/**
 *
 * @param {Number} pageNumber
 * @returns
 */
async function getNotifications(pageNumber = 1) {
  const response = await http.get(`${API_ENDPOINT}/user?pageNo=${pageNumber}`);
  return response;
}

async function checkHasUnreadNotifications() {
  const response = await http.get(`${API_ENDPOINT}/user-has-unread`);
  return response;
}

/**
 *
 * @param {Array} notificationIds
 * @returns {Promise}
 */
async function markNotificationsAsRead(notificationIds) {
  const response = await http.put(`${API_ENDPOINT}/is-read`, {
    notificationIds,
  });
  return response;
}

async function markAllNotificationsAsRead() {
  const response = await http.put(`${API_ENDPOINT}/read-all`);
  return response;
}

const exportedFunctions = {
  getNotifications,
  checkHasUnreadNotifications,
  markNotificationsAsRead,
  markAllNotificationsAsRead,
};

export default exportedFunctions;
