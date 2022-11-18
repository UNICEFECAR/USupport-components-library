import http from "./http";
import jwtDecode from "jwt-decode";
const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/user`;

function getUserID() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded.sub;
}

function logout(platform = "client") {
  localStorage.removeItem("token");
  localStorage.removeItem("token-expires-in");
  localStorage.removeItem("refresh-token");

  window.location.replace(`/${platform}/`);
}

/**
 *
 * @param {string} userType the type of user - either "client" or "provider"
 * @param {string} countryId the id of the country
 * @param {string} password the password of the user
 * @param {string} clientData the data of the client
 * @param {string} providerData the data of the provider
 *
 * @returns {promise} the promise of the http request
 */
async function signUp({
  userType,
  countryID,
  password,
  clientData = {},
  providerData = {},
}) {
  const data = {
    userType,
    countryID,
    password,
  };

  if (userType === "client") {
    data.clientData = clientData;
  } else if (userType === "provider") {
    data.providerData = providerData;
  }

  const response = await http.post(`${API_ENDPOINT}/signup`, data);
  return response;
}

async function generateClientAccesToken() {
  const response = await http.get(`${API_ENDPOINT}/user-access-token`);
  return response;
}

async function refreshToken(refreshToken) {
  const response = await http.post(`${API_ENDPOINT}/refresh-token`, {
    refreshToken,
  });
  return response;
}

async function login({ userType, email, password, userAccessToken, location }) {
  const payload = { userType, password };
  if (userAccessToken) {
    payload.userAccessToken = userAccessToken;
  } else {
    payload.email = email;
  }
  const headers = { "x-location": location };
  const response = await http.post(`${API_ENDPOINT}/login`, payload, {
    headers,
  });
  return response;
}

async function tmpLogin() {
  const response = await http.post(`${API_ENDPOINT}/tmp-login`);
  return response;
}

async function changePassword({ oldPassword, newPassword }) {
  const response = await http.patch(`${API_ENDPOINT}/password`, {
    oldPassword,
    newPassword,
  });
  return response;
}

async function uploadFile(content) {
  const response = await http.post(`${API_ENDPOINT}/upload-file`, content, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
}

async function getNotificationPreferences() {
  const response = await http.get(`${API_ENDPOINT}/notification-preferences`);
  return response;
}
/**
 * 
 * @param {Object} data
 * @param {boolean} data.email
 * @param {boolean} data.consultationReminder
 * @param {Number} data.consultationReminderTime
 * @param {boolean} data.inPlatform
 * @param {boolean} data.push 
 
 * @returns 
 */
async function updateNotificationPreferences(data) {
  const response = await http.put(`${API_ENDPOINT}/notification-preferences`, {
    ...data,
  });
  return response;
}
/**
 *
 * @param {String} email -> the email of the user
 * @param {*} userType -> the type of the user "client" or "provider"
 * @returns
 */
async function generateForgotPasswordLink(email, userType) {
  const response = await http.get(
    `${API_ENDPOINT}/rescue/forgot-password?email=${email}&type=${userType}`
  );
  return response;
}

async function resetPassword(password, token) {
  const response = await http.post(`${API_ENDPOINT}/rescue/forgot-password`, {
    token,
    password,
  });
  return response;
}

async function getWorkWithCategories() {
  const response = await http.get(`${API_ENDPOINT}/work-with`);
  return response;
}

const exportedFunctions = {
  changePassword,
  generateClientAccesToken,
  generateForgotPasswordLink,
  getNotificationPreferences,
  getUserID,
  getWorkWithCategories,
  login,
  logout,
  refreshToken,
  resetPassword,
  signUp,
  tmpLogin,
  updateNotificationPreferences,
  uploadFile,
};

export default exportedFunctions;
