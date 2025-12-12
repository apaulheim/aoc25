const fs = require("node:fs");
const input = fs.readFileSync("../input/8.txt", { encoding: "utf8" });
const positions = input
  .split("\n")
  .map((line) => line.split(",").map((num) => parseInt(num)));

const getDistance = (pos1, pos2) =>
  Math.sqrt(
    Math.pow(pos1[0] - pos2[0], 2) +
      Math.pow(pos1[1] - pos2[1], 2) +
      Math.pow(pos1[2] - pos2[2], 2)
  );

const findShortestDistances = (amountOfDistances) => {
  const distances = new Map();
  const addMapEntry = (dist, posPair) => {
    // keep map small by only storing the shortest distances
    if (distances.size >= amountOfDistances) {
      const maxDist = Math.max(...distances.keys());
      if (dist >= maxDist) return;
      distances.delete(maxDist);
    }
    const existingWithSameDist = distances.get(dist) || new Set();
    existingWithSameDist.add(posPair.sort((a, b) => a - b).toString());
    distances.set(dist, existingWithSameDist);
  };
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      if (i == j) continue;
      addMapEntry(getDistance(positions[i], positions[j]), [i, j]);
    }
  }
  return distances;
};

let distances = findShortestDistances(Number.POSITIVE_INFINITY);
let sortedDistances = Array.from(distances.keys()).sort((a, b) => a - b);
let circuits = [];
const getCircuitWithPosition = (position) => {
  for (let circuit of circuits) {
    if (circuit.has(position)) {
      return circuit;
    }
  }
  return null;
};

let lastPair = null;
for (let dist of sortedDistances) {
  for (let posStr of distances.get(dist)) {
    const positionIds = posStr.split(",").map((numStr) => parseInt(numStr));
    // console.log(
    //   `Distance ${dist} between positions ${positions[positionIds[0]]} and ${
    //     positions[positionIds[1]]
    //   }`
    // );
    let circuit1 = getCircuitWithPosition(positionIds[0]);
    let circuit2 = getCircuitWithPosition(positionIds[1]);
    if (!circuit1 && !circuit2) {
      const newCircuit = new Set();
      newCircuit.add(positionIds[0]);
      newCircuit.add(positionIds[1]);
      circuits.push(newCircuit);
    } else if (circuit1 && !circuit2) {
      circuit1.add(positionIds[1]);
      lastPair = [positions[positionIds[0]], positions[positionIds[1]]];
    } else if (!circuit1 && circuit2) {
      circuit2.add(positionIds[0]);
      lastPair = [positions[positionIds[0]], positions[positionIds[1]]];
    } else if (circuit1 !== circuit2) {
      // merge circuits
      const indexToUnion = circuits.indexOf(circuit1);
      circuit1 = circuit1.union(circuit2);
      circuits[indexToUnion] = circuit1;
      const indexToRemove = circuits.indexOf(circuit2);
      circuits.splice(indexToRemove, 1);
      lastPair = [positions[positionIds[0]], positions[positionIds[1]]];
    }
  }
}

console.log(
  "Part 1:",
  circuits
    .map((c) => c.size)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1)
);

// part 2
// let largestDistance = 0;
// let pairWithLargestDistance = null;
// for (let i = 0; i < positions.length; i++) {
//   for (let j = i + 1; j < positions.length; j++) {
//     if (i == j) continue;
//     const dist = getDistance(positions[i], positions[j]);
//     if (dist > largestDistance) {
//       largestDistance = dist;
//       pairWithLargestDistance = [positions[i], positions[j]];
//     }
//   }
// }

console.log("Part 2:", lastPair[0][0] * lastPair[1][0]);
