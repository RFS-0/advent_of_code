#!/usr/bin/env -S deno run --allow-net --allow-env

// execute from root with: deno run --allow-net 2023/day_1/part_1/2023_day1_part1.ts <session_cookie>

import { downloadInput, InputParser, readSessionToken } from '@input';
import { calculateSimilarityScore, extractLocationIds, sort, UnsortedLocationIdLists } from '../location-id-utils.ts';
import { mapItems } from '@arrays';

const sessionCookie = readSessionToken();
const input = await downloadInput(
  "https://adventofcode.com/2024/day/1/input",
  sessionCookie,
);

const inputParser = (raw: string) =>
  raw.split("\n").filter((line) => line.length > 0);
const extractedLocationIdLines = new InputParser(input)
  .printInput()
  .parseLines(inputParser)
  .printParsed()
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
const similarityScore = calculateSimilarityScore(sortedLocationIdLists);

console.log("The result is: ", similarityScore.value);
