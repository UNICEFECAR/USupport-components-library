import axios from "axios";
import jwtDecode from "jwt-decode";
import { log } from "./log";
const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/user`;
const VITE_CMS_API_URL = import.meta.env.VITE_CMS_API_URL;
const VITE_WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL;

// On every request add the JWT token, language and country to the headers
axios.interceptors.request.use((config) => {
  config.headers["x-country-alpha-2"] = localStorage.getItem("country") || "";
  config.headers["x-language-alpha-2"] = localStorage.getItem("language") || "";
  config.headers["Referrer-Policy"] = "no-referrer";

  const requestURI = axios.getUri(config) || "VITE CMS API URL";

  if (!requestURI.includes(VITE_CMS_API_URL)) {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

const interceptError = async (error) => {
  if (error?.response?.status === 401) {
    if (error.response?.data.error.name === "REFRESH TOKEN NOT VALID") {
      localStorage.removeItem("token");
      localStorage.removeItem("token-expires-in");
      localStorage.removeItem("refresh-token");

      const platform = window.location.pathname.split("/")[1];
      window.location.replace(`/${platform}/`);
      return Promise.reject(error);
    }

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded.exp * 1000;

    if (isTokenExpired) {
      const refreshToken = localStorage.getItem("refresh-token");
      const res = await axios.post(`${API_ENDPOINT}/refresh-token`, {
        refreshToken,
      });

      const {
        token: newToken,
        expiresIn,
        refreshToken: newRefreshToken,
      } = res.data;

      // Set the new token and refresh token in the local storage
      localStorage.setItem("token", newToken);
      localStorage.setItem("token-expires-in", expiresIn);
      localStorage.setItem("refresh-token", newRefreshToken);

      error.config.headers = {}; // Clear the headers
      return axios.request(error.config); // Resend the original request
    }
  }

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    log(error);
  }

  return Promise.reject(error);
};

// handle unexpected errors received from the api
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => interceptError(error)
);

const exportedFunctions = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default exportedFunctions;
