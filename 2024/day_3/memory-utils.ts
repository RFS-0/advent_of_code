export type Multiplication = {
  first: number;
  second: number;
};

const mulRegex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
const mulWithDoDontRegex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;

export const parseMultiplies = (input: string) => {
  const multiplications: Multiplication[] = [];
  let match;
  while ((match = mulRegex.exec(input)) !== null) {
    multiplications.push({
      first: parseInt(match[1]),
      second: parseInt(match[2]),
    });
  }

  return multiplications;
};

export const parseMultipliesWithDoDont = (input: string) => {
  const multiplications: Multiplication[] = [];
  let match;
  let multiplicationActive = true;
  while ((match = mulWithDoDontRegex.exec(input)) !== null) {
    if (match[0] === "do()") {
      multiplicationActive = true;
    }
    if (match[0] === "don't()") {
      multiplicationActive = false;
    }

    if (match[0].startsWith("mul") && multiplicationActive) {
      multiplications.push({
        first: parseInt(match[1]),
        second: parseInt(match[2]),
      });
    }
  }
  return multiplications;
};

export const sumMultiplies = (multiplies: Multiplication[]) => {
  let result = 0;
  for (const multiplication of multiplies) {
    result += multiplication.first * multiplication.second;
  }
  return result;
};
