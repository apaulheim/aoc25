const fs = require("node:fs");
const input = fs.readFileSync("../input/9.txt", { encoding: "utf8" });
const positions = input
  .split("\n")
  .map((line) => line.split(",").map((num) => parseInt(num)));

let largestArea = 0;
for (let i = 0; i < positions.length; i++) {
  for (let j = i + 1; j < positions.length; j++) {
    if (i == j) continue;
    const area =
      (Math.abs(positions[i][0] - positions[j][0]) + 1) *
      (Math.abs(positions[i][1] - positions[j][1]) + 1);
    if (area > largestArea) {
      largestArea = area;
    }
  }
}

console.log("Part 1:", largestArea);
