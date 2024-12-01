import { describe, test } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { isDigit, mapString, mapStringReverse } from "@strings";

describe("The string utilities", () => {
  describe("when checking for digits for all ASCII chars", () => {
    // Digit codes are: 48-57
    const DIGIT_ASCII_CODES = Array.from({ length: 10 }, (_, i) => 48 + i);
    // Non-digit codes are all other codes
    const NON_DIGIT_ASCII_CODES = Array.from({ length: 128 }, (_, i) => i)
      .filter(
        (code) => !DIGIT_ASCII_CODES.includes(code),
      );
    test("should identify all digits", () => {
      // given: all ASCII codes for digits
      for (const charCode of DIGIT_ASCII_CODES) {
        const char = String.fromCharCode(charCode);

        // when
        const result = isDigit(char);

        // then
        assertEquals(result, true, `Failed for digit: ${char}`);
      }
    });

    test("should identify all non-digit ASCII characters", () => {
      // given: all ASCII codes for non-digits
      for (const charCode of NON_DIGIT_ASCII_CODES) {
        const char = String.fromCharCode(charCode);

        // when
        const result = isDigit(char);

        // then
        assertEquals(result, false, `Failed for non-digit: ${char}`);
      }
    });
  });

  describe("when iterating over a string", () => {
    type IterationMatch = {
      index: number;
      originalValue: string;
      mappedValue: string;
    };

    type IterationMiss = {
      index: number;
      originalValue: string;
      mappedValue: string;
    };
    test("should identify matches by default", () => {
      // given
      const someString = "abca";

      // when
      const accumulator = mapString(
        () => ([] as IterationMatch[]),
        someString,
        (value) => value === "a" || value === "c",
        (acc, char, i) => (acc.push({
          index: i,
          originalValue: char,
          mappedValue: char + "-mapped",
        } as IterationMatch)),
      );

      // then
      assertEquals(accumulator, [
        {
          index: 0,
          originalValue: "a",
          mappedValue: "a-mapped",
        },
        {
          index: 2,
          originalValue: "c",
          mappedValue: "c-mapped",
        },
        {
          index: 3,
          originalValue: "a",
          mappedValue: "a-mapped",
        },
      ]);
    });

    test("should identify misses by default", () => {
      // given
      const someString = "abca";

      // when
      const accumulator = mapString(
        () => ([] as IterationMiss[]),
        someString,
        (value) => value === "a" || value === "c",
        () => {},
        () => false,
        (acc, char, i) => (acc.push({
          index: i,
          originalValue: char,
          mappedValue: char + "-mapped",
        } as IterationMiss)),
      );

      // then
      assertEquals(accumulator, [
        {
          index: 1,
          originalValue: "b",
          mappedValue: "b-mapped",
        },
      ]);
    });

    test("should identify first match if we break on match", () => {
      // given
      const someString = "abca";

      // when
      const accumulator = mapString(
        () => ([] as IterationMatch[]),
        someString,
        (value) => value === "a" || value === "c",
        (acc, char, i) => (acc.push({
          index: i,
          originalValue: char,
          mappedValue: char + "-mapped",
        } as IterationMatch)),
        () => true,
      );

      // then
      assertEquals(accumulator, [
        {
          index: 0,
          originalValue: "a",
          mappedValue: "a-mapped",
        },
      ]);
    });

    test("should identify first miss if we break on miss", () => {
      // given
      const someString = "abbca";

      // when
      const accumulator = mapString(
        () => ([] as IterationMiss[]),
        someString,
        (value) => value === "a" || value === "c",
        () => {},
        () => false,
        (acc, char, i) => (acc.push({
          index: i,
          originalValue: char,
          mappedValue: char + "-mapped",
        } as IterationMiss)),
        () => true,
      );

      // then
      assertEquals(accumulator, [
        {
          index: 1,
          originalValue: "b",
          mappedValue: "b-mapped",
        },
      ]);
    });
  });

  describe("when iterating reverse over a string", () => {
    type IterationMatch = {
      index: number;
      originalValue: string;
      mappedValue: string;
    };
    test("should identify matches by default", () => {
      // given
      const someString = "abca";

      // when
      const accumulator = mapStringReverse(
        () => ([] as IterationMatch[]),
        someString,
        (value) => value === "a" || value === "c",
        (acc, char, i) => (acc.push({
          index: i,
          originalValue: char,
          mappedValue: char + "-mapped",
        } as IterationMatch)),
      );

      // then
      assertEquals(accumulator, [
        {
          index: 3,
          originalValue: "a",
          mappedValue: "a-mapped",
        },
        {
          index: 2,
          originalValue: "c",
          mappedValue: "c-mapped",
        },
        {
          index: 0,
          originalValue: "a",
          mappedValue: "a-mapped",
        },
      ]);
    });

    test("should identify first match if we break on match", () => {
      // given
      const someString = "abca";

      // when
      const accumulator = mapStringReverse(
        () => ([] as IterationMatch[]),
        someString,
        (value) => value === "a" || value === "c",
        (acc, char, i) => (acc.push({
          index: i,
          originalValue: char,
          mappedValue: char + "-mapped",
        } as IterationMatch)),
        () => true,
      );

      // then
      assertEquals(accumulator, [
        {
          index: 3,
          originalValue: "a",
          mappedValue: "a-mapped",
        },
      ]);
    });
  });
});
