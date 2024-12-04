import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";

import { assertEquals } from "jsr:@std/assert";
import { filterSaveReports, parseReports } from "../fusion-utils.ts";

describe.skip("Advent of Code 2024, Day 2, Part 1", () => {
  test("should be able to solve example", () => {
    const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

    const parsed = new InputParser(input)
      .parseLines(parseReports)
      .getParsed();

    const safeReports = filterSaveReports(parsed);

    assertEquals(safeReports.length, 2);
  });
});
