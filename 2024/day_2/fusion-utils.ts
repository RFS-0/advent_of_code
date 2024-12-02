import { splitByNewLine, splitBySpace } from "@strings";

export type Level = {
  value: number;
};

export type Report = {
  levels: Level[];
};

export const parseReports: (input: string) => Report[] = (input) => {
  const reports: Report[] = [];
  for (const line of splitByNewLine(input)) {
    const levels: Level[] = [];
    for (const levelValue of splitBySpace(line)) {
      levels.push({ value: parseInt(levelValue) });
    }
    reports.push({ levels: levels });
  }
  return reports;
};

type Direction = "increasing" | "decreasing" | "constant";

const determineOverallDirection = (levels: Level[]) => {
  let diff = 0;
  let i = 1;
  while (Math.abs(diff) === 0 && i < levels.length) {
    const lastLevel = levels[i - 1];
    const currentLevel = levels[i];
    const diff = lastLevel.value - currentLevel.value;
    if (diff === 0) {
      i++;
    } else if (diff < 0) {
      return "increasing";
    } else {
      return "decreasing";
    }
  }
  return "constant" as Direction;
};

const determineDirection: (lastLevel: Level, currentLevel: Level) => Direction =
  (lastLevel, currentLevel) => {
    if (lastLevel.value < currentLevel.value) {
      return "increasing";
    } else if (lastLevel.value > currentLevel.value) {
      return "decreasing";
    } else {
      return "constant";
    }
  };

export const filterSaveReports = (reports: Report[]) => {
  const safeReports: Report[] = [];
  for (const report of reports) {
    const overallDirection = determineOverallDirection(report.levels);

    // no need to iterate again
    if (overallDirection === "constant") {
      safeReports.push(report);
      continue;
    }
    let isSafe = true;
    // ensure direction is constant
    for (let i = 1; i < report.levels.length; i++) {
      const lastLevel = report.levels[i - 1];
      const currentLevel = report.levels[i];
      const currentDirection = determineDirection(lastLevel, currentLevel);
      if (currentDirection !== overallDirection) {
        isSafe = false;
        break;
      }
      if (Math.abs(lastLevel.value - currentLevel.value) > 3) {
        isSafe = false;
        break;
      }
    }
    if (isSafe) {
      safeReports.push(report);
    }
  }
  return safeReports;
};
