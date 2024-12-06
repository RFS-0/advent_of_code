import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";

import { assertEquals } from "jsr:@std/assert";
import {
  filterCorrectUpdates,
  mapToMiddlePageNumber,
  parseInput,
} from "../safety-manual-utils.ts";

describe("Advent of Code 2024, Day 5, Part 1", () => {
  test("should be able to solve example", () => {
    const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

    const parsed = new InputParser(input)
      //.printInput()
      .parseLines(parseInput)
      .getParsed();

    const correctUpdates = filterCorrectUpdates(parsed);
    let total = 0;
    for (const correctUpdate of correctUpdates) {
      const middlePageNumber = mapToMiddlePageNumber(correctUpdate);
      total += middlePageNumber;
    }

    assertEquals(total, 143);
  });
});
