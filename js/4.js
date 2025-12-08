const fs = require("node:fs");

const input = fs.readFileSync("../input/4.txt", { encoding: "utf8" });
const data = input.split("\n");

const countAdjacent = (x, y) => {
  let count = 0;
  for (let dx = x - 1; dx <= x + 1; dx++) {
    for (let dy = y - 1; dy <= y + 1; dy++) {
      if (dx < 0 || dy < 0 || dx >= data[y].length || dy >= data.length)
        continue;
      if (data[dy][dx] === "@" && !(dx == x && dy == y)) count++;
    }
  }
  return count;
};

let part1 = 0;
for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[y].length; x++) {
    if (data[y][x] === "@") {
      let adjacent = countAdjacent(x, y);
      if (adjacent < 4) part1++;
    }
  }
}

console.log("Part 1:", part1);

let part2 = 0;
let paperRollsToBeRemoved = [];
let rollsHaveBeenRemoved = true;
while (rollsHaveBeenRemoved) {
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] === "@") {
        let adjacent = countAdjacent(x, y);
        if (adjacent < 4) paperRollsToBeRemoved.push([x, y]);
      }
    }
  }
  if (paperRollsToBeRemoved.length == 0) rollsHaveBeenRemoved = false;
  part2 += paperRollsToBeRemoved.length;
  for (let [x, y] of paperRollsToBeRemoved) {
    data[y] = data[y].substring(0, x) + "." + data[y].substring(x + 1);
  }
  paperRollsToBeRemoved = [];
}
console.log("Part 2:", part2);
