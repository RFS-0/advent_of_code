import { isDigit, splitByNewLine } from "@strings";

export type PotentialEnginePart = {
  row: number;
  colStart: number;
  colEnd: number;
  value: number;
};
export type Symbol = {
  row: number;
  col: number;
};
export type EnginePart = {
  value: number;
};
export type EngineSchematicInput = {
  potentialEngineParts: PotentialEnginePart[];
  symbols: Symbol[];
};

export const parseEngineSchematic = (input: string) => {
  const potentialEngineParts: PotentialEnginePart[] = [];
  const symbols: Symbol[] = [];
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
    symbols: symbols,
  } as EngineSchematicInput;
};

const mapToSymbolCoordinates = (symbols: Symbol[]) => {
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
  const symbolCoordinates = mapToSymbolCoordinates(input.symbols);
  for (const potentialEnginePart of input.potentialEngineParts) {
    const adjacentCoordinates = calculateAdjacentCoordinates(
      potentialEnginePart,
    );
    for (const adjacentCoordinate of adjacentCoordinates) {
      if (symbolCoordinates.has(adjacentCoordinate)) {
        engineParts.push({
          value: potentialEnginePart.value,
        });
        break;
      }
    }
  }

  return engineParts;
};
