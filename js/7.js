const fs = require("node:fs");

const input = fs.readFileSync("../input/7.txt", { encoding: "utf8" });
const data = input.split("\n");

let part1 = 0;
const positions = new Set();
positions.add(data[0].indexOf("S"));
for (let i = 2; i < data.length; i += 2) {
  const beamPositions = new Set();
  for (let pos of positions) {
    if (data[i][pos] == "^") {
      beamPositions.add(pos - 1);
      beamPositions.add(pos + 1);
      continue;
    }
  }
  // else positions.add(...data[i].matchAll('^').map(m => [m.index-1, m.index+1]).flat());
}
