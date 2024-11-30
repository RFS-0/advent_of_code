export function iterate<T>(
  collection: T[],
  predicate: (value: T, index: number) => boolean,
  onMatch: (value: T, index: number) => void,
  breakOnMatch: boolean = false,
): void {
  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i], i)) {
      onMatch(collection[i], i);
      if (breakOnMatch) {
        break;
      }
    }
  }
}

export function iterateReverse<T>(
  collection: T[],
  predicate: (value: T, index: number) => boolean,
  onMatch: (value: T, index: number) => void,
  breakOnMatch: boolean = false,
): void {
  for (let i = collection.length - 1; i >= 0; i--) {
    if (predicate(collection[i], i)) {
      onMatch(collection[i], i);
      if (breakOnMatch) {
        break;
      }
    }
  }
}
