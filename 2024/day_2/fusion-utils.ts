import { splitByNewLine, splitBySpace } from "@strings";
import { concat, excludeByKey } from "@arrays";

export type Level = {
  value: number;
};

export type Report = {
  id: number;
  levels: Level[];
};

export const parseReports: (input: string) => Report[] = (input) => {
  const reports: Report[] = [];
  let reportId = 1;
  for (const line of splitByNewLine(input)) {
    const levels: Level[] = [];
    for (const levelValue of splitBySpace(line)) {
      levels.push({ value: parseInt(levelValue) });
    }
    reports.push({
      id: reportId,
      levels: levels,
    });
    reportId++;
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
    diff = lastLevel.value - currentLevel.value;
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

const isSave = (report: Report) => {
  const overallDirection = determineOverallDirection(report.levels);
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
  return isSafe;
};

export const filterSaveReports = (reports: Report[]) => {
  const safeReports: Report[] = [];
  for (const report of reports) {
    const overallDirection = determineOverallDirection(report.levels);

    // no need to iterate again
    if (overallDirection === "constant") {
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

export const isSaveWhenDamped = (report: Report) => {
  let index = 0;
  while (index < report.levels.length) {
    const copy = [...report.levels];
    copy.splice(index, 1);
    const subReport = { id: report.id, levels: copy };
    const isSubReportSave = isSave(subReport);
    if (isSubReportSave) {
      return true;
    }
    index++;
  }
  return false;
};

const filterSaveWhenDamped = (potentiallySafeReports: Report[]) => {
  const safeReports: Report[] = [];
  for (const potentiallySaveReport of potentiallySafeReports) {
    const isSave = isSaveWhenDamped(potentiallySaveReport);
    if (isSave) {
      safeReports.push(potentiallySaveReport);
    }
  }
  return safeReports;
};

export const filterSaveReportsWithDamping = (reports: Report[]) => {
  const safeReports = filterSaveReports(reports);
  const potentiallySaveReports = excludeByKey(reports, safeReports, "id");
  const safeReportsWhenDamped = filterSaveWhenDamped(potentiallySaveReports);
  return concat(safeReports, safeReportsWhenDamped);
};
