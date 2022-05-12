export function exportDate(date = new Date()) {
  return date.toLocaleString();
}

export function importDate(inputDate = "") {
  return new Date(inputDate);
}
