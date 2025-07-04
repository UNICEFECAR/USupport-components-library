import { getLanguageFromUrl } from "./replaceLanguageInUrl";

/**
 * @description - This funciton is used to set 'isSelected' property to true for the selected items
 *
 * @param {object} data - array of strapi content-types e.g articles, faqs, sos-centers etc.
 * @param {array} selectedIds - array containing the ids of the selected content-types in a specified localised version e.g. en, kk, ru etc.
 * @returns {object} data - array of strapi content-types e.g articles, faqs, sos-centers etc. with 'isSelected' property set to true for the selected items
 */
function filterAdminData(data, selectedIds) {
  for (let i = 0; i < data.length; i++) {
    let currentData = data[i];
    const currentDataId = currentData.id;
    const isSlected = selectedIds.includes(currentDataId.toString());
    const isAnotherLocaleSelected =
      currentData.attributes.localizations?.data.some((localization) => {
        return selectedIds.includes(localization.id.toString());
      });
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

const constructShareUrl = ({ contentType, id }) => {
  const country = localStorage.getItem("country");
  const language = localStorage.getItem("language");
  const subdomain = window.location.hostname.split(".")[0];

  let contentUrl = `information-portal/${contentType}/${id}`;

  if (contentType === "organization") {
    contentUrl = `organization-overview/${id}`;
  }

  if (subdomain === "staging") {
    return `https://staging.usupport.online/${language}/${contentUrl}`;
  }

  if (country === "global") {
    return `https://usupport.online/${language}/${contentUrl}`;
  }
  const countryName = countriesMap[country.toLocaleLowerCase()];

  const url = `https://${countryName}.usupport.online/${language}/${contentUrl}`;
  console.log("url", url);
  return url;
};

const redirectToUrl = (url) => {
  window.open(url, "_self", "noreferrer").focus();
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
};
