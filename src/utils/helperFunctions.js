import { getLanguageFromUrl } from "./replaceLanguageInUrl";
import { createArticleSlug } from "./articles";

/**
 * @description - Marks CMS admin rows selected when id (or localization id) overlaps CMS `localizedIds`,
 * optionally expanding overlap using full locale clusters from meta `availableLocales`.
 *
 * @param {object[]} data - Strapi REST rows (`id` + `attributes`)
 * @param {array} selectedIds - localized id list from CMS meta for the requested locale
 * @param {Record<string, Record<string, unknown>>} [availableLocales] - meta from computeAvailableLocales keyed by queried id → { locale → id }
 * @returns {object[]} mutated `data` (sorted by publishedAt)
 */
function filterAdminData(data, selectedIds, availableLocales) {
  const baseIds = Array.isArray(selectedIds)
    ? selectedIds.map((x) => String(x).trim()).filter(Boolean)
    : [];
  const expandedIds = new Set(baseIds);

  if (availableLocales && typeof availableLocales === "object") {
    let grew = true;
    while (grew) {
      grew = false;
      const sizeBefore = expandedIds.size;
      for (const localeMap of Object.values(availableLocales)) {
        if (!localeMap || typeof localeMap !== "object") continue;
        const clusterIds = Object.values(localeMap)
          .filter((v) => v != null && v !== "")
          .map((v) => String(v).trim())
          .filter(Boolean);
        if (!clusterIds.length) continue;
        const overlaps = clusterIds.some((cid) => expandedIds.has(cid));
        if (overlaps) {
          clusterIds.forEach((cid) => expandedIds.add(cid));
        }
      }
      grew = expandedIds.size > sizeBefore;
    }
  }

  for (let i = 0; i < data.length; i++) {
    const currentData = data[i];
    const currentDataId = currentData.id;
    const isSlected = expandedIds.has(String(currentDataId));
    const isAnotherLocaleSelected =
      currentData.attributes.localizations?.data?.some((localization) =>
        expandedIds.has(String(localization.id)),
      );
    if (isSlected || isAnotherLocaleSelected) {
      currentData.isSelected = true;
    }
  }

  data.sort(function (a, b) {
    return (
      new Date(b.attributes.publishedAt) - new Date(a.attributes.publishedAt)
    );
  });

  return data;
}

const downloadCSVFile = (data, fileName) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const countriesMap = {
  global: "global",
  kz: "kazakhstan",
  pl: "poland",
  ro: "romania",
  am: "armenia",
  ps: "playandheal",
  cy: "cyprus",
};

const getCountryLabelFromAlpha2 = (alpha2) => {
  return countriesMap[alpha2.toLocaleLowerCase()];
};

const getCountryFromSubdomain = () => {
  const subdomain = window.location.hostname.split(".")[0];
  if (subdomain === "usupport") {
    return "global";
  } else {
    // the subdomain is value from countriesMap
    const countryAlpha2 = Object.keys(countriesMap).find(
      (key) => countriesMap[key] === subdomain
    );
    return countryAlpha2?.toLocaleUpperCase() || "global";
  }
};

// If the user is on the main domain(usupport.online), but they have a country in their local storage,
// different than `global`, we redirect them to the country subdomain.
// If they don't have a country in their local storage, we redirect them to the Welcome page to choose a country
const redirectToLocalStorageCountry = (renderIn) => {
  const localStorageCountry = localStorage.getItem("country");
  const localStorageLanguage = localStorage.getItem("language");
  const language = getLanguageFromUrl() || localStorageLanguage || "en";

  if (localStorageCountry && localStorageCountry !== "global") {
    const countryLabel = getCountryLabelFromAlpha2(localStorageCountry);
    if (countryLabel) {
      window.location.href = window.location.href.replace(
        "usupport",
        `${countryLabel}.usupport`
      );
    } else {
      window.location.href = `/${renderIn}/${language}/`;
    }
  } else {
    window.location.href = `/${renderIn}/${language}/`;
  }
};

const constructWebsiteUrl = (url) => {
  const country = localStorage.getItem("country");
  const language = localStorage.getItem("language");
  const hostname = window.location.hostname;
  const subdomain = hostname.split(".")[0];

  if (subdomain === "staging") {
    return `https://staging.usupport.online/${language}/${url}`;
  }

  if (country === "global") {
    return `https://usupport.online/${language}/${url}`;
  }

  if (!country) {
    if (hostname.includes("staging")) {
      return `https://staging.usupport.online/${language}/${url}`;
    }
    return `https://usupport.online/${language}/${url}`;
  }

  const countryName = countriesMap[country.toLocaleLowerCase()];

  if (hostname.includes("staging")) {
    return `https://${countryName}.staging.usupport.online/${language}/${url}`;
  }

  return `https://${countryName}.usupport.online/${language}/${url}`;
};

const constructShareUrl = ({ contentType, id, name }) => {
  const country = localStorage.getItem("country");
  const language = localStorage.getItem("language");
  const hostname = window.location.hostname;
  const subdomain = hostname.split(".")[0];

  let contentUrl = "";

  if (contentType === "organization") {
    contentUrl = `organization-overview/${id}`;
  } else {
    contentUrl = `information-portal/${contentType}/${id}/${createArticleSlug(
      name
    )}`;
  }

  if (subdomain === "staging") {
    return `https://staging.usupport.online/${language}/${contentUrl}`;
  }

  if (country === "global") {
    return `https://usupport.online/${language}/${contentUrl}`;
  }

  const countryName = countriesMap[country.toLocaleLowerCase()];

  if (hostname.includes("staging")) {
    return `https://${countryName}.staging.usupport.online/${language}/${contentUrl}`;
  }

  const url = `https://${countryName}.usupport.online/${language}/${contentUrl}`;

  return url;
};

const redirectToUrl = (url) => {
  window.open(url, "_self", "noreferrer").focus();
};

const COUNTRIES_DEFAULT_LANGUAGES = {
  pl: "pl",
  kz: "kk",
  am: "hy",
  // ro:'ro', // TODO: add ro to the list of countries when translations are added
  global: "en",
  undefined: "en",
};

const getCountryDefaultLanguage = () => {
  const country = getCountryFromSubdomain();
  return COUNTRIES_DEFAULT_LANGUAGES[country.toLocaleLowerCase()];
};

export {
  filterAdminData,
  downloadCSVFile,
  getCountryLabelFromAlpha2,
  redirectToLocalStorageCountry,
  getCountryFromSubdomain,
  constructShareUrl,
  redirectToUrl,
  countriesMap,
  constructWebsiteUrl,
  getCountryDefaultLanguage,
};
