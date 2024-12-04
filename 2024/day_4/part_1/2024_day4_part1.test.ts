import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";

import { assertEquals } from "jsr:@std/assert";
import { countXmas, parseXmas } from "../xmas-utils.ts";

describe("Advent of Code 2024, Day 4, Part 1", () => {
  test("should be able to solve example", () => {
    const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

    const parsed = new InputParser(input)
      //.printInput()
      .parseLines(parseXmas)
      .getParsed();

    let result = countXmas(parsed);

    assertEquals(result, 18);
  });
});
