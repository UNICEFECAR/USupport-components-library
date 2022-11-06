import http from "./http";

const CMS_API_URL = `${import.meta.env.VITE_CMS_API_URL}`;

const articlesEndpoint = CMS_API_URL + "/articles";
const ageGroupsEndpoint = CMS_API_URL + "/age-groups";
const categoriesEndpoint = CMS_API_URL + "/categories";
const policiesEndpoint = CMS_API_URL + "/privacy-policies";
const faqsEndpoint = CMS_API_URL + "/faqs";
const sosCentersEndpoint = CMS_API_URL + "/sos-centers";

/**
 * generate a querry string from an object
 *
 * @param {object} queryObj - the object to generate the querry string from
 * @param {string} queryObj.limit  - the number of documents to return
 * @param {number} queryObj.populate - whether to populate the data fully or not
 * @param {number} queryObj.startFrom - the starting index of the document to return
 * @param {string} queryObj.contains - the string to search for in the document title
 * @param {string} queryObj.ageGroupId - the age group id to filter by
 * @param {string} queryObj.categoryId - the category id to filter by
 * @param {string} queryObj.locale - the locale to filter by
 * @param {string} queryObj.sortBy - the field to sort by
 * @param {string} queryObj.sortOrder - the order to sort by, possible values are "asc" and "desc"
 * @param {string} queryObj.excludeId - the id to exclude from the results
 * @param {string} queryObj.countryAlpha2 - the country alpha2 code to filter by
 *
 */
function generateQuerryString(queryObj) {
  let querry = `?locale=${queryObj.locale}`;

  if (queryObj.populate) {
    querry += "&populate=*";
  }

  if (queryObj.limit) {
    querry += `&pagination[limit]=${queryObj.limit}`;
  }

  if (queryObj.startFrom) {
    querry += `&pagination[start]=${queryObj.startFrom}`;
  }

  if (queryObj.contains && queryObj.contains !== "") {
    querry += `&filters[title][$containsi]=${queryObj.contains}`;
  }

  if (queryObj.ageGroupId) {
    querry += `&filters[age_groups][id][$in]=${queryObj.ageGroupId}`;
  }

  if (queryObj.categoryId) {
    querry += `&filters[category][id][$in]=${queryObj.categoryId}`;
  }

  if (queryObj.sortBy && queryObj.sortOrder) {
    querry += `&sort[0]=${queryObj.sortBy}%3A${queryObj.sortOrder}`;
  }

  if (queryObj.excludeId) {
    querry += `&filters[id][$notIn]=${queryObj.excludeId}`;
  }

  //This was added for the policies
  if (queryObj.countryAlpha2) {
    querry += `&filters[country][$in]=${queryObj.countryAlpha2}`;
  }

  if (queryObj.global) {
    querry += `&filters[global][$in]=${queryObj.global}`;
  }

  return querry;
}

/**
 * send request to get multiple articles
 *
 * @param {object} queryObj - the object to generate the querry string from
 * @param {string} queryObj.limit  - the number of documents to return
 * @param {number} queryObj.populate - whether to populate the data fully or not
 * @param {number} queryObj.startFrom - the starting index of the document to return
 * @param {string} queryObj.contains - the string to search for in the document title
 * @param {string} queryObj.ageGroupId - the age group id to filter by
 * @param {string} queryObj.categoryId - the category id to filter by
 * @param {string} queryObj.locale - the locale to filter by
 * @param {string} queryObj.sortBy - the field to sort by
 * @param {string} queryObj.sortOrder - the order to sort by, possible values are "asc" and "desc"
 * @param {string} queryObj.excludeId - the id to exclude from the results
 *
 */

async function getArticles(queryObj) {
  const querryString = generateQuerryString(queryObj);

  const { data } = await http.get(`${articlesEndpoint}${querryString}`);

  return data;
}

/**
 * send request to get data for a specific article by id
 *
 * @param {string} id - the id of the article
 * @param {string} locale - the locale for which to retrieve articles
 *
 * @returns {object} the article data
 */
async function getArticleById(id, locale) {
  const querryString = generateQuerryString({ locale: locale, populate: true });

  try {
    // Increment read count for the given article id
    await addArticleReadCount(id);
  } catch (error) {}

  const { data } = await http.get(`${articlesEndpoint}/${id}?${querryString}`);

  return data;
}

/**
 * send request to get the newest articles
 *
 * @param {string} limit - the number of articles to return
 * @param {string} locale - the locale for which to retrieve articles
 *
 * @returns {object} the articles data
 */
async function getNewestArticles(limit, locale) {
  const querryString = generateQuerryString({
    limit: limit,
    locale: locale,
    sortBy: "createdAt",
    sortOrder: "desc",
    populate: true,
  });

  const { data } = await http.get(`${articlesEndpoint}${querryString}`);

  return data;
}

/**
 * send request to get the most read articles
 *
 * @param {string} limit - the number of articles to return
 * @param {string} locale - the locale for which to retrieve articles
 *
 * @returns {object} the articles data
 */
async function getMostReadArticles(limit, locale) {
  const querryString = generateQuerryString({
    limit: limit,
    locale: locale,
    sortBy: "read_count",
    sortOrder: "desc",
    populate: true,
  });

  const { data } = await http.get(`${articlesEndpoint}${querryString}`);

  return data;
}

/**
 * send request to get the similar articles
 *
 * @param {string} limit - the number of articles to return
 * @param {string} categoryId - the caterogy id for which to search articles
 * @param {string} articleIdToExclude - the id of the article to not be included
 * @param {string} locale - the locale for which to retrieve articles
 *
 * @returns {object} the articles data
 */
async function getSimilarArticles(limit, categoryId, excludeId, locale) {
  const querryString = generateQuerryString({
    limit: limit,
    categoryId: categoryId,
    locale: locale,
    excludeId: excludeId,
    populate: true,
  });

  const { data } = await http.get(`${articlesEndpoint}${querryString}`);

  return data;
}

/**
 * send request to get all the categories
 *
 * @param {string} locale - the locale for which to retrieve categories
 *
 * @returns {object} the categories data
 */

async function getCategories(locale) {
  const querryString = generateQuerryString({
    locale: locale,
  });

  const { data } = await http.get(`${categoriesEndpoint}${querryString}`);
  return data;
}

/**
 * send request to get all ageGroups
 *
 * @param {string} locale - the locale for which to retrieve ageGroups
 *
 * @returns {object} the ageGroups data
 */
async function getAgeGroups(locale) {
  const querryString = generateQuerryString({
    locale: locale,
  });
  const { data } = await http.get(`${ageGroupsEndpoint}${querryString}`);
  return data;
}

//--------------------- PUT Requests ---------------------//;
/**
 * send request toincrement article count
 *
 * @param {string} id - the id of the article
 *
 * @returns {object} the ageGroups data
 */
async function addArticleReadCount(id) {
  console.log("made a request");
  return http.put(`${articlesEndpoint}/addReadCount/${id}`);
}

//--------------------- Policies ---------------------//;
/**
 * send request to get privacy policies
 * @param {string} locale - the locale for which to retrieve policies
 * @returns {string} countryAlpha2 - the country 2 characters ISO-3166 code for which to retrieve policies
 * @returns {string} uiInterface - the uiInterface for which to retrieve policies e.g website, client or provider
 * @returns {object} the policies data
 *
 */
async function getPolicies(locale, countryAlpha2, uiInterface) {
  const querryString = generateQuerryString({
    locale: locale,
    countryAlpha2: countryAlpha2,
  });
  let { data } = await http.get(`${policiesEndpoint}${querryString}`);

  let newData = null;

  if (data.data.length > 0) {
    newData = data.data[0].attributes[uiInterface];
  }

  data.data = newData;

  return data;
}

//--------------------- FAQs ---------------------//;
/**
 * send request to get FAQs
 *
 * @param {string} locale - the locale for which to retrieve policies
 * @returns {boolean} global - the global status for which to retrieve policies e.g true or false
 * @returns {object} the policies data
 *
 */
async function getFAQs(locale, global) {
  const querryString = generateQuerryString({
    locale: locale,
    global: global,
  });

  let { data } = await http.get(`${faqsEndpoint}${querryString}`);
  let newData = null;
  if (data.data.length > 0) {
    newData = [];
    data.data.map((faq) => {
      newData.push({
        question: faq.attributes.question,
        answer: faq.attributes.answer,
      });
    });
  }

  data.data = newData;

  return data;
}

//--------------------- SOS Centers ---------------------//;
/**
 * send request to get SOS Centers
 *
 * @param {string} locale - the locale for which to retrieve SOS centers
 * @returns {boolean} global - the global status for which to retrieve SOS centers e.g true or false
 * @returns {object} the policies data
 *
 */
async function getSOSCenters(locale, global) {
  const querryString = generateQuerryString({
    locale: locale,
    global: global,
  });

  let { data } = await http.get(`${sosCentersEndpoint}${querryString}`);
  let newData = null;
  if (data.data.length > 0) {
    newData = [];
    data.data.map((faq) => {
      newData.push({
        title: faq.attributes.title,
        text: faq.attributes.text,
        link: faq.attributes.link,
        phone: faq.attributes.phone,
      });
    });
  }

  data.data = newData;

  return data;
}

export default {
  getArticles,
  getArticleById,
  getNewestArticles,
  getMostReadArticles,
  getSimilarArticles,
  getCategories,
  getAgeGroups,
  addArticleReadCount,
  getPolicies,
  getFAQs,
  getSOSCenters,
};
