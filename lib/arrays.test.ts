import { describe, test } from "jsr:@std/testing/bdd";
import { assertEquals } from "jsr:@std/assert";
import {
  concat,
  excludeByKey,
  mapItems,
  mapItemsReverse,
  sortDecreasingByKey,
  sortIncreasingByKey,
} from "@arrays";

describe("The array utilities", () => {
  type Item = {
    value: number;
  };
  type IterationMatch = {
    index: number;
    originalValue: Item;
    mappedValue: string;
  };
  type IterationMiss = {
    index: number;
    originalValue: Item;
    mappedValue: string;
  };
  describe("when iterating over an array", () => {
    test("should identify matches by default", () => {
      // given
      const items: Item[] = [
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

      // when
      const accumulator = mapItems(
        () => ([] as IterationMatch[]),
        items,
        (item) => item.value === 1 || item.value === 3,
        (acc, item, i) => (acc.push({
          index: i,
          originalValue: item,
          mappedValue: item.value + "-mapped",
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
      const items: Item[] = [
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

      // when
      const accumulator = mapItems(
        () => ([] as IterationMatch[]),
        items,
        (item) => item.value === 1 || item.value === 3,
        (acc, item, i) => (acc.push({
          index: i,
          originalValue: item,
          mappedValue: item.value + "-mapped",
        } as IterationMatch)),
        () => true,
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

  describe("when iterating reverse over an array", () => {
    test("should identify matches by default", () => {
      // given
      const items: Item[] = [
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

      // when
      const accumulator = mapItemsReverse(
        () => ([] as IterationMiss[]),
        items,
        (item) => item.value === 1 || item.value === 3,
        (acc, item, i) => (acc.push({
          index: i,
          originalValue: item,
          mappedValue: item.value + "-mapped",
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

    test("should identify first miss if we break on miss", () => {
      // given
      const items: Item[] = [
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

      // when
      const accumulator = mapItemsReverse(
        () => ([] as IterationMiss[]),
        items,
        (item) => item.value === 1 || item.value === 3,
        () => {},
        () => false,
        (acc, item, i) => (acc.push({
          index: i,
          originalValue: item,
          mappedValue: item.value + "-mapped",
        } as IterationMiss)),
        () => true,
      );

      // then
      assertEquals(accumulator, [
        {
          index: 1,
          mappedValue: "2-mapped",
          originalValue: {
            value: 2,
          },
        },
      ]);
    });
  });

  describe("when excluding items from array", () => {
    type Item = {
      id: number;
      value: string;
    };
    test("should excluded specified items by specified key", () => {
      // given
      const items: Item[] = [
        { id: 1, value: "val-1" },
        { id: 2, value: "val-2" },
        { id: 3, value: "val-3" },
      ];
      // NOTE: values differ intentionally form those above
      const toBeExcluded = [
        { id: 2, value: "val-1" },
        { id: 3, value: "val-2" },
      ];

      // when
      const withoutExcludedItems = excludeByKey(items, toBeExcluded, "id");

      // then
      assertEquals(withoutExcludedItems, [{ id: 1, value: "val-1" }]);
    });
  });

  describe("when sorting items of array", () => {
    type Item = {
      id: number;
      value: string;
    };
    test("can sort increasing by key", () => {
      // given
      const items: Item[] = [
        { id: 3, value: "val-3" },
        { id: 2, value: "val-2" },
        { id: 1, value: "val-1" },
      ];

      // when
      const sortedById = sortIncreasingByKey(items, "id");

      // then
      const expected: Item[] = [
        { id: 1, value: "val-1" },
        { id: 2, value: "val-2" },
        { id: 3, value: "val-3" },
      ];
      assertEquals(sortedById, expected);
    });

    test("can sort decreasing by key", () => {
      // given
      const items: Item[] = [
        { id: 1, value: "val-1" },
        { id: 2, value: "val-2" },
        { id: 3, value: "val-3" },
      ];

      // when
      const sortedById = sortDecreasingByKey(items, "id");

      // then
      const expected: Item[] = [
        { id: 3, value: "val-3" },
        { id: 2, value: "val-2" },
        { id: 1, value: "val-1" },
      ];
      assertEquals(sortedById, expected);
    });
  });

  describe("when concatenating arrays", () => {
    type Item = {
      id: number;
      value: string;
    };
    test("can concat two arrays", () => {
      // given
      const items: Item[] = [
        { id: 1, value: "val-1" },
      ];
      const otherItems: Item[] = [
        { id: 2, value: "val-2" },
        { id: 3, value: "val-3" },
      ];

      // when
      const concatenation = concat(items, otherItems);

      // then
      const expected: Item[] = [
        { id: 1, value: "val-1" },
        { id: 2, value: "val-2" },
        { id: 3, value: "val-3" },
      ];
      assertEquals(concatenation, expected);
    });
  });
});
