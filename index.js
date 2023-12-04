const fs = require("fs");

let sum = 0;
const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

input.split("\n").forEach((row) => {
  const h1 = row.split(":");
  const h2 = h1[1].split("|");
  const matches = new Set();
  const winningNumbers = h2[0].match(/(\d+)/g);
  const numbers = h2[1].match(/(\d+)/g);
  numbers.forEach((value) => {
    if (matches.has(value) || !winningNumbers.includes(value)) {
      return;
    }
    if (winningNumbers.includes(value)) {
      matches.add(value);
    }
  });
  if (matches.size === 0) {
    return;
  }
  sum += Math.pow(2, matches.size - 1);
});

console.log("--- Part One ---");
console.log(`How many points are they worth in total?\n\x1b[32m${sum}\x1b[0m`);
