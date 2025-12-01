const fs = require("node:fs");

const input = fs.readFileSync("../input/1.txt", { encoding: "utf8" });
const lines = input.split("\n");
const regex = /([LR])(\d+)/;

const data = lines.map((line) => {
  const match = line.match(regex);
  if (match) {
    return {
      direction: match[1],
      value: parseInt(match[2]),
    };
  }
  return null;
});

let position = 50;
let posIsZero = 0;
for (let { direction, value } of data) {
  if (direction === "L") {
    position = (100 + (position - value)) % 100;
  } else {
    position = (100 + (position + value)) % 100;
  }
  if (position === 0) {
    posIsZero++;
  }
}

console.log("Part 1:", posIsZero);

position = 50;
posIsZero = 0;

for (let { direction, value } of data) {
  for (let i = 0; i < value; i++) {
    if (direction === "L") {
      position = (100 + (position - 1)) % 100;
    } else {
      position = (100 + (position + 1)) % 100;
    }
    if (position == 0) {
      posIsZero++;
    }
  }
  //   if (value >= 100) {
  //     posIsZero += Math.floor(value / 100);
  //     value = value % 100;
  //   }
  //   if (direction === "L") {
  //     position = (100 + (position - value)) % 100;
  //   } else {
  //     position = (100 + (position + value)) % 100;
  //   }
  //   if (position === 0) {
  //     posIsZero++;
  //   }
}

// 2855 too low
// 5583
// 6684 RIGHT
// 6724 too high
// 98976 too high
console.log("Part 2:", posIsZero);
