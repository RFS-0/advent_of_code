#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_4/part_2/2024_day4_part2.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import { countMas, parseBlocks } from "../xmas-utils.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/4/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  //.printInput()
  .parseLines((input) => parseBlocks(input, 3))
  .getParsed();

let result = countMas(parsed);

console.log("submitting the result: ", result);

await uploadSolution(
  "https://adventofcode.com/2024/day/4/answer",
  "2",
  result.toString(),
  sessionCookie,
);
