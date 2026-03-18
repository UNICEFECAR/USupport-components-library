import http from "./http";

const API_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/v1/user`;

async function getActiveCountries() {
  const response = await http.get(`${API_ENDPOINT}/countries`);
  return response;
}

async function getActiveCountriesWithLanguages() {
  const response = await http.get(`${API_ENDPOINT}/countries-with-languages`);
  return response;
}

async function getActiveCountriesArticles() {
  const response = await http.get(`${API_ENDPOINT}/countries/articles/active`);
  return response;
}

const exportedFunctions = {
  getActiveCountries,
  getActiveCountriesWithLanguages,
  getActiveCountriesArticles,
};

export default exportedFunctions;
