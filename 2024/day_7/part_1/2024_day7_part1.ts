#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_7/part_1/2024_day7_part1.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import { solve } from "../day7-utils.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/7/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  .parseLines((s) => s)
  .getParsed();

const result = solve(parsed);

await uploadSolution(
  "https://adventofcode.com/2024/day/7/answer",
  "1",
  result.toString(),
  sessionCookie,
);
