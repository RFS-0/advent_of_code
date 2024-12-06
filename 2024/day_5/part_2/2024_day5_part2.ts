#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_4/part_2/2024_day4_part2.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import {
  filterCorrectUpdates,
  fixIncorrectUpdates,
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
const idsOfCorrectUpdates = new Set(correctUpdates.map((u) => u.line));
const incorrectUpdates = parsed.updates.filter((update) =>
  !idsOfCorrectUpdates.has(update.line)
);
const fixedUpdates = fixIncorrectUpdates({
  pageOrderingRules: parsed.pageOrderingRules,
  updates: incorrectUpdates,
});

let total = 0;
for (const correctUpdate of fixedUpdates) {
  const middlePageNumber = mapToMiddlePageNumber(correctUpdate);
  total += middlePageNumber;
}

console.log('submitting: ', total)

// 6479 too high
// 6311

await uploadSolution(
  "https://adventofcode.com/2024/day/5/answer",
  "2",
  total.toString(),
  sessionCookie,
);
