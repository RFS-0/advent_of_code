#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_2/part_2/2024_day2_part2.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { parse } from "../day2-utils.ts";
import { uploadSolution } from "@output";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/2/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  .printInput()
  .parseLines(parse)
  .printParsed()
  .getParsed();

// process parsed

// calc result from processed

const result = "tbd";

console.log("Submitting the result: ", result);

await uploadSolution(
  "https://adventofcode.com/2024/day/2/answer",
  "2",
  result,
  sessionCookie,
);
