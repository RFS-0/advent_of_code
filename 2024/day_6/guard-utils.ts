import { splitByNewLine } from "@strings";
import { createMatrix, printMatrix } from "@arrays";

export const parseInput = (input: string) => {
  let lab: Lab = {
    step: 0,
    guardPosCol: 0,
    guardPosRow: 0,
    guardDirection: [],
    guardDirection2: 0,
    matrix: [],
  };
  const rows = splitByNewLine(input);
  const colCount = rows[0].length;
  const matrix = createMatrix(rows.length, colCount, " ");
  lab.matrix = matrix;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      matrix[i][j] = rows[i].charAt(j);
      if (matrix[i][j] === "^") {
        lab = {
          ...lab,
          guardDirection: [-1, 0],
          guardPosRow: i,
          guardPosCol: j,
        };
      }
    }
  }
  return lab;
};

const nextPos = (x: number, y: number, direction: number[]) => {
  return [x + direction[0], y + direction[1]];
};

const nextIsOutside = (lab: Lab) => {
  const next = nextPos(lab.guardPosRow, lab.guardPosCol, lab.guardDirection);
  const nextValue = lab.matrix[next[0]] && lab.matrix[next[0]][next[1]];
  return nextValue === undefined;
};

const canMoveForward = (lab: Lab) => {
  const next = nextPos(lab.guardPosRow, lab.guardPosCol, lab.guardDirection);
  const nextValue = lab.matrix[next[0]][next[1]];
  return nextValue !== undefined && nextValue !== "#";
};

const moveGuard = (lab: Lab) => {
  if (nextIsOutside(lab)) {
    lab.matrix[lab.guardPosRow][lab.guardPosCol] = "X";
    return false;
  }
  if (canMoveForward(lab)) {
    lab.matrix[lab.guardPosRow][lab.guardPosCol] = "X";
    lab.step;
    const [newX, newY] = nextPos(
      lab.guardPosRow,
      lab.guardPosCol,
      lab.guardDirection,
    );
    lab.guardPosRow = newX;
    lab.guardPosCol = newY;
  } else {
    turnRight(lab);
  }
  return true;
};

const moveGuard2 = (lab: Lab) => {
  if (nextIsOutside(lab)) {
    lab.matrix[lab.guardPosRow][lab.guardPosCol] = "X";
    return false;
  }
  if (canMoveForward(lab)) {
    lab.matrix[lab.guardPosRow][lab.guardPosCol] = lab.guardDirection2 + "";
    lab.step;
    const [newX, newY] = nextPos(
      lab.guardPosRow,
      lab.guardPosCol,
      lab.guardDirection,
    );
    lab.guardPosRow = newX;
    lab.guardPosCol = newY;
  } else {
    turnRight(lab);
  }
  return true;
};

const turnRight = (lab: Lab) => {
  lab.guardDirection2 = (lab.guardDirection2 + 1) % 4;
  lab.guardDirection = directions[lab.guardDirection2];
};

const directions = [
  // up
  [-1, 0],
  // right
  [0, 1],
  // down
  [1, 0],
  // left
  [0, -1],
];

export const countVisitedCells = (lab: Lab) => {
  let count = 0;
  for (let i = 0; i < lab.matrix.length; i++) {
    for (let j = 0; j < lab.matrix[i].length; j++) {
      if (lab.matrix[i][j] === "X") {
        count++;
      }
    }
  }
  return count;
};

type Lab = {
  matrix: string[][];
  step: number;
  guardPosRow: number;
  guardPosCol: number;
  guardDirection: number[];
  guardDirection2: number;
};

export const calculateGuardRoute = (lab: Lab) => {
  let guardInGrid = true;
  while (guardInGrid) {
    guardInGrid = moveGuard(lab);
  }
  printMatrix(lab.matrix);
  return countVisitedCells(lab);
};

export const originalGuardRoute = (lab: Lab) => {
  let guardInGrid = true;
  while (guardInGrid) {
    guardInGrid = moveGuard(lab);
  }
  printMatrix(lab.matrix);
  return lab;
};

type ObstacleCandidate = {
  row: number;
  col: number;
};

type ValidObstacle = ObstacleCandidate;

export const extractObstacleCandidates = (lab: Lab) => {
  const obstacleCandidates: ObstacleCandidate[] = [];
  for (let i = 0; i < lab.matrix.length; i++) {
    for (let j = 0; j < lab.matrix[i].length; j++) {
      if (lab.matrix[i][j] === "X") {
        obstacleCandidates.push({ row: i, col: j });
      }
    }
  }
  return obstacleCandidates;
};

export const isLoop = (lab: Lab) => {
  return lab.matrix[lab.guardPosRow][lab.guardPosCol] ===
    lab.guardDirection2 + "";
};

export const determineValidObstacles = (
  originalLab: Lab,
  obstacleCandidates: ObstacleCandidate[],
) => {
  const validObstacles: ValidObstacle[] = [];
  for (const candidate of obstacleCandidates) {
    const originalLabCopy = JSON.parse(JSON.stringify(originalLab));
    originalLabCopy.matrix[candidate.row][candidate.col] = "#";
    let guardInGrid = true;
    let inLoop = false;
    while (guardInGrid && !inLoop) {
      guardInGrid = moveGuard2(originalLabCopy);
      inLoop = isLoop(originalLabCopy);
    }

    if (inLoop) {
      printMatrix(originalLabCopy.matrix);
      validObstacles.push(candidate);
    }
  }
  return validObstacles;
};
