import http from "./http";

const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/user`;

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

const exportedFunctions = {
  signUp,
  generateClientAccesToken,
  refreshToken,
  login,
};

export default exportedFunctions;
