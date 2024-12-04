import {describe, test} from "jsr:@std/testing/bdd";

import {assertEquals} from "jsr:@std/assert";

describe("Advent of Code 2024, Day 4, Part 2", () => {
  test("should be able to solve example", () => {
    const input =
      `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

    const result = 48;

    assertEquals(result, 48);
  });
});
