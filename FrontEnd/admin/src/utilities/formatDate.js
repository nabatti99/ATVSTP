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
  const date = new Date(inputDate + "+00:00");
  date.setMinutes(date.getMinutes() + 1);
  return date.toLocaleString();
}
