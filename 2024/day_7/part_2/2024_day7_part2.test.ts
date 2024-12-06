import {describe, test} from "jsr:@std/testing/bdd";
import {InputParser} from "@input";
import {solve,} from "../day7-utils.ts";
import {assertEquals} from "jsr:@std/assert@^1.0.8/equals";

describe("Advent of Code 2024, Day 7, Part 1", () => {
  test("should be able to solve example", () => {
    const input = ``;

    const parsed = new InputParser(input)
      .parseLines((s) => s)
      .getParsed();

    const result = solve(parsed);

    assertEquals(result, 0);
  });
});
