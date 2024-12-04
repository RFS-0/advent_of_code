import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";

import { assertEquals } from "jsr:@std/assert";
import {
  calculateDistance,
  extractLocationIds,
  sort,
  UnsortedLocationIdLists,
} from "../location-id-utils.ts";
import { mapItems } from "@arrays";

describe("Advent of Code 2024, Day 1, Part 1", () => {
  test("should be able to solve example", () => {
    const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

    const inputParser = (raw: string) =>
      raw.split("\n").filter((line) => line.length > 0);
    const extractedLocationIdLines = new InputParser(input)
      .parseLines(inputParser)
      .getParsed();

    const locationIdLists: UnsortedLocationIdLists = mapItems(
      () => ({
        unsortedLeftList: [],
        unsortedRightList: [],
      } as UnsortedLocationIdLists),
      extractedLocationIdLines,
      () => true,
      (accumulator, line) => {
        const locationIdPair = extractLocationIds(line);
        accumulator.unsortedLeftList.push(locationIdPair.left);
        accumulator.unsortedRightList.push(locationIdPair.right);
      },
    );

    const sortedLocationIdLists = sort(locationIdLists);
    const totalDistance = calculateDistance(sortedLocationIdLists);

    assertEquals(totalDistance.value, 11);
  });
});
