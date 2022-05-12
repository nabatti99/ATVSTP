export function exportDate(date = new Date()) {
  return date.toISOString();
}

export function importDate(inputDate = "") {
  return new Date(inputDate);
}
