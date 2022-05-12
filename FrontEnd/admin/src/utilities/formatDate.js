export function exportDate(date = new Date()) {
  return date.toISOString();
}

export function importDate(inputDate = "") {
  return new Date(inputDate + "+00:00");
}

export function getOnlyDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getDateDelete(inputDate = "") {
  return new Date(inputDate + "+00:00").toLocaleString();
}
