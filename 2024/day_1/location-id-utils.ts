export type UnsortedLocationIdLists = {
  unsortedLeftList: LocationId[];
  unsortedRightList: LocationId[];
};

export type SortedLocationIdLists = {
  sortedLeftList: LocationId[];
  sortedRightList: LocationId[];
};

export type LocationIdDistance = {
  leftLocationId: string;
  rightLocationId: string;
  distance: number;
};

export type TotalDistance = {
  value: number;
};

export type LocationId = {
  value: string;
};

export type LocationIdPair = {
  left: LocationId;
  right: LocationId;
};

export const extractLocationIds: (line: string) => LocationIdPair = (
  line: string,
) => {
  const splitByWhiteSpace = line.split(/\s+/);

  return {
    left: { value: splitByWhiteSpace[0] },
    right: { value: splitByWhiteSpace[1] },
  };
};

export const sort: (
  unsortedLocationIdLists: UnsortedLocationIdLists,
) => SortedLocationIdLists = (unsortedLocationIdLists) => {
  const leftSorted = [...unsortedLocationIdLists.unsortedLeftList];
  const rightSorted = [...unsortedLocationIdLists.unsortedRightList];
  leftSorted.sort((a, b) => parseInt(a.value) - parseInt(b.value));
  rightSorted.sort((a, b) => parseInt(a.value) - parseInt(b.value));

  return ({
    sortedLeftList: leftSorted,
    sortedRightList: rightSorted,
  } as SortedLocationIdLists);
};

export const calculateDistance: (
  sortedLocationIdLists: SortedLocationIdLists,
) => TotalDistance = (sortedLocationIdLists: SortedLocationIdLists) => {
  const leftList = sortedLocationIdLists.sortedLeftList;
  const rightList = sortedLocationIdLists.sortedRightList;
  if (leftList.length !== rightList.length) {
    throw new Error("List must be of equal length");
  }

  const locationIdDistances: LocationIdDistance[] = [];

  for (let i = 0; i < rightList.length; i++) {
    const leftValue = leftList[i].value;
    const rightValue = rightList[i].value;
    locationIdDistances.push({
      leftLocationId: leftValue,
      rightLocationId: rightValue,
      distance: Math.abs(parseInt(leftValue) - parseInt(rightValue)),
    });
  }

  return {
    value: locationIdDistances.reduce(
      (acc, distance) => acc + distance.distance,
      0,
    ),
  } as TotalDistance;
};

export type SimilarityScore = {
  value: number;
};

export const calculateSimilarityScore: (
  sortedLocationIdLists: SortedLocationIdLists,
) => SimilarityScore = (sortedLocationIdLists: SortedLocationIdLists) => {
  const leftList = sortedLocationIdLists.sortedLeftList;
  const rightList = sortedLocationIdLists.sortedRightList;
  if (leftList.length !== rightList.length) {
    throw new Error("List must be of equal length");
  }

  const distinctLocationIds = new Set(
    leftList.map((locationId) => parseInt(locationId.value)),
  );
  const locationIdToOccurrences: Map<number, number> = new Map();
  for (const distinctLocationId of distinctLocationIds) {
    locationIdToOccurrences.set(distinctLocationId, 0);
  }

  for (let i = 0; i < rightList.length; i++) {
    const rightListKey = parseInt(rightList[i].value);
    if (distinctLocationIds.has(rightListKey)) {
      const rightListValue = locationIdToOccurrences.get(rightListKey);
      if (rightListValue !== undefined) {
        locationIdToOccurrences.set(rightListKey, rightListValue + 1);
      }
    }
  }

  let similarityScore = 0;
  for (const locationId of leftList) {
    const leftListValue = parseInt(locationId.value);
    similarityScore += leftListValue *
      (locationIdToOccurrences.get(leftListValue) || 0);
  }

  return {
    value: similarityScore,
  } as SimilarityScore;
};
