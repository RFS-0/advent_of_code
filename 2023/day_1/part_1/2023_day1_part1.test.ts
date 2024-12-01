import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";

import { assertEquals } from "jsr:@std/assert";
import { convertWithRulesForPart1 } from "../calibration-values.ts";

describe("Advent of Code 2023, Day 1, Part 1", () => {
  test("should be able to solve example", () => {
    const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

    const inputParser = (raw: string) =>
      raw.split("\n").filter((line) => line.length > 0);
    const extractedCalibrationValues = new InputParser(input)
      .printInput()
      .parseLines(inputParser)
      .printParsed()
      .getParsed()
      .map(convertWithRulesForPart1);

    console.log(JSON.stringify(extractedCalibrationValues, null, 2));

    const result = extractedCalibrationValues
      .reduce((acc, current) => acc + current, 0);

    assertEquals(result, 142);
  });
});
