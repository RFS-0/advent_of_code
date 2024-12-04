#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_4/part_2/2024_day4_part2.ts <session_cookie>

import {downloadInput, readSessionToken} from "@input";
import {uploadSolution} from "@output";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/4/input",
  sessionCookie,
);

const result = 0;

console.log("submitting the result: ", result);

await uploadSolution(
  "https://adventofcode.com/2024/day/4/answer",
  "2",
  result.toString(),
  sessionCookie,
);
