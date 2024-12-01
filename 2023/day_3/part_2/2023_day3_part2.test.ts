import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";

import { assertEquals } from "jsr:@std/assert";
import { extractGears, parseEngineSchematic } from "../gear-ratios.ts";

describe("Advent of Code 2023, Day 3, Part 2", () => {
  test("should be able to solve example", () => {
    const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

    const parsed = new InputParser(input)
      .printInput()
      .parseLines(parseEngineSchematic)
      .printParsed()
      .getParsed();

    const gears = extractGears(parsed);

    const sumOfGearRatios = gears.map((gear) => gear.gearRatio)
      .reduce((sum, part) => sum + part, 0);

    assertEquals(sumOfGearRatios, 467835);
  });
});
