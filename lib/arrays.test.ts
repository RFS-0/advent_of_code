import { describe, test } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import { iterate, iterateReverse } from "@arrays";

describe("The array utilities", () => {
  type Item = {
    value: number;
  };
  type IterationMatch = {
    index: number;
    originalValue: Item;
    mappedValue: string;
  };
  describe("when iterating over an array", () => {
    test("should identify matches by default", () => {
      // given
      const values: Item[] = [
        {
          value: 1,
        },
        {
          value: 2,
        },
        {
          value: 3,
        },
      ];
      const accumulator: IterationMatch[] = [];

      // when
      iterate(
        values,
        (item) => item.value === 1 || item.value === 3,
        (match, i) => (accumulator.push({
          index: i,
          originalValue: match,
          mappedValue: match.value + "-mapped",
        } as IterationMatch)),
      );

      // then
      assertEquals(accumulator, [
        {
          index: 0,
          originalValue: {
            value: 1,
          },
          mappedValue: "1-mapped",
        },
        {
          index: 2,
          originalValue: {
            value: 3,
          },
          mappedValue: "3-mapped",
        },
      ]);
    });

    test("should identify first match if we break on match", () => {
      // given
      const values: Item[] = [
        {
          value: 1,
        },
        {
          value: 2,
        },
        {
          value: 3,
        },
      ];
      const accumulator: IterationMatch[] = [];

      // when
      iterate(
        values,
        (item) => item.value === 1 || item.value === 3,
        (match, i) => (accumulator.push({
          index: i,
          originalValue: match,
          mappedValue: match.value + "-mapped",
        } as IterationMatch)),
        true,
      );

      // then
      assertEquals(accumulator, [
        {
          index: 0,
          originalValue: {
            value: 1,
          },
          mappedValue: "1-mapped",
        },
      ]);
    });
  });

  describe("when iterating reverse over a string", () => {
    test("should identify matches by default", () => {
      // given
      const values: Item[] = [
        {
          value: 1,
        },
        {
          value: 2,
        },
        {
          value: 3,
        },
      ];
      const accumulator: IterationMatch[] = [];

      // when
      iterateReverse(
        values,
        (item) => item.value === 1 || item.value === 3,
        (match, i) => (accumulator.push({
          index: i,
          originalValue: match,
          mappedValue: match.value + "-mapped",
        } as IterationMatch)),
      );

      // then
      assertEquals(accumulator, [
        {
          index: 2,
          originalValue: {
            value: 3,
          },
          mappedValue: "3-mapped",
        },
        {
          index: 0,
          originalValue: {
            value: 1,
          },
          mappedValue: "1-mapped",
        },
      ]);
    });

    test("should identify first match if we break on match", () => {
      // given
      const values: Item[] = [
        {
          value: 1,
        },
        {
          value: 2,
        },
        {
          value: 3,
        },
      ];
      const accumulator: IterationMatch[] = [];

      // when
      iterateReverse(
        values,
        (item) => item.value === 1 || item.value === 3,
        (match, i) => (accumulator.push({
          index: i,
          originalValue: match,
          mappedValue: match.value + "-mapped",
        } as IterationMatch)),
      );

      // then
      assertEquals(accumulator, [
        {
          index: 2,
          mappedValue: "3-mapped",
          originalValue: {
            value: 3,
          },
        },
        {
          index: 0,
          mappedValue: "1-mapped",
          originalValue: {
            value: 1,
          },
        },
      ]);
    });
  });
});
