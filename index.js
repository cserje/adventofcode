const fs = require("fs");

const board = [];
const symbols = [];

fs.readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n")
  .forEach((row, rowIndex) => {
    board.push(
      row.split("").map((value, columnIndex) => {
        if (/[0-9]/.test(value)) {
          return Number(value);
        }
        if (/[^0-9.]/.test(value)) {
          symbols.push([rowIndex, columnIndex]);
        }
        return value;
      })
    );
  });

const getNumberEndIndex = (rowIndex, columnIndex) => {
  if (
    columnIndex + 1 === board[rowIndex].length ||
    typeof board[rowIndex][columnIndex + 1] !== "number"
  ) {
    return [rowIndex, columnIndex];
  }
  return getNumberEndIndex(rowIndex, columnIndex + 1);
};

const getNumberNeighbours = (rowIndex, columnIndex) => {
  return [
    [rowIndex - 1, columnIndex - 1],
    [rowIndex - 1, columnIndex],
    [rowIndex - 1, columnIndex + 1],
    [rowIndex, columnIndex - 1],
    [rowIndex, columnIndex + 1],
    [rowIndex + 1, columnIndex - 1],
    [rowIndex + 1, columnIndex],
    [rowIndex + 1, columnIndex + 1],
  ].filter(
    ([rowIndex, columnIndex]) =>
      rowIndex >= 0 &&
      rowIndex < board.length &&
      columnIndex >= 0 &&
      columnIndex < board[rowIndex].length &&
      typeof board[rowIndex][columnIndex] === "number"
  );
};

const getNumber = (rowIndex, columnIndex, multiplier = 1) => {
  if (columnIndex - 1 < 0 || !/[0-9]/.test(board[rowIndex][columnIndex - 1])) {
    return board[rowIndex][columnIndex] * multiplier;
  }
  return (
    board[rowIndex][columnIndex] * multiplier +
    getNumber(rowIndex, columnIndex - 1, multiplier * 10)
  );
};

const distinctNumbers = new Map();

symbols
  .map(([rowIndex, columnIndex]) => {
    return getNumberNeighbours(rowIndex, columnIndex);
  })
  .forEach((neighbours) => {
    neighbours.forEach(([rowIndex, columnIndex]) => {
      const [i, j] = getNumberEndIndex(rowIndex, columnIndex);
      distinctNumbers.set(`${i},${j}`, getNumber(i, j));
    });
  });

let sum = Array.from(distinctNumbers.values()).reduce((a, b) => a + b, 0);

console.log("--- Part One ---");
console.log(
  `The sum of all of the part numbers in the engine schematic is: \x1b[32m${sum}\x1b[0m`
);
