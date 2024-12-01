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
