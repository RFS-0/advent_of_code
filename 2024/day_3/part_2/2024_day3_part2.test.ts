import { describe, test } from "jsr:@std/testing/bdd";

import { assertEquals } from "jsr:@std/assert";
import { parseMultipliesWithDoDont, sumMultiplies } from "../memory-utils.ts";
import { InputParser } from "@input";

describe("Advent of Code 2024, Day 3, Part 2", () => {
  test("should be able to solve example", () => {
    const input =
      `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

    const parsed = new InputParser(input)
      .parseLines(parseMultipliesWithDoDont)
      .getParsed();

    const result = sumMultiplies(parsed);

    assertEquals(result, 48);
  });
});
