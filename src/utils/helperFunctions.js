/** 
 * Write a function that accepts an array of objects and performs the following steps:
 * 
 *  1. Loop through all the objects in "data" array
    2. Check if the current object.locale === [current_locale]
      3. If yes, then check if the current object.id is already in the array
        4. If yes, then skip
        5. If no, then push the current object to the array
      5. If no, then check if the current object.localizations.data.length > 0
        6. If yes, then loop through all the objects in "localizations.data" array
        7. Check if the current object.locale === [current_locale]
          8. If yes, then add it to the new array
          9. If no, then continue to the next object in "localizations.data" array
        10. If no, then continue to the next object in "data" array
      11. If no, then continue to the next object in "data" array
    12. Return the new array
 * */
function getFilteredData(data, locale) {
  let filteredData = [];

  // Loop through all the objects in "data" array
  for (let i = 0; i < data.length; i++) {
    const currentData = data[i];
    const currentId = currentData.id;
    const currentLocale = currentData.attributes.locale;
    const currentLocalizations = currentData.attributes.localizations.data;

    // Check if the current data needs to be added to the array
    if (currentLocale === locale) {
      if (!filteredData.some((obj) => obj.id === currentId)) {
        filteredData.push(currentData);
      }
      // Check if any of the children of the current data needs to be added to the array
    } else if (currentLocalizations.length > 0) {
      // Loop through all the children objects of the current data
      for (let j = 0; j < currentLocalizations.length; j++) {
        // Check if the current child data needs to be added to the array
        if (currentLocalizations[j].attributes.locale === locale) {
          if (
            !filteredData.some((obj) => obj.id === currentLocalizations[j].id)
          ) {
            filteredData.push(currentLocalizations[j]);
          }
        }
      }
    }
  }
  return filteredData;
}

function getFilteredDataAdmin(data, locale, selectedIds) {
  let filteredData = [];

  // Loop through all the objects in "data" array
  for (let i = 0; i < data.length; i++) {
    const currentData = data[i];
    const currentId = currentData.id;
    const currentLocale = currentData.attributes.locale;
    const currentLocalizations = currentData.attributes.localizations.data;

    // Check if the current data needs to be checked
    let isSelected = selectedIds.includes(currentId.toString());
    if (!isSelected) {
      if (currentLocalizations.length > 0) {
        for (let j = 0; j < currentLocalizations.length; j++) {
          if (selectedIds.includes(currentLocalizations[j].id.toString())) {
            isSelected = true;
            break;
          }
        }
      }
    }

    // Check if the current data needs to be added to the array
    if (currentLocale === locale) {
      if (!filteredData.some((obj) => obj.id === currentId)) {
        filteredData.push({ isSelected, ...currentData });
      }
      // Check if any of the children of the current data needs to be added to the array
    } else if (currentLocalizations.length > 0) {
      // Loop through all the children objects of the current data
      for (let j = 0; j < currentLocalizations.length; j++) {
        // Check if the current child data needs to be added to the array
        if (currentLocalizations[j].attributes.locale === locale) {
          if (
            !filteredData.some((obj) => obj.id === currentLocalizations[j].id)
          ) {
            filteredData.push({ isSelected, ...currentLocalizations[j] });
          }
        }
      }
    }
  }
  return filteredData;
}

export { getFilteredDataAdmin, getFilteredData };
