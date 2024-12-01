import { isDigit, splitByNewLine } from "@strings";

export type PotentialEnginePart = {
  row: number;
  colStart: number;
  colEnd: number;
  value: number;
};
export type PotentialGear = {
  row: number;
  col: number;
};

export type Gear = {
  coordinate: string;
  gearRatio: number;
};
export type EnginePart = {
  adjacentCoordinates: Set<string>;
  value: number;
};

export type EngineSchematicInput = {
  potentialEngineParts: PotentialEnginePart[];
  potentialGears: PotentialGear[];
};

export const parseEngineSchematic = (input: string) => {
  const potentialEngineParts: PotentialEnginePart[] = [];
  const symbols: PotentialGear[] = [];
  const lines = splitByNewLine(input);
  for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
    const row = lines[rowIndex];
    let identifyingPotentialEnginePart = false;
    let potentialEnginePartColStart = 0;
    let potentialEnginePartValue = "";
    for (let colIndex = 0; colIndex < lines[rowIndex].length; colIndex++) {
      const endOfCol = colIndex === lines[rowIndex].length - 1;
      const char = row[colIndex];
      if (char === ".") {
        if (identifyingPotentialEnginePart) {
          potentialEngineParts.push({
            row: rowIndex,
            colStart: potentialEnginePartColStart,
            colEnd: colIndex - 1,
            value: parseInt(potentialEnginePartValue, 10),
          });
        }
        identifyingPotentialEnginePart = false;
        potentialEnginePartColStart = 0;
        potentialEnginePartValue = "";
      } else if (isDigit(char)) {
        if (identifyingPotentialEnginePart) {
          potentialEnginePartValue += char;
          if (endOfCol) {
            potentialEngineParts.push({
              row: rowIndex,
              colStart: potentialEnginePartColStart,
              colEnd: colIndex - 1,
              value: parseInt(potentialEnginePartValue, 10),
            });
            identifyingPotentialEnginePart = false;
            potentialEnginePartColStart = 0;
            potentialEnginePartValue = "";
          }
        } else {
          identifyingPotentialEnginePart = true;
          potentialEnginePartColStart = colIndex;
          potentialEnginePartValue = char;
        }
      } else {
        if (identifyingPotentialEnginePart) {
          potentialEngineParts.push({
            row: rowIndex,
            colStart: potentialEnginePartColStart,
            colEnd: colIndex - 1,
            value: parseInt(potentialEnginePartValue, 10),
          });
          identifyingPotentialEnginePart = false;
          potentialEnginePartColStart = 0;
          potentialEnginePartValue = "";
        }
        symbols.push({
          row: rowIndex,
          col: colIndex,
        });
      }
    }
  }

  return {
    potentialEngineParts: potentialEngineParts,
    potentialGears: symbols,
  } as EngineSchematicInput;
};

const mapToGearCoordinates = (symbols: PotentialGear[]) => {
  const symbolsCoordinates: Set<string> = new Set();
  for (const symbol of symbols) {
    symbolsCoordinates.add(`${symbol.row},${symbol.col}`);
  }
  return symbolsCoordinates;
};

const calculateAdjacentCoordinates = (
  potentialEnginePart: PotentialEnginePart,
) => {
  const adjacentCoordinates: Set<string> = new Set();
  for (
    let i = potentialEnginePart.colStart - 1;
    i <= potentialEnginePart.colEnd + 1;
    i++
  ) {
    // adjacent up
    adjacentCoordinates.add(`${potentialEnginePart.row - 1},${i}`);
    // adjacent down
    adjacentCoordinates.add(`${potentialEnginePart.row + 1},${i}`);
  }
  // adjacent left & right
  adjacentCoordinates.add(
    `${potentialEnginePart.row},${potentialEnginePart.colStart - 1}`,
  );
  adjacentCoordinates.add(
    `${potentialEnginePart.row},${potentialEnginePart.colEnd + 1}`,
  );

  return adjacentCoordinates;
};

export const extractEngineParts = (input: EngineSchematicInput) => {
  const engineParts: EnginePart[] = [];
  const gearCoordinates = mapToGearCoordinates(input.potentialGears);
  for (const potentialEnginePart of input.potentialEngineParts) {
    const adjacentCoordinates = calculateAdjacentCoordinates(
      potentialEnginePart,
    );
    for (const adjacentCoordinate of adjacentCoordinates) {
      if (gearCoordinates.has(adjacentCoordinate)) {
        engineParts.push({
          value: potentialEnginePart.value,
          adjacentCoordinates,
        });
        break;
      }
    }
  }

  return engineParts;
};

const isAdjacent = (
  enginePart: EnginePart,
  potentialGearCoordinate: string,
) => {
  return enginePart.adjacentCoordinates.has(potentialGearCoordinate);
};

export const extractGears = (input: EngineSchematicInput) => {
  const gears: Gear[] = [];
  const engineParts = extractEngineParts(input);
  const potentialGearCoordinates = mapToGearCoordinates(input.potentialGears);

  for (const potentialGearCoordinate of potentialGearCoordinates) {
    let numberOfAdjacentEngineParts = 0;
    let gearRatio = 1;
    for (const enginePart of engineParts) {
      if (isAdjacent(enginePart, potentialGearCoordinate)) {
        numberOfAdjacentEngineParts++;
        gearRatio *= enginePart.value;
      }
    }
    if (numberOfAdjacentEngineParts === 2) {
      gears.push({
        coordinate: potentialGearCoordinate,
        gearRatio: gearRatio,
      });
    }
  }
  return gears;
};
