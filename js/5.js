const fs = require("node:fs");

const input = fs.readFileSync("../input/5.txt", { encoding: "utf8" });
const [rangesStr, idsStr] = input.split("\n\n");
const ranges = rangesStr.split("\n").map((line) => {
  const [min, max] = line.split("-").map(Number);
  return { min, max };
});
const ids = idsStr.split("\n").map(Number);

let part1 = 0;
for (let id of ids) {
  let fresh = false;
  for (let { min, max } of ranges) {
    if (id >= min && id <= max) {
      fresh = true;
      break;
    }
  }
  if (fresh) part1++;
}
console.log("Part 1:", part1);

let part2 = 0;
let mergedRanges = [];
ranges.sort((a, b) => a.min - b.min);
for (let range of ranges) {
  if (mergedRanges.length === 0) {
    mergedRanges.push(range);
  } else {
    let lastRange = mergedRanges[mergedRanges.length - 1];
    if (range.min <= lastRange.max + 1) {
      lastRange.max = Math.max(lastRange.max, range.max);
    } else {
      mergedRanges.push(range);
    }
  }
}
for (let range of mergedRanges) {
  part2 += range.max - range.min + 1;
}

console.log("Part 2:", part2);
