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
    if (isSlected) {
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
      window.location.href = `/${renderIn}/${language}`;
    }
  } else {
    window.location.href = `/${renderIn}/${language}`;
  }
};

export {
  filterAdminData,
  downloadCSVFile,
  getCountryLabelFromAlpha2,
  redirectToLocalStorageCountry,
};
