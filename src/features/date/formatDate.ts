export const formatDate = (d : Date) => {
  const year = d.getFullYear(),
        month = d.getMonth() + 1,
        monthPadded = month < 10 ? '0' + month.toString() : month.toString(),
        day = d.getDate(),
        dayPadded = day < 10 ? '0' + day.toString() : day.toString();
  return `${year}-${monthPadded}-${dayPadded}`;
}