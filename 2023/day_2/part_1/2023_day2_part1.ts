#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2023/day_2/part_1/2023_day2_part1.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import { filterPossibleGames, parseGames } from "../cube-conondrum.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2023/day/2/input",
  sessionCookie,
);

const parsed = new InputParser(input)
  .parseLines(parseGames)
  .getParsed();

const possibleGames = filterPossibleGames(parsed, {
  maxRedCubeCount: 12,
  maxGreenCubeCount: 13,
  maxBlueCubeCount: 14,
});

const sumOfIdsOfPossibleGames = possibleGames.map((game) => game.id)
  .map((gameId) => parseInt(gameId))
  .reduce((a, b) => a + b, 0);

console.log("Submitting the result ", sumOfIdsOfPossibleGames);

await uploadSolution(
  "https://adventofcode.com/2023/day/2/answer",
  "1",
  sumOfIdsOfPossibleGames.toString(),
  sessionCookie,
);
