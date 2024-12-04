#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2023/day_1/part_1/2023_day1_part1.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { convertWithRulesForPart1 } from "../calibration-values.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2023/day/1/input",
  sessionCookie,
);

const parser = (raw: string) =>
  raw.split("\n").filter((line) => line.length > 0);
const calibrationValues = new InputParser(input)
  .parseLines(parser)
  .getParsed()
  .map(convertWithRulesForPart1);

const result = calibrationValues
  .reduce((acc, current) => acc + current, 0);

console.log("The result is: ", result);
