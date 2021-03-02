export default function formatDate(date, longDate = false) {
  if (!date) return "";
  var d = longDate
      ? new Date(date)
      : new Date(date.seconds * 1000 + date.nanoseconds / 1000),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("/");
}
