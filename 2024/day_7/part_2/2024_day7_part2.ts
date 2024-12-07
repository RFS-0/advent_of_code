#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_7/part_2/2024_day7_part2.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import { filterPossibleEquations2, parseEquations } from "../bridge-utils.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/7/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  .parseLines(parseEquations)
  .printParsed()
  .getParsed();

const sumOfPossibleResults = filterPossibleEquations2(parsed)
  .map((possible) => possible.result)
  .reduce((sum, possible) => sum + possible, 0);

await uploadSolution(
  "https://adventofcode.com/2024/day/7/answer",
  "2",
  sumOfPossibleResults.toString(),
  sessionCookie,
);
