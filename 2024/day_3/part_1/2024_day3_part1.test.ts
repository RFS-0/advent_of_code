import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";

import { assertEquals } from "jsr:@std/assert";
import {parseMultiplies, sumMultiplies} from "../memory-utils.ts";

describe("Advent of Code 2024, Day 3, Part 1", () => {
  test("should be able to solve example", () => {
    const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

    const parsed = new InputParser(input)
      .parseLines(parseMultiplies)
      .getParsed();

    const result = sumMultiplies(parsed);

    assertEquals(result, 161);
  });
});
