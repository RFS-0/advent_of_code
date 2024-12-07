import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";
import { assertEquals } from "jsr:@std/assert@^1.0.8/equals";
import { filterPossibleEquations, filterPossibleEquations2, parseEquations } from "../bridge-utils.ts";

describe("Advent of Code 2024, Day 7, Part 2", () => {
  test("should be able to solve example", () => {
    const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

    const parsed = new InputParser(input)
      .parseLines(parseEquations)
      .printParsed()
      .getParsed();

    const sumOfPossibleResults = filterPossibleEquations2(parsed)
      .map((possible) => possible.result)
      .reduce((sum, possible) => sum + possible, 0);
    console.log("possible", sumOfPossibleResults);

    assertEquals(sumOfPossibleResults, 11387);
  });
});
