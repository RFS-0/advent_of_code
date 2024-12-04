import {describe, test} from "jsr:@std/testing/bdd";

import {assertEquals} from "jsr:@std/assert";
import {filterSaveReportsWithDamping, isSaveWhenDamped, parseReports, Report,} from "../fusion-utils.ts";
import { InputParser } from "@input";

describe("Advent of Code 2024, Day 2, Part 2", () => {
  test("should be able to solve example", () => {
    const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

    const parsed = new InputParser(input)
      .parseLines(parseReports)
      .getParsed();

    const safeReports = filterSaveReportsWithDamping(parsed);
    console.log(safeReports.map((r) => r.id));
    const numberOfSaveReports = safeReports.length;
    assertEquals(numberOfSaveReports, 4);
  });

  test("can identify safe report with damping", () => {
    // given
    const unsafeReport: Report = {
      id: 1,
      levels: [
        { value: 8 },
        { value: 6 },
        { value: 4 },
        { value: 4 },
        { value: 1 },
      ],
    };

    // when
    const isSave = isSaveWhenDamped(unsafeReport);

    // then
    assertEquals(isSave, true);
  });

  test("can identify unsafe report with damping", () => {
    // given
    const unsafeReport: Report = {
      id: 2,
      levels: [
        { value: 1 },
        { value: 2 },
        { value: 7 },
        { value: 8 },
        { value: 9 },
      ],
    };

    // when
    const isSave = isSaveWhenDamped(unsafeReport);

    // then
    assertEquals(isSave, false);
  });
});
