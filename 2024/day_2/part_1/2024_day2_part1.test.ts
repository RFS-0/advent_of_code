import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";

import { assertEquals } from "jsr:@std/assert";
import { parse } from "../day2-utils.ts";

describe.skip("Advent of Code 2024, Day 2, Part 1", () => {
  test("should be able to solve example", () => {
    const input = `tbd`;

    const parsed = new InputParser(input)
      .printInput()
      .parseLines(parse)
      .printParsed()
      .getParsed();

    // process parsed

    // calc result from processed

    const result = undefined;

    assertEquals(result, "tbd");
  });
});
