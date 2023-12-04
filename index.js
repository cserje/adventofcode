const fs = require("fs");

let sum = 0;

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

const map = new Map();
map.set("one", 1);
map.set("two", 2);
map.set("three", 3);
map.set("four", 4);
map.set("five", 5);
map.set("six", 6);
map.set("seven", 7);
map.set("eight", 8);
map.set("nine", 9);

input.split("\n").forEach((row) => {
  let digits = [];
  let sliceIndex = 0;
  let matches = [];
  while (
    (matches = row
      .slice(sliceIndex)
      .match(/(one|two|three|four|five|six|seven|eight|nine|\d)/)) !== null
  ) {
    digits.push(map.has(matches[0]) ? map.get(matches[0]) : Number(matches[0]));
    sliceIndex += matches.index + 1;
  }

  if (digits.length === 1) {
    digits.push(digits[0]);
  }
  sum += Number(`${digits.slice(0, 1)}${digits.slice(-1)}`);
});

console.log("--- Part Two ---");
console.log(
  `The sum of all of the calibration values is: \x1b[32m${sum}\x1b[0m`
);
