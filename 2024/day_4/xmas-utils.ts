import { createMatrix } from "@arrays";
import { splitByNewLine } from "@strings";

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
