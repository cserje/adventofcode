const fs = require("fs");

let sum = 0;

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

input.split("\r\n").forEach((row) => {
  const matches = row.match(/(\d)/g);
  if (matches.length === 1) {
    matches.push(matches[0]);
  }
  sum += Number(`${matches.slice(0, 1)}${matches.slice(-1)}`);
});

console.log(`The sum is: \x1b[32m${sum}\x1b[0m`);
