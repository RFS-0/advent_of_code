#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2023/day_2/part_2/2023_day2_part2.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from "@input";
import { uploadSolution } from "@output";
import {
  mapToFewestNumberOfCubesPerColor,
  parseGames,
} from "../cube-conondrum.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2023/day/2/input",
  sessionCookie,
);

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

console.log("Submitting the result ", totalPowerOfCubeSets);

await uploadSolution(
  "https://adventofcode.com/2023/day/2/answer",
  "2",
  totalPowerOfCubeSets.toString(),
  sessionCookie,
);
