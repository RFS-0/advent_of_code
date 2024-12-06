#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_5/part_1/2024_day5_part1.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import {
  filterCorrectUpdates,
  mapToMiddlePageNumber,
  parseInput,
} from "../safety-manual-utils.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/5/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  //.printInput()
  .parseLines(parseInput)
  .getParsed();

const correctUpdates = filterCorrectUpdates(parsed);
console.log(
  "correct updates",
  JSON.stringify(
    [
      ...correctUpdates.map((u) =>
        `line: ${u.line}; number of pages: ${u.pages.length}; pages: ${u.pages}`
      ),
    ],
    null,
    2,
  ),
);
let total = 0;
for (const correctUpdate of correctUpdates) {
  const middlePageNumber = mapToMiddlePageNumber(correctUpdate);
  total += middlePageNumber;
}

console.log('submitting result: ', total)

await uploadSolution(
  "https://adventofcode.com/2024/day/5/answer",
  "1",
  total.toString(),
  sessionCookie,
);
