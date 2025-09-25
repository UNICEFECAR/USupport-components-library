import http from "./http";

const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/admin`;
const API_ENDPOINT_COUNTRIES_FAQ = API_ENDPOINT + "/country/faqs";
const API_ENDPOINT_COUNTRIES_SOS_CENTERS =
  API_ENDPOINT + "/country/sos-centers";
const API_ENDPOINT_COUNTRIES_ARTICLES = API_ENDPOINT + "/country/articles";
const API_ENDPOINT_COUNTRIES_VIDEOS = API_ENDPOINT + "/country/videos";
const API_ENDPOINT_COUNTRIES_PODCASTS = API_ENDPOINT + "/country/podcasts";
const API_ENDPOINT_BASELINE_ASSESSMENT = API_ENDPOINT + "/baseline-assessment";

async function createAdmin(payload) {
  const response = await http.post(`${API_ENDPOINT}/signup`, payload);
  return response;
}

async function deleteAdminById(id) {
  const response = await http.delete(`${API_ENDPOINT}/by-id`, {
    data: { adminId: id },
  });
  return response;
}

async function requestOTP(email, password, role) {
  const response = await http.post(`${API_ENDPOINT}/2fa`, {
    email: email.toLowerCase(),
    password,
    role,
  });
  return response;
}

async function login(email, password, role, otp) {
  const response = await http.post(`${API_ENDPOINT}/login`, {
    email: email.toLowerCase(),
    password: password,
    role,
    otp,
  });
  return response;
}

async function logoutRequest() {
  const token = localStorage.getItem("token");
  try {
    const response = await http.post(
      `${API_ENDPOINT}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (e) {
    console.log("Error logging out", e);
  }
}

function logout() {
  logoutRequest();
  localStorage.removeItem("token");
  localStorage.removeItem("token-expires-in");
  localStorage.removeItem("refresh-token");
  localStorage.removeItem("usupport_lot");
  window.dispatchEvent(new Event("logout"));
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
async function generateForgotPasswordLink(email, role) {
  const response = await http.post(
    `${API_ENDPOINT}/rescue/forgot-password-link`,
    {
      email,
      role,
    }
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

async function getDataById(id) {
  const response = await http.get(`${API_ENDPOINT}/by-id?adminId=${id}`);
  return response;
}

async function updateData(payload) {
  const response = await http.put(`${API_ENDPOINT}/`, payload);
  return response;
}

async function updateDataById(id, payload) {
  const response = await http.put(
    `${API_ENDPOINT}/by-id?adminId=${id}`,
    payload
  );
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

async function getAllGlobalAdmins() {
  const response = await http.get(`${API_ENDPOINT}/all?type=global`);
  return response;
}

async function getAllCountryAdminsByCountry(countryId) {
  const response = await http.get(
    `${API_ENDPOINT}/all?type=country&countryId=${countryId}`
  );
  return response;
}

async function getGlobalStatistics() {
  const response = await http.get(`${API_ENDPOINT}/statistics/global`);
  return response;
}

async function getCountryStatistics(countryId) {
  const response = await http.get(
    `${API_ENDPOINT}/statistics/country?countryId=${countryId}`
  );
  return response;
}

async function getSecurityChecks() {
  const response = await http.get(`${API_ENDPOINT}/statistics/security-check`);
  return response;
}

async function getInformationPortalSuggestions(countryId) {
  const response = await http.get(
    `${API_ENDPOINT}/statistics/information-portal-suggestions?countryId=${countryId}`
  );
  return response;
}

async function getPlatformSuggestions(type) {
  const response = await http.get(
    `${API_ENDPOINT}/statistics/platform-suggestions?type=${type}`
  );
  return response;
}

async function getClientRatings(countryId) {
  const response = await http.get(
    `${API_ENDPOINT}/statistics/client-ratings?countryId=${countryId}`
  );
  return response;
}
async function getProviderRatings(countryId) {
  const response = await http.get(
    `${API_ENDPOINT}/statistics/provider-ratings?countryId=${countryId}`
  );
  return response;
}

async function getContactForms() {
  const response = await http.get(`${API_ENDPOINT}/statistics/contact-forms`);
  return response;
}

async function getProviderActivitiesById(providerId) {
  const response = await http.get(
    `${API_ENDPOINT}/statistics/provider-activities?providerId=${providerId}`
  );
  return response;
}

async function generateProviderFreeSlotsReport(payload) {
  const { startDate, endDate } = payload || {};

  // Build query params if dates are provided
  const queryParams = new URLSearchParams();
  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);

  const requestUrl = `${API_ENDPOINT}/statistics/providers/availability/report${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  const response = await http.get(requestUrl, {
    responseType: "blob",
  });

  // Create a blob URL and trigger download
  const blob = new Blob([response.data], { type: "text/csv" });
  const downloadUrl = window.URL.createObjectURL(blob);

  // Extract filename from response headers or create a default one
  const contentDisposition = response.headers["content-disposition"];
  let filename = "provider-availability-report.csv";

  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
    if (filenameMatch) {
      filename = filenameMatch[1];
    }
  }

  // Create download link and trigger download
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);

  return { success: true, message: "Report downloaded successfully" };
}

async function getAllSponsorsData() {
  const response = await http.get(`${API_ENDPOINT}/sponsor`);
  return response;
}

async function getSponsorDataById(sponsorId) {
  const response = await http.get(
    `${API_ENDPOINT}/sponsor/by-id?sponsorId=${sponsorId}`
  );
  return response;
}

async function addSponsor(payload) {
  const response = await http.post(`${API_ENDPOINT}/sponsor`, payload);
  return response;
}

async function updateSponsor(payload) {
  const response = await http.put(`${API_ENDPOINT}/sponsor`, payload);
  return response;
}

async function createCampaignForSponsor(payload) {
  const response = await http.post(
    `${API_ENDPOINT}/sponsor/create-campaign`,
    payload
  );
  return response;
}

async function getCouponsData(campaignId) {
  const response = await http.get(
    `${API_ENDPOINT}/sponsor/coupons-data?campaignId=${campaignId}`
  );
  return response;
}

async function updateCampaignData(payload) {
  const response = await http.put(
    `${API_ENDPOINT}/sponsor/update-campaign`,
    payload
  );
  return response;
}

async function getCampaignDataById(campaignId) {
  const response = await http.get(
    `${API_ENDPOINT}/sponsor/campaign/by-id?campaignId=${campaignId}`
  );
  return response;
}

async function getAllProviders(
  limit = 15,
  pageParam,
  filters,
  sort,
  search = ""
) {
  let filetrsQuery = "";
  if (filters) {
    Object.keys(filters).forEach((key) => {
      if (filters[key] || key === "free") {
        filetrsQuery += `&${key}=${filters[key]}`;
      }
    });
  }

  if (search) {
    filetrsQuery += `&search=${search}`;
  }
  if (sort) {
    Object.keys(sort).forEach((key) => {
      if (sort[key]) {
        filetrsQuery += `&sort_${key}=${sort[key]}`;
      }
    });
  }
  const response = await http.get(
    `${API_ENDPOINT}/all-providers?limit=${limit}&offset=${pageParam}${filetrsQuery}`
  );
  return response;
}

async function updateProviderStatus(payload) {
  const response = await http.put(
    `${API_ENDPOINT}/update-provider-status`,
    payload
  );
  return response;
}

async function getArchivedQuestions() {
  const response = await http.get(`${API_ENDPOINT}/my-qa/archived`);
  return response;
}

async function activateQuestion(questionId) {
  const response = await http.put(`${API_ENDPOINT}/my-qa/activate-question`, {
    questionId,
  });
  return response;
}

async function deleteQuestion(questionId) {
  const response = await http.put(`${API_ENDPOINT}/my-qa/delete-question`, {
    questionId,
  });
  return response;
}

async function getQuestions(type, languageId) {
  const response = await http.get(
    `${API_ENDPOINT}/my-qa/questions?type=${type}&languageId=${languageId}`
  );
  return response;
}

async function changePassword(payload) {
  const response = await http.patch(`${API_ENDPOINT}/password`, payload);
  return response;
}

async function getAllProviderNames() {
  const response = await http.get(`${API_ENDPOINT}/all-provider-names`);
  return response;
}

/**
 *
 * @returns {object} the object containing the data for the videos.
 *
 */
async function getVideos() {
  const response = await http.get(`${API_ENDPOINT_COUNTRIES_VIDEOS}`);
  return response.data;
}

/**
 *
 * @param {string} id the id of the video to be added
 *
 * @returns {promise} the promise of the http request
 *
 */
async function putVideo(id) {
  const response = await http.put(`${API_ENDPOINT_COUNTRIES_VIDEOS}`, {
    id: id,
  });
  return response;
}

/**
 *
 * @param {string} id the id of the video to be deleted
 *
 * @returns {promise} the promise of the http request
 *
 */
async function deleteVideo(id) {
  const response = await http.delete(`${API_ENDPOINT_COUNTRIES_VIDEOS}`, {
    data: { id: id },
  });
  return response;
}

async function getPodcasts() {
  const response = await http.get(`${API_ENDPOINT_COUNTRIES_PODCASTS}`);
  return response.data;
}

async function putPodcast(id) {
  const response = await http.put(`${API_ENDPOINT_COUNTRIES_PODCASTS}`, {
    id: id,
  });
  return response;
}

async function deletePodcast(id) {
  const response = await http.delete(`${API_ENDPOINT_COUNTRIES_PODCASTS}`, {
    data: { id: id },
  });
  return response;
}

async function getPlatformMetrics({ startDate, endDate }) {
  const startDateTimestamp = JSON.stringify(
    new Date(new Date(startDate).setHours(0, 0, 0, 0)).getTime() / 1000
  );

  const endDateTimestamp = JSON.stringify(
    new Date(new Date(endDate).setHours(23, 59, 59)).getTime() / 1000
  );

  const params = new URLSearchParams();
  if (startDate) params.append("startDate", startDateTimestamp);
  if (endDate) params.append("endDate", endDateTimestamp);

  const response = await http.get(
    `${API_ENDPOINT}/platform-metrics?${params.toString()}`
  );
  return response;
}

/**
 * Get SOS center click statistics
 * @returns {Promise} the promise of the http request
 */
async function getSOSCenterClicks() {
  const response = await http.get(
    `${API_ENDPOINT}/statistics/sos-center-clicks`
  );
  return response;
}

/**
 * Update content type active status for a country
 * @param {Object} payload
 * @param {string} payload.contentType - The content type (videos or podcasts)
 * @param {string} payload.status - The status (enabled or disabled)
 * @returns {Promise} the promise of the http request
 */
async function updateContentActiveStatus(payload) {
  const response = await http.put(
    `${API_ENDPOINT}/content-active-status`,
    payload
  );
  return response;
}

/**
 * Get all baseline assessment thresholds for a country
 * @returns {Promise} the promise of the http request
 */
async function getAllBaselineAssessmentThresholds() {
  const response = await http.get(API_ENDPOINT_BASELINE_ASSESSMENT);
  return response;
}

/**
 * Update baseline assessment threshold by ID
 * @param {string} id - The threshold ID to update
 * @param {Object} payload - The threshold data to update
 * @returns {Promise} the promise of the http request
 */
async function updateBaselineAssessmentThreshold(id, payload) {
  const response = await http.put(
    `${API_ENDPOINT_BASELINE_ASSESSMENT}/${id}`,
    payload
  );
  return response;
}

/**
 * Get baseline assessment analysis with median calculations
 * @returns {Promise} the promise of the http request
 */
async function getBaselineAssessmentAnalysis(params = {}) {
  const queryParams = new URLSearchParams();

  if (params.startDate) {
    queryParams.append("startDate", params.startDate);
  }

  if (params.endDate) {
    queryParams.append("endDate", params.endDate);
  }

  const queryString = queryParams.toString();

  const response = await http.get(
    `${API_ENDPOINT_BASELINE_ASSESSMENT}/analysis${
      queryString ? `?${queryString}` : ""
    }`
  );
  return response;
}

const exportedFunctions = {
  createAdmin,
  deleteArticle,
  deleteAdminById,
  deleteFAQ,
  deleteSOSCenters,
  deleteVideo,
  generateForgotPasswordLink,
  getAllGlobalAdmins,
  getAllCountryAdminsByCountry,
  getGlobalStatistics,
  getCountryStatistics,
  getArticles,
  getData,
  getDataById,
  getFAQs,
  getSOSCenters,
  getVideos,
  requestOTP,
  login,
  logout,
  putArticle,
  putFAQ,
  putSOSCenters,
  putVideo,
  refreshToken,
  resetPassword,
  updateData,
  updateDataById,
  getSecurityChecks,
  getInformationPortalSuggestions,
  getPlatformSuggestions,
  getClientRatings,
  getContactForms,
  getProviderActivitiesById,
  getAllSponsorsData,
  getSponsorDataById,
  addSponsor,
  updateSponsor,
  createCampaignForSponsor,
  getCouponsData,
  updateCampaignData,
  getCampaignDataById,
  getAllProviders,
  updateProviderStatus,
  getArchivedQuestions,
  activateQuestion,
  deleteQuestion,
  getQuestions,
  changePassword,
  getProviderRatings,
  getAllProviderNames,
  getPodcasts,
  putPodcast,
  deletePodcast,
  getPlatformMetrics,
  getSOSCenterClicks,
  updateContentActiveStatus,
  getAllBaselineAssessmentThresholds,
  updateBaselineAssessmentThreshold,
  getBaselineAssessmentAnalysis,
  generateProviderFreeSlotsReport,
};

export default exportedFunctions;
