export const splitToStringMatrix = (input: string) => {
  const stringMatrix: string[][] = [];
  const lines = splitByNewLine(input);
  for (const line of lines) {
    stringMatrix.push(splitChars(line));
  }

  return stringMatrix;
};

export const splitChars: (input: string) => string[] = (input) => {
  return input.split("");
};

export const splitBy: (input: string, separator: string) => string[] = (
  input,
  separator,
) => {
  return input.split(separator).filter((s) => s.length > 0);
};

export const splitByComma: (input: string) => string[] = (input) => {
  return input.split(",").filter((s) => s.length > 0);
};

export const splitBySemicolon: (input: string) => string[] = (input) => {
  return input.split(";");
};

export const splitBySpace: (input: string) => string[] = (input) => {
  return input.match(/\S+/g) || [];
};

export const splitByMultiWhiteSpace: (input: string) => string[] = (input) => {
  return input.split(/\s+/);
};

export const splitByNewLine: (input: string) => string[] = (input) => {
  return input.split("\n");
};

export function isDigit(char: string): boolean {
  return /^[0-9]$/.test(char);
}

export function mapString<A, T>(
  initialize: (value: string) => A = (value) => value as unknown as A,
  value: string,
  matchCondition?: (char: string, index: number) => boolean,
  onMatch?: (accumulator: A, char: string, index?: number) => void,
  breakOnMatchCondition?: (char: string, index?: number) => void,
  onMiss?: (accumulator: A, char: string, index?: number) => void,
  breakOnMissCondition?: (
    accumulator: A,
    char: string,
    index: number,
  ) => boolean,
  finalize: (accumulator: A) => T = (accumulator: A) =>
    accumulator as unknown as T,
): T {
  const accumulator = initialize(value);
  for (let i = 0; i < value.length; i++) {
    if (matchCondition && matchCondition(value[i], i)) {
      onMatch && onMatch(accumulator, value[i], i);
      if (breakOnMatchCondition && breakOnMatchCondition(value[i], i)) {
        break;
      }
    } else {
      onMiss && onMiss(accumulator, value[i], i);
      if (
        breakOnMissCondition && breakOnMissCondition(accumulator, value[i], i)
      ) {
        break;
      }
    }
  }
  return finalize(accumulator);
}

export function mapStringReverse<A, T>(
  initialize: (value: string) => A = (value) => value as unknown as A,
  value: string,
  matchCondition?: (char: string, index: number) => boolean,
  onMatch?: (accumulator: A, char: string, index: number) => void,
  breakOnMatchCondition?: (char: string, index: number) => boolean,
  onMiss?: (accumulator: A, char: string, index: number) => void,
  breakOnMissCondition?: (
    accumulator: A,
    char: string,
    index: number,
  ) => boolean,
  finalize: (accumulator: A) => T = (accumulator: A) =>
    accumulator as unknown as T,
): T {
  const accumulator = initialize(value);
  for (let i = value.length - 1; i >= 0; i--) {
    if (matchCondition && matchCondition(value[i], i)) {
      onMatch && onMatch(accumulator, value[i], i);
      if (breakOnMatchCondition && breakOnMatchCondition(value[i], i)) {
        break;
      }
    } else {
      onMiss && onMiss(accumulator, value[i], i);
      if (
        breakOnMissCondition && breakOnMissCondition(accumulator, value[i], i)
      ) {
        break;
      }
    }
  }
  return finalize(accumulator);
}
