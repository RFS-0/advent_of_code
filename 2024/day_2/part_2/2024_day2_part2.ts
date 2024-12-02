#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_2/part_2/2024_day2_part2.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { filterSaveReportsWithDamping, parseReports } from "../fusion-utils.ts";
import { uploadSolution } from "@output";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/2/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  //.printInput()
  .parseLines(parseReports)
  //.printParsed()
  .getParsed();

const numberOfSaveReports = filterSaveReportsWithDamping(parsed).length;

console.log("submitting the result: ", numberOfSaveReports);

await uploadSolution(
  "https://adventofcode.com/2024/day/2/answer",
  "2",
  numberOfSaveReports.toString(),
  sessionCookie,
);
