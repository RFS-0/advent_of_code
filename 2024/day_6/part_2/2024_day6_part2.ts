#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2024/day_6/part_2/2024_day6_part2.ts <session_cookie>

import {downloadInput, InputParser, readSessionToken} from "@input";
import {uploadSolution} from "@output";
import {
    countVisitedCells,
    determineValidObstacles,
    extractObstacleCandidates,
    originalGuardRoute,
    parseInput
} from "../guard-utils.ts";

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/6/input",
  sessionCookie,
);

const parsed = new InputParser(input)
    //.printInput()
    .parseLines(parseInput)
    .getParsed();
const parsedCopy = JSON.parse(JSON.stringify(parsed));

const labWithOriginalRoute = originalGuardRoute(parsed);
const obstacleCandidates = extractObstacleCandidates(labWithOriginalRoute);
const validObstacleCount = determineValidObstacles(
    JSON.parse(JSON.stringify(parsedCopy)),
    obstacleCandidates,
);

await uploadSolution(
  "https://adventofcode.com/2024/day/6/answer",
  "2",
  validObstacleCount.length.toString(),
  sessionCookie,
);
