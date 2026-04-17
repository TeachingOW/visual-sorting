import type { SortingGenerator } from './types';

export const exchangeSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      yield { access: [i, j], sound: j, comparisons: 1, dataAccesses: 2 };

      if (arr[i] > arr[j]) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        yield { access: [i, j], sound: j, comparisons: 0, dataAccesses: 4 };
      }
    }
  }
};
