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
        if (/[*]/.test(value)) {
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

let sum = 0;
symbols
  .map(([rowIndex, columnIndex]) => {
    return getNumberNeighbours(rowIndex, columnIndex);
  })
  .filter((neighbours) => neighbours.length > 0)
  .forEach((neighbours) => {
    const indexes = new Map();
    neighbours.forEach(([rowIndex, columnIndex]) => {
      const [i, j] = getNumberEndIndex(rowIndex, columnIndex);
      indexes.set(`${i},${j}`, getNumber(i, j));
    });
    if (indexes.size === 2) {
      const [a, b] = Array.from(indexes.values());
      sum += a * b;
    }
  });

console.log("--- Part Two ---");
console.log(
  `The sum of all of the part numbers in the engine schematic is: \x1b[32m${sum}\x1b[0m`
);
