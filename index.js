const fs = require("fs");

let lastCardNumber = 0;
const matchesByCardNumber = new Map();
const sumOfCardsByCardNumber = new Map();
const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

input.split("\n").forEach((row) => {
  const h1 = row.split(":");
  const cardNumber = Number(h1[0].match(/\d+/)[0]);
  sumOfCardsByCardNumber.set(cardNumber, 1);
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
  matchesByCardNumber.set(cardNumber, matches.size);
  if (lastCardNumber < cardNumber) {
    lastCardNumber = cardNumber;
  }
});

for (let cardNumber = 1; cardNumber <= lastCardNumber; ++cardNumber) {
  const matchesCount = matchesByCardNumber.get(cardNumber);
  for (let j = 0; j < sumOfCardsByCardNumber.get(cardNumber); ++j) {
    for (
      let i = cardNumber + 1;
      i <= cardNumber + matchesCount && i <= lastCardNumber;
      ++i
    ) {
      sumOfCardsByCardNumber.set(i, sumOfCardsByCardNumber.get(i) + 1);
    }
  }
}

const sum = Array.from(sumOfCardsByCardNumber.values()).reduce(
  (a, b) => a + b,
  0
);

console.log("--- Part Two ---");
console.log(
  `How many total scratchcards do you end up with?\n\x1b[32m${sum}\x1b[0m`
);
