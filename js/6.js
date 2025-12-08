const fs = require("node:fs");

const input = fs.readFileSync("../input/6.txt", { encoding: "utf8" });
const [firstStr, secondStr, thirdStr, fourthStr, operationStr] =
  input.split("\n");
const first = firstStr.trim().split(/\s+/).map(Number);
const second = secondStr.trim().split(/\s+/).map(Number);
const third = thirdStr.trim().split(/\s+/).map(Number);
const fourth = fourthStr.trim().split(/\s+/).map(Number);
const operation = operationStr.trim().split(/\s+/);

let part1 = 0;
for (let i = 0; i < first.length; i++) {
  let val1 = first[i];
  let val2 = second[i];
  let val3 = third[i];
  let val4 = fourth[i];
  let op = operation[i];
  switch (op) {
    case "+":
      part1 += val1 + val2 + val3 + val4;
      break;
    case "*":
      part1 += val1 * val2 * val3 * val4;
      break;
  }
}
console.log("Part 1:", part1);

let part2 = 0;
const isColumnSeparator = (index) => {
  return (
    firstStr[index] == " " &&
    secondStr[index] == " " &&
    thirdStr[index] == " " &&
    fourthStr[index] == " "
  );
};

let data = [firstStr, secondStr, thirdStr, fourthStr];
let numbers = [];
let numberStr = "";
let operator = "";
for (let i = firstStr.length - 1; i >= 0; i--) {
  if (isColumnSeparator(i)) {
    let sum = 0;
    if (operator == "+") sum = numbers.reduce((a, b) => a + b, 0);
    else if (operator == "*") sum = numbers.reduce((a, b) => a * b, 1);
    else console.error("Unknown operator:", operator);
    part2 += sum;
    numbers = [];
    numberStr = "";
    operator = "";
    continue;
  }
  for (let row of data) {
    numberStr += row[i];
  }
  operator = operationStr[i];
  numbers.push(parseInt(numberStr.trim()));
  numberStr = "";
}
let sum = 0;
if (operator == "+") sum = numbers.reduce((a, b) => a + b, 0);
else if (operator == "*") sum = numbers.reduce((a, b) => a * b, 1);
else console.error("Unknown operator:", operator);
part2 += sum;

console.log("Part 2:", part2);
// 8907525198785 too low
