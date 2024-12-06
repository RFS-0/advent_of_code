import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";

import { assertEquals } from "jsr:@std/assert";
import { calculateGuardRoute, parseInput } from "../guard-utils.ts";

describe("Advent of Code 2024, Day 6, Part 1", () => {
  test("should be able to solve example", () => {
    const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

    const parsed = new InputParser(input)
      //.printInput()
      .parseLines(parseInput)
      .getParsed();

    const count = calculateGuardRoute(parsed);


    assertEquals(count, 41);
  });
});
