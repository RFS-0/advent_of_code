import { isDigit, mapString, mapStringReverse } from "@strings";

export const convertWithRulesForPart1: (input: string) => number = (
  calibrationValueAsString: string,
): number => {
  const extractedValues: IntermediateResult[] = [];
  let firstPart = mapString<IntermediateResult, IntermediateResult>(
    () => new IntermediateResult(),
    calibrationValueAsString,
    isDigit,
    (acc, value) => acc.setDigit(value),
    () => true,
  );
  extractedValues.push(firstPart);
  let secondPart = mapStringReverse<IntermediateResult, IntermediateResult>(
    () => new IntermediateResult(),
    calibrationValueAsString,
    isDigit,
    (acc, value) => acc.setDigit(value),
    () => true,
  );
  extractedValues.push(secondPart);

  return parseInt(
    extractedValues.reduce((acc, current) => acc + current.getDigit(), ""),
    10,
  );
};

class IntermediateResult {
  private digit: string | null = null;
  private charDigitParts: string = "";
  private static readonly stringToNumber = new Map<string, string>([
    ["one", "1"],
    ["eno", "1"],
    ["two", "2"],
    ["owt", "2"],
    ["three", "3"],
    ["eerht", "3"],
    ["four", "4"],
    ["ruof", "4"],
    ["five", "5"],
    ["evif", "5"],
    ["six", "6"],
    ["xis", "6"],
    ["seven", "7"],
    ["neves", "7"],
    ["eight", "8"],
    ["thgie", "8"],
    ["nine", "9"],
    ["enin", "9"],
  ]);

  public setDigit(char: string): void {
    this.charDigitParts = "";
    this.digit = char;
  }

  public updateCharDigitParts(char: string): void {
    this.charDigitParts += char;
    this.convertToDigitIfPossible();
  }

  public resetCharDigitParts(): void {
    this.charDigitParts = "";
  }

  public isComplete(): boolean {
    return this.digit !== null;
  }

  public getDigit(): string | null {
    return this.digit;
  }

  private convertToDigitIfPossible(): void {
    let digitKey = "";
    for (let key of IntermediateResult.stringToNumber.keys()) {
      if (this.charDigitParts.includes(key)) {
        digitKey = key;
      }
    }
    const mappedDigit = IntermediateResult.stringToNumber.get(
      digitKey,
    );
    if (mappedDigit) {
      this.digit = mappedDigit;
      this.charDigitParts = "";
      return;
    }
  }
}

type CalibrationValueResult = {
  value: number;
};

export const convertWithRulesForPart2: (
  calibrationValueAsString: string,
) => number = (
  calibrationValueAsString: string,
): number => {
  const extractedValues: IntermediateResult[] = [];
  const firstPart = mapString<IntermediateResult, IntermediateResult>(
    () => (new IntermediateResult()),
    calibrationValueAsString,
    isDigit,
    (acc, value) => {
      acc.setDigit(value);
    },
    () => true,
    (acc, char) => acc.updateCharDigitParts(char),
    (acc) => acc.isComplete(),
  );
  extractedValues.push(firstPart);
  const secondPart = mapStringReverse<IntermediateResult, IntermediateResult>(
    () => (new IntermediateResult()),
    calibrationValueAsString,
    isDigit,
    (acc, value) => {
      acc.setDigit(value);
    },
    () => true,
    (acc, char) => acc.updateCharDigitParts(char),
    (acc) => acc.isComplete(),
  );
  extractedValues.push(secondPart);

  return parseInt(
    extractedValues.reduce((acc, current) => acc + current.getDigit(), ""),
    10,
  );
};
