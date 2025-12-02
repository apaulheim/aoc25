const fs = require("node:fs");

const input = fs.readFileSync("../input/2.txt", { encoding: "utf8" });
const lines = input.split(",");
const regex = /(\d+)-(\d+)/;

const data = lines.map((line) => {
  const match = line.match(regex);
  if (match) {
    return {
      min: parseInt(match[1]),
      max: parseInt(match[2]),
    };
  }
  return null;
});

const hasDuplicateNumbers = (str) => {
  const regex = /^(\d+)\1$/;
  const match = str.match(regex);
  return match ? match[1] : null;
};

let part1 = 0;
for (let { min, max } of data) {
  for (let i = min; i <= max; i++) {
    const str = i.toString();
    const duplicate = hasDuplicateNumbers(str);
    if (duplicate) {
      //   console.log(`Number ${i} has duplicate number: ${duplicate}`);
      part1 += i;
    }
  }
}

console.log("Part 1:", part1);

let part2 = 0;
const findOneOrMoreDuplicates = (str) => {
  const regex = /^(\d+)\1+$/;
  const match = str.match(regex);
  return match ? match[1] : null;
};

for (let { min, max } of data) {
  for (let i = min; i <= max; i++) {
    const str = i.toString();
    const duplicate = findOneOrMoreDuplicates(str);
    if (duplicate) {
      //   console.log(`Number ${i} has duplicate number: ${duplicate}`);
      part2 += i;
    }
  }
}
console.log("Part 2:", part2);
