#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_2/part_1/2024_day2_part1.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { filterSaveReports, parseReports } from "../fusion-utils.ts";
import { uploadSolution } from "@output";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/2/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  .parseLines(parseReports)
  .getParsed();

const safeReports = filterSaveReports(parsed);
console.log("Safe reports:");
console.log(safeReports);

console.log("Submitting the result: ", safeReports.length);

await uploadSolution(
  "https://adventofcode.com/2024/day/2/answer",
  "1",
  safeReports.length.toString(),
  sessionCookie,
);
