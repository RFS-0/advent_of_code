import { isDigit } from "../../lib/strings.ts";
import { iterateString, iterateStringReverse } from "../../lib/arrays.ts";

export const convertWithRulesForPart1: (input: string) => number = (
  calibrationValueAsString: string,
): number => {
  const extractedValues: string[] = [];
  iterateString(
    calibrationValueAsString,
    isDigit,
    (match) => extractedValues.push(match),
    true,
  );
  iterateStringReverse(
    calibrationValueAsString,
    isDigit,
    (match) => extractedValues.push(match),
    true,
  );

  return parseInt(
    extractedValues.reduce((acc, current) => acc + current, ""),
    10,
  );
};
