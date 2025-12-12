const fs = require("node:fs");

const input = fs.readFileSync("../input/7.txt", { encoding: "utf8" });
const data = input.split("\n");

let part1 = 0;
let positions = new Set();
positions.add(data[0].indexOf("S"));
for (let i = 2; i < data.length; i += 2) {
  const beamPositions = new Set();
  for (let pos of positions) {
    // split beam
    if (data[i][pos] == "^") {
      beamPositions.add(pos - 1);
      beamPositions.add(pos + 1);
      part1++;
      continue;
    }
    // beam continues
    else beamPositions.add(pos);
  }
  positions = beamPositions;
}
console.log("Part 1:", part1);

let part2 = 1;
let timelines = new Map();
timelines.set(data[0].indexOf("S"), 1);
for (let i = 2; i < data.length; i += 2) {
  for (let [pos, value] of timelines) {
    // split beam
    if (data[i][pos] == "^") {
      timelines.set(
        pos - 1,
        timelines.get(pos) + (timelines.get(pos - 1) || 0)
      );
      timelines.set(
        pos + 1,
        timelines.get(pos) + (timelines.get(pos + 1) || 0)
      );
      timelines.delete(pos);
      continue;
    }
  }
}
console.log(
  "Part 2:",
  Array.from(timelines.values()).reduce((a, b) => a + b, 0)
);
