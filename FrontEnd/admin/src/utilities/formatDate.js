export function exportDate(date = new Date()) {
  return date.toISOString().slice(0, 10).split("-").reverse().join("-");
}

export function importDate(inputDate = "") {
  return new Date(...inputDate.split("-").reverse());
}
