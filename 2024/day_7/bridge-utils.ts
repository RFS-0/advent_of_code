import {splitByNewLine} from "@strings";

export type InputEquation = {
  result: number;
  operands: number[];
};

export type CandidateEquation = InputEquation;

export const parseEquations = (input: string) => {
  const candidates: InputEquation[] = [];
  const lines = splitByNewLine(input);
  for (let line of lines) {
    if (line.length === 0) {
      continue;
    }
    let [rawResult, rawOperands] = line.split(": ");
    candidates.push(
      {
        result: parseInt(rawResult),
        operands: rawOperands.split(" ").map((rawOperand) =>
          parseInt(rawOperand)
        ),
      },
    );
  }

  return candidates;
};

export const operations = ["+", "*"];

export const filterPossibleEquations = (inputEquations: InputEquation[]) => {
  const solvableEquations = [];
  for (const inputEquation of inputEquations) {
    const operationCount = inputEquation.operands.length - 1;
    const operationCombinationCount = 2 ** operationCount; // Base 3 for ternary combinations
    const operationBitCombinations = Array.from(
      { length: operationCombinationCount },
      (_, i) => i.toString(2).padStart(operationCount, "0"), // Convert to base 3
    );

    for (const operationBitCombination of operationBitCombinations) {
      let result = inputEquation.operands[0];
      for (let i = 0; i < operationBitCombination.length; i++) {
        const operationBit = operationBitCombination.charAt(i);
        if (operationBit === "0") {
          result += inputEquation.operands[i + 1];
        } else {
          result *= inputEquation.operands[i + 1];
        }
      }
      if (result === inputEquation.result) {
        solvableEquations.push(inputEquation);
        break;
      }
    }
  }
  return solvableEquations;
};

export const filterPossibleEquations2 = (inputEquations: InputEquation[]) => {
  const solvableEquations = [];
  for (const inputEquation of inputEquations) {
    const operationCount = inputEquation.operands.length - 1;
    const operationCombinationCount = 3 ** operationCount; // Base 3 for ternary combinations
    const operationBitCombinations = Array.from(
      { length: operationCombinationCount },
      (_, i) => i.toString(3).padStart(operationCount, "0"), // Convert to base 3
    );

    for (const operationBitCombination of operationBitCombinations) {
      let result = inputEquation.operands[0];
      for (let i = 0; i < operationBitCombination.length; i++) {
        const operationBit = operationBitCombination.charAt(i);
        if (operationBit === "0") {
          result += inputEquation.operands[i + 1];
        } else if (operationBit === "1") {
          result *= inputEquation.operands[i + 1];
        } else {
          const nextResut = result.toString() +
            inputEquation.operands[i + 1].toString();
          result = parseInt(nextResut);
        }
      }
      if (result === inputEquation.result) {
        solvableEquations.push(inputEquation);
        break;
      }
    }
  }
  return solvableEquations;
};
