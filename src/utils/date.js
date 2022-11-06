/**
 * Get the day of the week from a Date object
 * @param {Date} date
 * @returns {String}
 */
function getDayOfTheWeek(date) {
  const day = date.getDay();
  switch (day) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "Unknown";
  }
}

/**
 *Return if date is today
 * @param {Date} date
 * @returns {Boolean}
 */
function isDateToday(date) {
  return new Date().toDateString() === date.toDateString();
}

/**
 *Return if date is yesterday
 * @param {Date} date
 * @returns {Boolean}
 */
const isDateYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toDateString() === date.toDateString();
};

/**
 * Get time from Date object
 * @param {Date} date
 * @returns {String} in hh:mm format
 */
const getTimeFromDate = (date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get the starting and ending day of the week
 *
 * @param {Date} day
 * @returns {{ firstDayOfWeek, lastDayOfWeek }} Date objects for the first and last days of the week
 */
function getStartAndEndOfWeek(day) {
  const weekMap = [6, 0, 1, 2, 3, 4, 5];
  var now = day;
  now.setHours(0, 0, 0, 0);
  var firstDayOfWeek = new Date(now);
  firstDayOfWeek.setDate(
    firstDayOfWeek.getDate() - weekMap[firstDayOfWeek.getDay()]
  );
  var lastDayOfWeek = new Date(now);
  lastDayOfWeek.setDate(
    lastDayOfWeek.getDate() - weekMap[lastDayOfWeek.getDay()] + 6
  );
  lastDayOfWeek.setHours(23, 59, 59, 999);
  return { first: firstDayOfWeek, last: lastDayOfWeek };
}

function getDatesInRange(start, end) {
  const dates = [];
  const currDate = start;
  const lastDate = end;
  while (currDate <= lastDate) {
    dates.push(new Date(currDate));
    currDate.setDate(currDate.getDate() + 1);
  }
  return dates;
}

/**
 * Return if date is between two dates
 * @param {Date} date
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Boolean}
 */
function isDateBetweenTwoDates(date, startDate, endDate) {
  return date >= startDate && date <= endDate;
}

/**
 * Return the time as String
 * @param {Date} date
 * @returns {String} in hh:mm format
 */
function getTimeAsString(date) {
  return date
    ? `${date.getHours() > 9 ? date.getHours() : "0" + date.getHours()}:${
        date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()
      }`
    : "";
}

/**
 * Get the month name as String from a Date object
 * @param {Date} date
 * @returns {String}
 */
function getMonthName(date) {
  const month = date.getMonth();
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "Unknown";
  }
}

export {
  getDayOfTheWeek,
  isDateToday,
  isDateYesterday,
  getTimeFromDate,
  getStartAndEndOfWeek,
  getDatesInRange,
  isDateBetweenTwoDates,
  getTimeAsString,
  getMonthName,
};
