export default function makeSelections(options = [], excludeOptions = [], key = "", current) {
  return options.reduce(
    (result, option) => {
      const index = excludeOptions.findIndex((excludeOption) => {
        if (typeof excludeOption == "object") return excludeOption[key] == option[key];
        else return excludeOption == option[key];
      });
      if (index == -1) result.push(option);

      return result;
    },
    [current]
  );
}
