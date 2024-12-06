import { describe, test } from "jsr:@std/testing/bdd";

import { assertEquals } from "jsr:@std/assert";
import { InputParser } from "@input";
import {parseInput} from '../safety-manual-utils.ts';

describe("Advent of Code 2024, Day 5, Part 2", () => {
  test("should be able to solve example", () => {
    const input = ``;

    const parsed = new InputParser(input)
      //.printInput()
      .parseLines(parseInput)
      .getParsed();

    let result = 0;

    assertEquals(result, 9);
  });
});
