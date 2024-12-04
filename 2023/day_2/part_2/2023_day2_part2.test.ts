import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";

import { assertEquals } from "jsr:@std/assert";
import {
  mapToFewestNumberOfCubesPerColor,
  parseGames,
} from "../cube-conondrum.ts";

describe("Advent of Code 2023, Day 2, Part 2", () => {
  test("should be able to solve example", () => {
    const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

    const parsed = new InputParser(input)
      .parseLines(parseGames)
      .getParsed();

    let totalPowerOfCubeSets = 0;
    const gameIdsToFewestCubesPerColor = mapToFewestNumberOfCubesPerColor(
      parsed,
    );
    for (const gameIdToFewestCubesPerColor of gameIdsToFewestCubesPerColor) {
      const fewestNumberOfCubesPerColor =
        gameIdToFewestCubesPerColor.fewestNumberOfCubesPerColor;
      const powerOfCubes = fewestNumberOfCubesPerColor.minRedCubeCount *
        fewestNumberOfCubesPerColor.minGreenCubeCount *
        fewestNumberOfCubesPerColor.minBlueCubeCount;
      totalPowerOfCubeSets += powerOfCubes;
    }

    assertEquals(totalPowerOfCubeSets, 2286);
  });
});
