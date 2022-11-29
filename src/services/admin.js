import http from "./http";

const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/admin`;
const API_ENDPOINT_COUNTRIES_FAQ = API_ENDPOINT + "/country/faqs";
const API_ENDPOINT_COUNTRIES_SOS_CENTERS =
  API_ENDPOINT + "/country/sos-centers";
const API_ENDPOINT_COUNTRIES_ARTICLES = API_ENDPOINT + "/country/articles";

async function login(email, password) {
  const response = await http.post(`${API_ENDPOINT}/login`, {
    email: email,
    password: password,
  });
  return response;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("token-expires-in");
  localStorage.removeItem("refresh-token");
}

async function refreshToken(refreshToken) {
  const response = await http.post(`${API_ENDPOINT}/refresh-token`, {
    refreshToken,
  });
  return response;
}

/**
 *
 * @param {String} email -> the email of the admin
 * @returns
 */
async function generateForgotPasswordLink(email) {
  const response = await http.get(
    `${API_ENDPOINT}/rescue/forgot-password?email=${email}`
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

async function getData() {
  const response = await http.get(`${API_ENDPOINT}/`);
  return response;
}

async function updateData(payload) {
  const response = await http.put(`${API_ENDPOINT}/`, payload);
  return response;
}

/**
 *
 * @param {string} platform the platform of the faqs. Accepts: website, client, or provider.
 *
 * @returns {object} the object containing the data for the FAQS.
 */
async function getFAQs(platform) {
  const response = await http.get(
    `${API_ENDPOINT_COUNTRIES_FAQ}?platform=${platform}`
  );
  return response.data;
}

/**
 *
 * @param {string} platform the platform of the faqs. Accepts: website, client, or provider.
 * @param {string} id the id of the faq to be added.
 *
 * @returns {promise} the promise of the http request
 */
async function putFAQ(platform, id) {
  const response = await http.put(`${API_ENDPOINT_COUNTRIES_FAQ}`, {
    platform: platform,
    id: id,
  });
  return response;
}

/**
 
 * @param {string} platform the platform of the faqs. Accepts: website, client, or provider.
 * @param {string} id the id of the faq to be deleted.
 * 
 * @returns {promise} the promise of the http request
 */
async function deleteFAQ(platform, id) {
  const response = await http.delete(`${API_ENDPOINT_COUNTRIES_FAQ}`, {
    data: { platform: platform, id: id },
  });
  return response;
}
/**
 *
 * @returns {object} the object containing the data for the SOS Centers.
 *
 */
async function getSOSCenters() {
  const response = await http.get(`${API_ENDPOINT_COUNTRIES_SOS_CENTERS}`);
  return response.data;
}

/**
 *
 * @param {string} id the id of the SOS center to be added
 *
 * @returns {promise} the promise of the http request
 *
 */
async function putSOSCenters(id) {
  const response = await http.put(`${API_ENDPOINT_COUNTRIES_SOS_CENTERS}`, {
    id: id,
  });
  return response;
}

/**
 *
 * @param {string} id the id of the SOS center to be deleted
 *
 * @returns {promise} the promise of the http request
 *
 */
async function deleteSOSCenters(id) {
  const response = await http.delete(`${API_ENDPOINT_COUNTRIES_SOS_CENTERS}`, {
    data: { id: id },
  });
  return response;
}

/**
 *
 * @returns {object} the object containing the data for the articles.
 *
 */
async function getArticles() {
  const response = await http.get(`${API_ENDPOINT_COUNTRIES_ARTICLES}`);
  return response.data;
}

/**
 *
 * @param {string} id the id of the article to be added
 *
 * @returns {promise} the promise of the http request
 *
 */
async function putArticle(id) {
  const response = await http.put(`${API_ENDPOINT_COUNTRIES_ARTICLES}`, {
    id: id,
  });
  return response;
}

/**
 *
 * @param {string} id the id of the article to be deleted
 *
 * @returns {promise} the promise of the http request
 *
 */
async function deleteArticle(id) {
  const response = await http.delete(`${API_ENDPOINT_COUNTRIES_ARTICLES}`, {
    data: { id: id },
  });
  return response;
}

const exportedFunctions = {
  login,
  logout,
  refreshToken,
  generateForgotPasswordLink,
  resetPassword,
  getData,
  updateData,
  getFAQs,
  putFAQ,
  deleteFAQ,
  getSOSCenters,
  putSOSCenters,
  deleteSOSCenters,
  getArticles,
  putArticle,
  deleteArticle,
};

export default exportedFunctions;
