import { describe, test } from "jsr:@std/testing/bdd";

import { assertEquals } from "jsr:@std/assert";
import { InputParser } from "@input";
import { countMas, countXmas, parseBlocks, parseXmas } from "../xmas-utils.ts";

describe("Advent of Code 2024, Day 4, Part 2", () => {
  test("should be able to solve example", () => {
    const input = `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`;

    const parsed = new InputParser(input)
      //.printInput()
      .parseLines((input) => parseBlocks(input, 3))
      .getParsed();

    let result = countMas(parsed);

    assertEquals(result, 9);
  });
});
