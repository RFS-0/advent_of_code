import { describe, test } from "jsr:@std/testing/bdd";
import { InputParser } from "@input";

import { assertEquals } from "jsr:@std/assert";
import { filterPossibleGames, parseGames } from "../cube-conondrum.ts";

describe("Advent of Code 2023, Day 2, Part 1", () => {
  test("should be able to solve example", () => {
    const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

    const parsed = new InputParser(input)
      .printInput()
      .parseLines(parseGames)
      .printParsed()
      .getParsed();

    const possibleGames = filterPossibleGames(parsed, {
      maxRedCubeCount: 12,
      maxGreenCubeCount: 13,
      maxBlueCubeCount: 14,
    });

    const sumOfIdsOfPossibleGames = possibleGames.map((game) => game.id)
      .map((gameId) => parseInt(gameId))
      .reduce((a, b) => a + b, 0);

    assertEquals(sumOfIdsOfPossibleGames, 8);
  });
});
