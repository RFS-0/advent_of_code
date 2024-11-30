export function isDigit(char: string): boolean {
  return /^[0-9]$/.test(char);
}

export function iterateString(
    value: string,
    predicate: (value: string, index: number) => boolean,
    onMatch: (value: string, index: number) => void,
    breakOnMatch: boolean = false,
): void {
  for (let i = 0; i < value.length; i++) {
    if (predicate(value[i], i)) {
      onMatch(value[i], i);
      if (breakOnMatch) {
        break;
      }
    }
  }
}

export function iterateStringReverse(
    value: string,
    predicate: (value: string, index: number) => boolean,
    onMatch: (value: string, index: number) => void,
    breakOnMatch: boolean = false,
): void {
  for (let i = value.length - 1; i >= 0; i--) {
    if (predicate(value[i], i)) {
      onMatch(value[i], i);
      if (breakOnMatch) {
        break;
      }
    }
  }
}
