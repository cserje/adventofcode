const fs = require("fs");

let sum = 0;
const [redMax, greenMax, blueMax] = [12, 13, 14];

fs.readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n")
  .forEach((row) => {
    const [_, gameId, sets] = row.match(/^Game (\d+):(.*)/);
    let isImpossible = false;
    sets.split(";").forEach((set) => {
      if (isImpossible) return;
      const red = set.match(/(\d+) red/);
      const green = set.match(/(\d+) green/);
      const blue = set.match(/(\d+) blue/);
      const redCount = red?.length === 2 ? Number(red[1]) : 0;
      const greenCount = green?.length === 2 ? Number(green[1]) : 0;
      const blueCount = blue?.length === 2 ? Number(blue[1]) : 0;
      if (redCount > redMax || greenCount > greenMax || blueCount > blueMax) {
        isImpossible = true;
      }
    });
    if (!isImpossible) {
      sum += Number(gameId);
    }
  });

console.log("--- Part One ---");
console.log(`The sum of the IDs of those game is: \x1b[32m${sum}\x1b[0m`);
