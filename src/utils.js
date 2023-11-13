export const convertObjectToDropdownData = (inputObject) => {
  const outputArray = [];

  for (const code in inputObject) {
    if (inputObject.hasOwnProperty(code)) {
      const name = inputObject[code];
      outputArray.push({ name, code });
    }
  }
  return outputArray;
};

export const outputDateFormatted = (inputDate) => {
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(inputDate)
    .split(".")
    .reverse()
    .join("-");
};
