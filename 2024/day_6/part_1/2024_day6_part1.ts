#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_6/part_1/2024_day6_part1.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import { calculateGuardRoute, parseInput } from "../guard-utils.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/6/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  .parseLines(parseInput)
  .getParsed();

const count = calculateGuardRoute(parsed);

console.log("submitting result: ", count);

await uploadSolution(
  "https://adventofcode.com/2024/day/6/answer",
  "1",
  count.toString(),
  sessionCookie,
);
