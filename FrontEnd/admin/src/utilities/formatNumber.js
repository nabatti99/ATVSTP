export function formatShortInt(number = 0, numDigits = 2) {
  number = parseInt(number);
  const n = number / 10 ** numDigits;

  if (n >= 1) return number.toString();
  else {
    let temp = number;
    let currentDigits = 0;
    for (let i = 1; i <= numDigits; i++) {
      temp /= 10;
      temp = parseInt(temp);
      currentDigits++;

      if (temp == 0) return `${"0".repeat(numDigits - currentDigits)}${number}`;
    }
  }
}
