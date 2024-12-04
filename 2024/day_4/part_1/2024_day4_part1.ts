#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_4/part_1/2024_day4_part1.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import { countXmas, parseXmas } from "../xmas-utils.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/4/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  //.printInput()
  .parseLines(parseXmas)
  //.printParsed()
  .getParsed();

console.log(parsed);

let result = countXmas(parsed);

await uploadSolution(
  "https://adventofcode.com/2024/day/4/answer",
  "1",
  result.toString(),
  sessionCookie,
);
