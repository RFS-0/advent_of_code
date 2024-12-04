import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";

import { assertEquals } from "jsr:@std/assert";
import { convertWithRulesForPart2 } from "../calibration-values.ts";

describe("Advent of Code 2023, Day 1, Part 1", () => {
  test("should be able to solve example", () => {
    const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

    const inputParser = (raw: string) =>
      raw.split("\n").filter((line) => line.length > 0);
    const extractedCalibrationValues = new InputParser(input)
      .parseLines(inputParser)
      .getParsed()
      .map(convertWithRulesForPart2);

    console.log(JSON.stringify(extractedCalibrationValues, null, 2));

    const result = extractedCalibrationValues
      .reduce((acc, current) => acc + current, 0);

    assertEquals(result, 281);
  });
});
