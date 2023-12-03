const fs = require("fs");

let sum = 0;
let sumOfPowers = 0;
const [redMax, greenMax, blueMax] = [12, 13, 14];

fs.readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n")
  .forEach((row) => {
    const [_, gameId, sets] = row.match(/^Game (\d+):(.*)/);
    let isImpossible = false;
    let [redMin, greenMin, blueMin] = [0, 0, 0];
    sets.split(";").forEach((set) => {
      const red = set.match(/(\d+) red/);
      const green = set.match(/(\d+) green/);
      const blue = set.match(/(\d+) blue/);
      const redCount = red?.length === 2 ? Number(red[1]) : 0;
      const greenCount = green?.length === 2 ? Number(green[1]) : 0;
      const blueCount = blue?.length === 2 ? Number(blue[1]) : 0;
      if (redCount > redMax || greenCount > greenMax || blueCount > blueMax) {
        isImpossible = true;
      }
      redMin = Math.max(redMin, redCount);
      greenMin = Math.max(greenMin, greenCount);
      blueMin = Math.max(blueMin, blueCount);
    });
    if (!isImpossible) {
      sum += Number(gameId);
    }
    sumOfPowers += redMin * greenMin * blueMin;
  });

console.log("--- Part One ---");
console.log(`The sum of the IDs of those game is: \x1b[32m${sum}\x1b[0m`);
console.log("");
console.log("--- Part Two ---");
console.log(
  `The sum of the power of these sets is: \x1b[32m${sumOfPowers}\x1b[0m`
);
