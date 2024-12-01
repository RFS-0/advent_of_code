import {
  splitByComma,
  splitByMultiWhiteSpace,
  splitByNewLine,
  splitBySemicolon,
  splitBySpace,
} from "@strings";

export type SetOfCubes = {
  blueCubeCount: number;
  redCubeCount: number;
  greenCubeCount: number;
};

export type Game = {
  id: string;
  setsOfCubes: SetOfCubes[];
};

export type GameConstraints = {
  maxRedCubeCount: number;
  maxGreenCubeCount: number;
  maxBlueCubeCount: number;
};

export const parseSetsOfCubes: (setsOfCubesAsString: string) => SetOfCubes[] = (
  setsOfCubesAsString,
) => {
  const setsOfCubes: SetOfCubes[] = [];
  for (const setOfCubesAsString of splitBySemicolon(setsOfCubesAsString)) {
    let setOfCubes: SetOfCubes = {} as SetOfCubes;
    for (const cubeCountAsString of splitByComma(setOfCubesAsString)) {
      const [count, color] = splitBySpace(cubeCountAsString);
      switch (color) {
        case "red":
          setOfCubes = {
            ...setOfCubes,
            redCubeCount: parseInt(count),
          };
          break;
        case "green":
          setOfCubes = {
            ...setOfCubes,
            greenCubeCount: parseInt(count),
          };
          break;
        case "blue":
          setOfCubes = {
            ...setOfCubes,
            blueCubeCount: parseInt(count),
          };
          break;
        default:
          throw new Error(`Unknown color: ${color}`);
      }
    }
    setsOfCubes.push(setOfCubes);
  }
  return setsOfCubes;
};

export const parseGame: (line: string) => Game = (line) => {
  const [gameIdAsString, setsOfCubesAsString] = line.split(":");
  const gameIdSplitByWhiteSpace = splitByMultiWhiteSpace(gameIdAsString);
  const gameId = gameIdSplitByWhiteSpace[gameIdSplitByWhiteSpace.length - 1];
  const setsOfCubes = parseSetsOfCubes(setsOfCubesAsString);

  return {
    id: gameId,
    setsOfCubes: setsOfCubes,
  } as Game;
};

export const parseGames: (input: string) => Game[] = (input) => {
  const games: Game[] = [];
  for (const line of splitByNewLine(input)) {
    games.push(parseGame(line));
  }
  return games;
};

const isGamePossible = (game: Game, gameConstraints: GameConstraints) => {
  for (const setsOfCube of game.setsOfCubes) {
    if (setsOfCube.blueCubeCount > gameConstraints.maxBlueCubeCount) {
      return false;
    }
    if (setsOfCube.greenCubeCount > gameConstraints.maxGreenCubeCount) {
      return false;
    }
    if (setsOfCube.redCubeCount > gameConstraints.maxRedCubeCount) {
      return false;
    }
  }
  return true;
};

export const filterPossibleGames = (
  games: Game[],
  gameConstraints: GameConstraints,
) => {
  const possibleGames: Game[] = [];
  for (const game of games) {
    if (isGamePossible(game, gameConstraints)) {
      possibleGames.push(game);
    }
  }
  return possibleGames;
};
