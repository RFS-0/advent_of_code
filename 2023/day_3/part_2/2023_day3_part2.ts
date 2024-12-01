#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2023/day_3/part_2/2023_day3_part2.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import { extractGears, parseEngineSchematic } from "../gear-ratios.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2023/day/3/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  .printInput()
  .parseLines(parseEngineSchematic)
  .printParsed()
  .getParsed();

const gears = extractGears(parsed);

const sumOfGearRatios = gears.map((gear) => gear.gearRatio)
  .reduce((sum, part) => sum + part, 0);

console.log(`Submitting the result: ${sumOfGearRatios}`);

await uploadSolution(
  "https://adventofcode.com/2023/day/3/answer",
  "2",
  sumOfGearRatios.toString(),
  sessionCookie,
);
