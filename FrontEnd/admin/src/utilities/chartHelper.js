export function makeDataset(data = [], label = "", color = "#000000") {
  return {
    label,
    data,
    borderColor: color,
    cubicInterpolationMode: "monotone",
    tension: 0.4,
    pointStyle: "circle",
    pointRadius: 8,
    pointHoverRadius: 12,
  };
}
