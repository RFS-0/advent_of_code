#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_3/part_1/2024_day3_part1.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import { parseMultiplies, sumMultiplies } from "../memory-utils.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/3/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  .printInput()
  .parseLines(parseMultiplies)
  .printParsed()
  .getParsed();

const result = sumMultiplies(parsed);

await uploadSolution(
  "https://adventofcode.com/2024/day/3/answer",
  "1",
  result.toString(),
  sessionCookie,
);
