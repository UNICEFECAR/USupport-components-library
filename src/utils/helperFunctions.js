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

export { filterAdminData, downloadCSVFile };
