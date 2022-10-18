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

function isDateToday(date) {
  return new Date().toDateString() === date.toDateString();
}

const isDateYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toDateString() === date.toDateString();
};

export { getDayOfTheWeek, isDateToday, isDateYesterday };
