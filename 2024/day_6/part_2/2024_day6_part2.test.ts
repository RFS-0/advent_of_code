import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";
import {
  countVisitedCells,
  determineValidObstacles,
  extractObstacleCandidates,
  originalGuardRoute,
  parseInput,
} from "../guard-utils.ts";
import { assertEquals } from "jsr:@std/assert@^1.0.8/equals";

describe("Advent of Code 2024, Day 6, Part 1", () => {
  test("should be able to solve example", () => {
    const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

    const parsed = new InputParser(input)
      //.printInput()
      .parseLines(parseInput)
      .getParsed();
    const parsedCopy = JSON.parse(JSON.stringify(parsed));

    const labWithOriginalRoute = originalGuardRoute(parsed);
    const count = countVisitedCells(labWithOriginalRoute);
    const obstacleCandidates = extractObstacleCandidates(labWithOriginalRoute);
    const validObstacleCount = determineValidObstacles(
      JSON.parse(JSON.stringify(parsedCopy)),
      obstacleCandidates,
    );

    assertEquals(count, 41);
    assertEquals(obstacleCandidates.length, 41);
    assertEquals(validObstacleCount.length, 6);
  });
});
