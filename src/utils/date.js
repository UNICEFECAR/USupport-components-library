/**
 * Get the day of the week from a Date object
 * @param {Date} date
 * @returns {String}
 */
function getDayOfTheWeek(date) {
  const day = date.getDay();
  switch (day) {
    case 0:
      return "sunday";
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    case 6:
      return "saturday";
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
  const now = new Date(day);
  now.setHours(0, 0, 0, 0);
  const firstDayOfWeek = new Date(now);
  firstDayOfWeek.setDate(
    firstDayOfWeek.getDate() - weekMap[firstDayOfWeek.getDay()]
  );
  const lastDayOfWeek = new Date(now);
  lastDayOfWeek.setDate(
    lastDayOfWeek.getDate() - weekMap[lastDayOfWeek.getDay()] + 6
  );
  lastDayOfWeek.setHours(23, 59, 59, 999);
  return { first: firstDayOfWeek, last: lastDayOfWeek };
}

function getDatesInRange(start, end) {
  const dates = [];
  const currDate = new Date(start);
  const lastDate = new Date(end);
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

function getDateView(date) {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const fullYear = newDate.getFullYear();
  const year = fullYear.toString().slice(-2);

  return `${day < 10 ? `0${day}` : day}.${
    month < 10 ? `0${month}` : month
  }.${year}`;
}

/**
 *
 * @param {Date} day date object
 * @param {string} hour - in format "HH:MM"
 */
function getDateAsFullString(day, hour) {
  return new Date(`${getDateDashes(day)}T${hour}`).toString();
}

/**
 * Format date from the js Date object Thu Mar 25 2021 00:00:00 GMT+0000 (Greenwich Mean Time) to YYYY-MM-DD
 *
 * @param {Date} date the formatted js Date object
 * @returns {string} the formatted DB date YYYY-MM-DD
 */
function getDateDashes(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

/**
 * Get the timestamp as UTC
 *
 * @param {Date} date Date object
 * @param {string} time format HH:MM
 * @returns
 */
function getTimestamp(date, time = "00:00") {
  return new Date(`${getDateDashes(date)}T${time}`).getTime() / 1000;
}

/**
 * Get the timestamp from UTC date
 *
 * @param {Date} date Date object
 * @param {string} time format HH:MM
 * @returns
 */
function getTimestampFromUTC(date, time = "00:00") {
  return new Date(`${getDateDashes(date)}T${time}Z`).getTime() / 1000;
}

function getXDaysInSeconds(x) {
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  return x * day;
}

const hours = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

/**
 * Function to check if a given timestamp is in 5 minutes or less than the current time
 * and if the current time is earlier than an hour after the timestamp
 *
 * @param {number} - the timestamp in milliseconds
 *
 * @returns {boolean}
 */
function checkIsFiveMinutesBefore(timestamp) {
  const fiveMinutes = 5 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const currentTime = new Date().getTime();
  const endTime = timestamp + oneHour;

  return currentTime >= timestamp - fiveMinutes && currentTime <= endTime;
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
  getDateView,
  getDateDashes,
  getTimestamp,
  getTimestampFromUTC,
  getDateAsFullString,
  getXDaysInSeconds,
  hours,
  checkIsFiveMinutesBefore,
};
