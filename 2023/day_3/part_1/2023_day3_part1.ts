#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2023/day_3/part_1/2023_day3_part1.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import { extractEngineParts, parseEngineSchematic } from "../gear-ratios.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2023/day/3/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  .parseLines(parseEngineSchematic)
  .getParsed();

const engineParts = extractEngineParts(parsed);

const sumOfEngineParts = engineParts.map((part) => part.value)
  .reduce((sum, part) => sum + part, 0);

console.log(`Submitting the result: ${sumOfEngineParts}`);

await uploadSolution(
  "https://adventofcode.com/2023/day/3/answer",
  "1",
  sumOfEngineParts.toString(),
  sessionCookie,
);
