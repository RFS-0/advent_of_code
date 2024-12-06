export function mapItems<A, T, O>(
  initialize: (items: T[]) => A = (items) => items as unknown as A,
  items: T[],
  matchCondition?: (item: T, index: number) => boolean,
  onMatch?: (accumulator: A, item: T, index?: number) => void,
  breakOnMatchCondition?: (item: T, index?: number) => void,
  onMiss?: (accumulator: A, item: T, index?: number) => void,
  breakOnMissCondition?: (
    accumulator: A,
    item: T,
    index: number,
  ) => boolean,
  finalize: (accumulator: A) => O = (accumulator: A) =>
    accumulator as unknown as O,
): O {
  const accumulator = initialize(items);
  for (let i = 0; i < items.length; i++) {
    if (matchCondition && matchCondition(items[i], i)) {
      onMatch && onMatch(accumulator, items[i], i);
      if (breakOnMatchCondition && breakOnMatchCondition(items[i], i)) {
        break;
      }
    } else {
      onMiss && onMiss(accumulator, items[i], i);
      if (
        breakOnMissCondition && breakOnMissCondition(accumulator, items[i], i)
      ) {
        break;
      }
    }
  }
  return finalize(accumulator);
}

export function mapItemsReverse<A, T, O>(
  initialize: (items: T[]) => A = (items) => items as unknown as A,
  items: T[],
  matchCondition?: (item: T, index: number) => boolean,
  onMatch?: (accumulator: A, item: T, index?: number) => void,
  breakOnMatchCondition?: (item: T, index?: number) => void,
  onMiss?: (accumulator: A, item: T, index?: number) => void,
  breakOnMissCondition?: (
    accumulator: A,
    item: T,
    index: number,
  ) => boolean,
  finalize: (accumulator: A) => O = (accumulator: A) =>
    accumulator as unknown as O,
): O {
  const accumulator = initialize(items);
  for (let i = items.length - 1; i >= 0; i--) {
    if (matchCondition && matchCondition(items[i], i)) {
      onMatch && onMatch(accumulator, items[i], i);
      if (breakOnMatchCondition && breakOnMatchCondition(items[i], i)) {
        break;
      }
    } else {
      onMiss && onMiss(accumulator, items[i], i);
      if (
        breakOnMissCondition && breakOnMissCondition(accumulator, items[i], i)
      ) {
        break;
      }
    }
  }
  return finalize(accumulator);
}

export function excludeByKey<T, K extends keyof T>(
  items: T[],
  itemsToExclude: T[],
  key: K,
): T[] {
  const keysToExclude = new Set(itemsToExclude.map((item) => item[key]));
  return items.filter((item) => !keysToExclude.has(item[key]));
}

export function sortIncreasingByKey<T, K extends keyof T>(items: T[], key: K) {
  return [...items].sort((a, b) => {
    const keyA = a[key];
    const keyB = b[key];

    if (typeof keyA === "number" && typeof keyB === "number") {
      return keyA - keyB;
    } else if (typeof keyA === "string" && typeof keyB === "string") {
      return keyA.localeCompare(keyB);
    } else {
      throw new Error("Key must be number or string");
    }
  });
}

export function sortDecreasingByKey<T, K extends keyof T>(items: T[], key: K) {
  return [...items].sort((a, b) => {
    const keyA = a[key];
    const keyB = b[key];

    if (typeof keyA === "number" && typeof keyB === "number") {
      return keyB - keyA; // Reverse the subtraction
    } else if (typeof keyA === "string" && typeof keyB === "string") {
      return keyB.localeCompare(keyA); // Reverse the localeCompare
    } else {
      throw new Error("Key must be number or string");
    }
  });
}

export function concat<T>(items: T[], otherItems: T[]) {
  return [...items, ...otherItems];
}

export function createMatrix<T>(rows: number, cols: number, value: T) {
  return Array(rows).fill(null).map(() => Array(cols).fill(value)) as T[][];
}

export function assertNDimensionalMatrix<T>(
  matrix: any,
  dimensions: number[],
  dimension: number = 0,
): void {
  if (!Array.isArray(matrix)) {
    throw new Error(`Dimension ${dimension} is not an array.`);
  }

  const actualLength = matrix.length;
  const expectedLength = dimensions[dimension];

  if (expectedLength !== null && actualLength !== expectedLength) {
    throw new Error(
      `Dimension ${dimension} expected ${expectedLength} elements, but got ${actualLength}.`,
    );
  }

  if (dimension < dimensions.length - 1) {
    for (const subMatrix of matrix) {
      assertNDimensionalMatrix(subMatrix, dimensions, dimension + 1);
    }
  }
}

export function rows<T>(matrix: T[][]) {
  return matrix.map((row) => row.slice());
}

export function rowsReversed<T>(matrix: T[][]) {
  return matrix.map((row) => [...row].reverse());
}

export function columns<T>(matrix: T[][]) {
  const cols = [];
  const numCols = matrix[0].length;
  for (let j = 0; j < numCols; j++) {
    const column = [];
    for (let i = 0; i < matrix.length; i++) {
      column.push(matrix[i][j]);
    }
    cols.push(column);
  }
  return cols;
}

export function columnsReversed<T>(matrix: T[][]) {
  const reversedCols = [];
  const numCols = matrix[0].length;
  for (let j = 0; j < numCols; j++) {
    const column = [];
    for (let i = matrix.length - 1; i >= 0; i--) {
      column.push(matrix[i][j]);
    }
    reversedCols.push(column);
  }
  return reversedCols;
}

export function diagonals<T>(matrix: T[][]): T[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const topLeftToBottomRight: T[] = [];
  const topRightToBottomLeft: T[] = [];

  for (let i = 0; i < rows; i++) {
    topLeftToBottomRight.push(matrix[i][i]);
    topRightToBottomLeft.push(matrix[i][cols - i - 1]);
  }

  return [topLeftToBottomRight, topRightToBottomLeft];
}

export function diagonalsReversed<T>(matrix: T[][]) {
  return diagonals(matrix).map((row) => [...row].reverse());
}

export const printMatrix = (matrix: string[][]): void => {
  const v = matrix.flatMap((row) => row.join(""))
    .reduce((out, row) => out + row + "\n", "");

  console.log(v);
};
