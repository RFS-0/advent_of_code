#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_3/part_2/2024_day3_part2.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import { parseMultipliesWithDoDont, sumMultiplies } from "../memory-utils.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/3/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  .printInput()
  .parseLines(parseMultipliesWithDoDont)
  .printParsed()
  .getParsed();

const result = sumMultiplies(parsed);

console.log("submitting the result: ", result);

await uploadSolution(
  "https://adventofcode.com/2024/day/3/answer",
  "2",
  result.toString(),
  sessionCookie,
);
