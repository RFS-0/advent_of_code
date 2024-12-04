import {
  columns,
  columnsReversed,
  createMatrix,
  diagonals,
  diagonalsReversed,
  rows,
  rowsReversed,
} from "@arrays";
import { splitByNewLine, splitToStringMatrix } from "@strings";

export function parseXmas(input: string) {
  const lines = splitByNewLine(input);
  const numberOfRows = lines.length;
  const numberOfCols = lines[0].length;

  const matrix: string[][] = createMatrix(numberOfRows, numberOfCols, "");

  for (let i = 0; i < numberOfRows; i++) {
    const line = lines[i];
    for (let j = 0; j < numberOfCols; j++) {
      matrix[i][j] = line.charAt(j);
    }
  }
  return matrix;
}
export function countXmas(matrix: string[][]) {
  let xmasCount = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "X") {
        // up
        xmasCount += xmasMatch(
          matrix,
          i,
          j,
          -1,
          0,
          "MAS",
        );
        // down
        xmasCount += xmasMatch(
          matrix,
          i,
          j,
          1,
          0,
          "MAS",
        );
        // left
        xmasCount += xmasMatch(
          matrix,
          i,
          j,
          0,
          -1,
          "MAS",
        );
        // right
        xmasCount += xmasMatch(
          matrix,
          i,
          j,
          0,
          1,
          "MAS",
        );
        // left-down
        xmasCount += xmasMatch(
          matrix,
          i,
          j,
          1,
          -1,
          "MAS",
        );
        // left-up
        xmasCount += xmasMatch(
          matrix,
          i,
          j,
          -1,
          -1,
          "MAS",
        );
        // right-down
        xmasCount += xmasMatch(
          matrix,
          i,
          j,
          1,
          1,
          "MAS",
        );
        // right-up
        xmasCount += xmasMatch(
          matrix,
          i,
          j,
          -1,
          1,
          "MAS",
        );
      }
    }
  }
  return xmasCount;
}

function xmasMatch(
  matrix: string[][],
  row: number,
  col: number,
  xDelta: number,
  yDelta: number,
  remaining: string,
) {
  if (remaining.length === 0) {
    return 1;
  }
  const maxRow = matrix.length - 1;
  const maxCol = matrix[0].length - 1;
  const newRow = row + xDelta;
  const newCol = col + yDelta;
  if (newRow > maxRow || newCol > maxCol || newCol < 0 || newRow < 0) {
    return 0;
  }
  const matches = matrix[newRow][newCol] === remaining[0];
  if (!matches) {
    return 0;
  }
  return xmasMatch(
    matrix,
    newRow,
    newCol,
    xDelta,
    yDelta,
    remaining.substring(1),
  );
}

export const parseBlocks = (input: string, size: number) => {
  const matrix = splitToStringMatrix(input);
  const maxRowIndex = matrix.length - size + 1;
  const maxColIndex = matrix.length - size + 1;
  if (maxRowIndex < 0 || maxColIndex < 0) {
    throw new Error(`input to small to parse a block of size ${size}`);
  }
  const blocks: string[][][] = [];
  for (let i = 0; i < maxRowIndex; i++) {
    for (let j = 0; j < maxColIndex; j++) {
      const block: string[][] = createMatrix(size, size, "");
      for (let k = 0; k < size; k++) {
        for (let l = 0; l < size; l++) {
          block[k][l] = matrix[i + k][j + l];
        }
      }
      blocks.push(block);
    }
  }
  return blocks;
};

export const countMas = (blocks: string[][][]) => {
  let xmasCount = 0;
  for (const block of blocks) {
    const xmasInDiagonals = diagonals(block)
      .flatMap((v) => v.join(""))
      .map((s) => s === "MAS" ? 1 : 0 as number)
      .reduce((sum, value) => sum + value, 0);
    const xmasInDiagonalsReverse = diagonalsReversed(block)
      .flatMap((v) => v.join(""))
      .map((s) => s === "MAS" ? 1 : 0 as number)
      .reduce((sum, value) => sum + value, 0);

    if (xmasInDiagonals + xmasInDiagonalsReverse === 2) {
      xmasCount += 1;
    }
  }
  return xmasCount;
};
