import type { SortingGenerator } from './types';

export const bubleSort = function* (arr: number[]): SortingGenerator {
  let comparisons = 0;
  let dataAccesses = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      comparisons++;
      dataAccesses += 2;
      yield { access: [j, j + 1], sound: j + 1, comparisons: 1, dataAccesses: 2 };

      if (arr[j] > arr[j + 1]) {
        dataAccesses += 4;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        yield { access: [j, j + 1], sound: j + 1, comparisons: 0, dataAccesses: 4 };
      }
    }
  }
};
