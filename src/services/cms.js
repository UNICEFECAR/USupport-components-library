import http from "./http";

const CMS_API_URL = `${import.meta.env.VITE_CMS_API_URL}`;

const articlesEndpoint = CMS_API_URL + "/articles";
const ageGroupsEndpoint = CMS_API_URL + "/age-groups";
const categoriesEndpoint = CMS_API_URL + "/categories";

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

export default {
  getArticles,
  getArticleById,
  getNewestArticles,
  getMostReadArticles,
  getSimilarArticles,
  getCategories,
  getAgeGroups,
  addArticleReadCount,
};
