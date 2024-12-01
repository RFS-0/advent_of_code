import { describe, test } from 'jsr:@std/testing/bdd';
import { InputParser } from '@input';

import { assertEquals } from 'jsr:@std/assert';
import { extractEngineParts, parseEngineSchematic } from "../gear-ratios.ts";

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

    const engineParts = extractEngineParts(parsed);

    const sumOfEngineParts = engineParts.map((part) => part.value)
      .reduce((sum, part) => sum + part, 0);

    assertEquals(sumOfEngineParts, 4361);
  });
});
