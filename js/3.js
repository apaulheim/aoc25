const fs = require("node:fs");

const input = fs.readFileSync("../input/3.txt", { encoding: "utf8" });
const banks = input.split("\n");

const findLargestNumber = (bank, rangeMin, rangeMax) => {
  let maxIndex = 0;
  let maxValue = parseInt(bank[rangeMin]);
  for (let i = rangeMin; i < rangeMax; i++) {
    const value = parseInt(bank[i]);
    if (value > maxValue) {
      maxValue = value;
      maxIndex = i;
    }
  }
  return { maxIndex, maxValue };
};

let part1 = 0;
for (let bank of banks) {
  let { maxIndex, maxValue } = findLargestNumber(bank, 0, bank.length - 1);
  let { maxIndex: secondIndex, maxValue: secondValue } = findLargestNumber(
    bank,
    maxIndex + 1,
    bank.length
  );
  //   console.log(parseInt(`${maxValue}${secondValue}`));
  part1 += parseInt(`${maxValue}${secondValue}`);
}

// console.log(part1);

for (let bankStr of banks) {
  // Neue Idee: Wir gehen schrittweise von hinten nach vorne durch und schmeißen die kleinsten Zahlen raus
  const goalLength = 2;
  let bank = bankStr.split("").map((n) => parseInt(n));
  for (let numberToRemove = 1; numberToRemove <= 8; numberToRemove++) {
    for (let i = bank.length - 1; i >= 0; i--) {
      if (bank[i] === numberToRemove && bank.length > goalLength) {
        bank.splice(i, 1);
      }
    }
  }
  //   console.log(parseInt(`${bank.join("")}`));
}

for (let bankStr of banks) {
  // Neue Idee: Wir gehen schrittweise von vorne nach hinten durch und behalten die größten Zahlen
  const goalLength = 2;
  let bank = bankStr.split("").map((n) => parseInt(n));
  for (let numberToKeep = 9; numberToKeep >= 1; numberToKeep--) {
    for (let i = 0; i < bank.length; i++) {
      if (bank[i] !== numberToKeep && bank.length > goalLength) {
        bank.splice(i, 1);
        i--;
      }
    }
  }
  console.log(parseInt(`${bank.join("")}`));
}
