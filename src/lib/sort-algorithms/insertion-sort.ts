import type { SortingGenerator } from './types';

export const insertionSort = function* (arr: number[]): SortingGenerator {
  for (let i = 1; i < arr.length; i++) {
    const currentValue = arr[i];
    let j;
    for (j = i - 1; j >= 0 && arr[j] > currentValue; j--) {
      arr[j + 1] = arr[j];
      yield { access: [i, j], sound: j, comparisons: 1, dataAccesses: 3 };
    }
    arr[j + 1] = currentValue;
    yield { access: [i, j + 1], sound: i, comparisons: j >= 0 ? 1 : 0, dataAccesses: 1 };
  }
};
