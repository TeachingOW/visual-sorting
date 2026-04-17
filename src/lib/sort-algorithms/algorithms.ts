import RangeArraySizePowerOfTwo from '../components/RangeArraySizePowerOfTwo.svelte';
import { bitonicSort } from './bitonic-sort';
import { bogoSort } from './bogo-sort';
import { bubleSort } from './buble-sort';
import { bucketSort } from './bucket-sort';
import { cocktailSort } from './cocktail-sort';
import { combSort } from './comb-sort';
import { countingSort } from './counting-sort';
import { cycleSort } from './cycle-sort';
import { exchangeSort } from './exchange-sort';
import { gnomeSort } from './gnome-sort';
import { heapSort } from './heap-sort';
import { insertionSort } from './insertion-sort';
import { introSort } from './intro-sort';
import { mergeSort } from './merge-sort';
import { oddEvenSort } from './odd-even-sort';
import { pancakeSort } from './pancake-sort';
import { quickSort } from './quick-sort';
import { radixSort } from './radix-sort';
import { radixSortMSD } from './radix-sort-msd';
import { selectionSort } from './selection-sort';
import { shellSort } from './shell-sort';
import { stoogeSort } from './stooge-sort';
import { timSort } from './tim-sort';
import type { AlgorithmDefinition } from './types';

export const algorithms: AlgorithmDefinition[][] = [
  [
    {
      name: 'Bubble Sort',
      function: bubleSort,
      description:
        'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. After each pass the largest unsorted element "bubbles up" to its correct position at the end of the unsorted region.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      pseudocode: `for i = 0 to n-1:
  for j = 0 to n-i-2:
    if arr[j] > arr[j+1]:
      swap(arr[j], arr[j+1])`,
      cppCode: `void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        std::swap(arr[j], arr[j + 1]);
      }
    }
  }
}`,
    },
    {
      name: 'Quick Sort',
      function: quickSort,
      description:
        'Quick Sort is a divide-and-conquer algorithm that selects a pivot element and partitions the array around it so that elements smaller than the pivot come before it and larger elements come after. It then recursively sorts the two partitions.',
      timeComplexity: 'O(n log n) avg / O(n²) worst',
      spaceComplexity: 'O(log n)',
      pseudocode: `quickSort(arr, low, high):
  if low < high:
    pivot = partition(arr, low, high)
    quickSort(arr, low, pivot - 1)
    quickSort(arr, pivot + 1, high)

partition(arr, low, high):
  pivot = arr[mid]
  while i <= j:
    while arr[i] < pivot: i++
    while arr[j] > pivot: j--
    if i <= j: swap(arr[i], arr[j]); i++; j--
  return i`,
      cppCode: `int partition(int arr[], int low, int high) {
  int pivot = arr[(low + high) / 2];
  int i = low, j = high;
  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;
    if (i <= j) std::swap(arr[i++], arr[j--]);
  }
  return i;
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int p = partition(arr, low, high);
    quickSort(arr, low, p - 1);
    quickSort(arr, p, high);
  }
}`,
    },
    {
      name: 'Shell Sort',
      function: shellSort,
      description:
        'Shell Sort is a generalization of Insertion Sort that allows the exchange of elements far apart. It sorts elements at a decreasing gap sequence, reducing the gap until it reaches 1 (a final pass of regular Insertion Sort). This eliminates large-scale disorder early and makes the final insertion passes very efficient.',
      timeComplexity: 'O(n log² n)',
      spaceComplexity: 'O(1)',
      pseudocode: `gap = n / 2
while gap > 0:
  for i = gap to n-1:
    temp = arr[i]
    j = i
    while j >= gap and arr[j-gap] > temp:
      arr[j] = arr[j-gap]
      j -= gap
    arr[j] = temp
  gap /= 2`,
      cppCode: `void shellSort(int arr[], int n) {
  for (int gap = n / 2; gap > 0; gap /= 2) {
    for (int i = gap; i < n; i++) {
      int temp = arr[i], j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
        arr[j] = arr[j - gap];
      arr[j] = temp;
    }
  }
}`,
    },
    {
      name: 'Merge Sort',
      function: mergeSort,
      description:
        'Merge Sort is a stable, divide-and-conquer algorithm that recursively splits the array in half, sorts each half, and merges the sorted halves back together. It guarantees O(n log n) time in all cases but requires O(n) extra space for the merge step.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      pseudocode: `mergeSort(arr, l, r):
  if l < r:
    m = (l + r) / 2
    mergeSort(arr, l, m)
    mergeSort(arr, m+1, r)
    merge(arr, l, m, r)

merge(arr, l, m, r):
  copy arr[l..m] -> left[], arr[m+1..r] -> right[]
  merge left[] and right[] back into arr[]`,
      cppCode: `void merge(int arr[], int l, int m, int r) {
  std::vector<int> left(arr+l, arr+m+1);
  std::vector<int> right(arr+m+1, arr+r+1);
  int i = 0, j = 0, k = l;
  while (i < left.size() && j < right.size())
    arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
  while (i < left.size()) arr[k++] = left[i++];
  while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`,
    },
    {
      name: 'Insertion Sort',
      function: insertionSort,
      description:
        'Insertion Sort builds the sorted array one element at a time. It picks the next unsorted element and inserts it into its correct position within the already-sorted portion, shifting larger elements right to make room. It is efficient for small or nearly-sorted data.',
      timeComplexity: 'O(n²) / O(n) best',
      spaceComplexity: 'O(1)',
      pseudocode: `for i = 1 to n-1:
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key:
    arr[j+1] = arr[j]
    j--
  arr[j+1] = key`,
      cppCode: `void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`,
    },
    {
      name: 'Selection Sort',
      function: selectionSort,
      description:
        'Selection Sort divides the array into a sorted and an unsorted region. In each iteration it finds the minimum element in the unsorted region and swaps it to the front. This always does exactly n-1 swaps regardless of input order.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      pseudocode: `for i = 0 to n-1:
  min = i
  for j = i+1 to n-1:
    if arr[j] < arr[min]:
      min = j
  swap(arr[i], arr[min])`,
      cppCode: `void selectionSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++)
      if (arr[j] < arr[minIdx]) minIdx = j;
    std::swap(arr[minIdx], arr[i]);
  }
}`,
    },
    {
      name: 'Radix LSD Sort',
      function: radixSort,
      description:
        'Radix LSD (Least Significant Digit) Sort is a non-comparison sort that processes digits from the least significant to the most significant. At each pass it groups elements by their current digit using a stable counting sort, resulting in O(nk) time where k is the number of digits.',
      timeComplexity: 'O(nk)',
      spaceComplexity: 'O(n + k)',
      pseudocode: `for each digit position (LSD to MSD):
  countingSort(arr, by current digit)

countingSort by digit:
  count frequency of each digit 0-9
  build cumulative count
  build output array (stable)
  copy back to arr`,
      cppCode: `void countSort(int arr[], int n, int exp) {
  std::vector<int> output(n);
  int count[10] = {};
  for (int i = 0; i < n; i++) count[(arr[i]/exp)%10]++;
  for (int i = 1; i < 10; i++) count[i] += count[i-1];
  for (int i = n-1; i >= 0; i--)
    output[--count[(arr[i]/exp)%10]] = arr[i];
  for (int i = 0; i < n; i++) arr[i] = output[i];
}

void radixSort(int arr[], int n) {
  int m = *std::max_element(arr, arr+n);
  for (int exp = 1; m/exp > 0; exp *= 10)
    countSort(arr, n, exp);
}`,
    },
    {
      name: 'Radix MSD Sort',
      function: radixSortMSD,
      description:
        'Radix MSD (Most Significant Digit) Sort processes digits from the most significant to the least significant. After sorting by the leading digit it recursively sorts each "bucket" (group of elements sharing the same leading digit) by the next digit. This allows early termination of recursion for already-sorted buckets.',
      timeComplexity: 'O(nk)',
      spaceComplexity: 'O(n + k)',
      pseudocode: `radixMSD(arr, exp, start, end):
  if start >= end: return
  countSort(arr, exp, start, end)
  for each bucket b:
    radixMSD(arr, exp/10, start of b, end of b)`,
      cppCode: `void countSortMSD(int arr[], int exp, int s, int e) {
  int n = e - s + 1;
  std::vector<int> out(n);
  int count[10] = {};
  for (int i = s; i <= e; i++) count[(arr[i]/exp)%10]++;
  for (int i = 1; i < 10; i++) count[i] += count[i-1];
  for (int i = e; i >= s; i--)
    out[--count[(arr[i]/exp)%10]] = arr[i];
  for (int i = 0; i < n; i++) arr[s+i] = out[i];
}

void radixMSD(int arr[], int exp, int s, int e) {
  if (s >= e || exp == 0) return;
  countSortMSD(arr, exp, s, e);
  int buckets[10] = {};
  for (int i = s; i <= e; i++) buckets[(arr[i]/exp)%10]++;
  int pos = s;
  for (int i = 0; i < 10; i++) {
    if (buckets[i] > 1) radixMSD(arr, exp/10, pos, pos+buckets[i]-1);
    pos += buckets[i];
  }
}`,
    },
    {
      name: 'Heap Sort',
      function: heapSort,
      description:
        'Heap Sort uses a max-heap data structure. It first builds a max-heap from the array, then repeatedly extracts the maximum element (the root) and places it at the end of the sorted region, re-heapifying after each extraction.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      pseudocode: `build max-heap from arr (heapify from n/2-1 down to 0)
for i = n-1 down to 1:
  swap(arr[0], arr[i])   // move max to end
  heapify(arr, i, 0)     // restore heap on arr[0..i-1]

heapify(arr, n, i):
  largest = i
  l = 2*i+1; r = 2*i+2
  if l < n and arr[l] > arr[largest]: largest = l
  if r < n and arr[r] > arr[largest]: largest = r
  if largest != i:
    swap(arr[i], arr[largest])
    heapify(arr, n, largest)`,
      cppCode: `void heapify(int arr[], int n, int i) {
  int largest = i, l = 2*i+1, r = 2*i+2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest != i) {
    std::swap(arr[i], arr[largest]);
    heapify(arr, n, largest);
  }
}

void heapSort(int arr[], int n) {
  for (int i = n/2-1; i >= 0; i--) heapify(arr, n, i);
  for (int i = n-1; i > 0; i--) {
    std::swap(arr[0], arr[i]);
    heapify(arr, i, 0);
  }
}`,
    },
    {
      name: 'Bitonic Sort',
      function: bitonicSort,
      arraySizeComponent: RangeArraySizePowerOfTwo,
      description:
        'Bitonic Sort is a parallel sorting algorithm that works by building a bitonic sequence (first increasing then decreasing) and then converting it to a sorted sequence via a series of compare-and-swap operations. It requires the array size to be a power of two.',
      timeComplexity: 'O(n log² n)',
      spaceComplexity: 'O(log² n)',
      pseudocode: `bitonicSort(arr, low, cnt, dir):
  if cnt > 1:
    k = cnt / 2
    bitonicSort(arr, low, k, ASCENDING)
    bitonicSort(arr, low+k, k, DESCENDING)
    bitonicMerge(arr, low, cnt, dir)

bitonicMerge(arr, low, cnt, dir):
  if cnt > 1:
    k = cnt / 2
    for i = low to low+k-1:
      compAndSwap(arr, i, i+k, dir)
    bitonicMerge(arr, low, k, dir)
    bitonicMerge(arr, low+k, k, dir)`,
      cppCode: `void compAndSwap(int a[], int i, int j, int dir) {
  if ((a[i] > a[j] && dir == 1) || (a[i] < a[j] && dir == 0))
    std::swap(a[i], a[j]);
}

void bitonicMerge(int a[], int low, int cnt, int dir) {
  if (cnt > 1) {
    int k = cnt / 2;
    for (int i = low; i < low + k; i++) compAndSwap(a, i, i+k, dir);
    bitonicMerge(a, low, k, dir);
    bitonicMerge(a, low+k, k, dir);
  }
}

void bitonicSort(int a[], int low, int cnt, int dir) {
  if (cnt > 1) {
    int k = cnt / 2;
    bitonicSort(a, low, k, 1);
    bitonicSort(a, low+k, k, 0);
    bitonicMerge(a, low, cnt, dir);
  }
}`,
    },
    {
      name: 'Tim Sort',
      function: timSort,
      description:
        'Tim Sort is a hybrid sorting algorithm derived from Merge Sort and Insertion Sort. It divides the array into small "runs" (already-sorted subsections), sorts each run with Insertion Sort, and then merges the runs together using a merge strategy that exploits existing order in the data. It is the default sort in Python and Java.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      pseudocode: `minRun = computeMinRun(n)
divide arr into runs of length >= minRun
for each run:
  insertionSort(run)
  push run onto stack
  while merge rules apply: mergeTopRuns()
while stack has > 1 run: mergeTopRuns()`,
      cppCode: `// Simplified Timsort (minRun = 32)
const int RUN = 32;

void insertionSort(int arr[], int l, int r) {
  for (int i = l+1; i <= r; i++) {
    int key = arr[i]; int j = i - 1;
    while (j >= l && arr[j] > key) { arr[j+1] = arr[j]; j--; }
    arr[j+1] = key;
  }
}

void merge(int arr[], int l, int m, int r) {
  std::vector<int> left(arr+l, arr+m+1), right(arr+m+1, arr+r+1);
  int i=0, j=0, k=l;
  while (i<left.size() && j<right.size())
    arr[k++] = (left[i]<=right[j]) ? left[i++] : right[j++];
  while (i<left.size()) arr[k++]=left[i++];
  while (j<right.size()) arr[k++]=right[j++];
}

void timSort(int arr[], int n) {
  for (int i=0; i<n; i+=RUN)
    insertionSort(arr, i, std::min(i+RUN-1, n-1));
  for (int size=RUN; size<n; size*=2)
    for (int l=0; l<n; l+=2*size) {
      int m = std::min(l+size-1, n-1);
      int r = std::min(l+2*size-1, n-1);
      if (m < r) merge(arr, l, m, r);
    }
}`,
    },
    {
      name: 'Gnome Sort',
      function: gnomeSort,
      description:
        'Gnome Sort (also known as Stupid Sort) works like a gnome sorting a row of flower pots. It moves forward until it finds two adjacent elements out of order, swaps them, then steps back. If no swap was needed it moves forward. Very simple but inefficient.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      pseudocode: `index = 0
while index < n:
  if index == 0 or arr[index] >= arr[index-1]:
    index++
  else:
    swap(arr[index], arr[index-1])
    index--`,
      cppCode: `void gnomeSort(int arr[], int n) {
  int index = 0;
  while (index < n) {
    if (index == 0 || arr[index] >= arr[index - 1])
      index++;
    else {
      std::swap(arr[index], arr[index - 1]);
      index--;
    }
  }
}`,
    },
    {
      name: 'Cycle Sort',
      function: cycleSort,
      description:
        'Cycle Sort is an in-place, unstable sorting algorithm that is optimal for minimising the number of writes to the original array. It decomposes the permutation into cycles and rotates each cycle to place every element in its correct position. Each element is written at most once.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      pseudocode: `for cycleStart = 0 to n-2:
  item = arr[cycleStart]
  pos = cycleStart
  for i = cycleStart+1 to n-1:
    if arr[i] < item: pos++
  if pos == cycleStart: continue
  while item == arr[pos]: pos++
  swap(item, arr[pos])
  while pos != cycleStart:
    // find and rotate rest of cycle`,
      cppCode: `void cycleSort(int arr[], int n) {
  for (int cs = 0; cs <= n-2; cs++) {
    int item = arr[cs], pos = cs;
    for (int i = cs+1; i < n; i++) if (arr[i] < item) pos++;
    if (pos == cs) continue;
    while (item == arr[pos]) pos++;
    std::swap(item, arr[pos]);
    while (pos != cs) {
      pos = cs;
      for (int i = cs+1; i < n; i++) if (arr[i] < item) pos++;
      while (item == arr[pos]) pos++;
      std::swap(item, arr[pos]);
    }
  }
}`,
    },
    {
      name: 'Cocktail Sort',
      function: cocktailSort,
      description:
        'Cocktail Sort (also called Bidirectional Bubble Sort or Shaker Sort) is a variation of Bubble Sort that traverses the list in both directions alternately. It pushes the largest element to the end on the forward pass and the smallest to the front on the backward pass, slightly improving performance over standard Bubble Sort.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      pseudocode: `swapped = true
start = 0; end = n
while swapped:
  swapped = false
  for i = start to end-2:  // forward pass
    if arr[i] > arr[i+1]: swap; swapped = true
  if not swapped: break
  end--; swapped = false
  for i = end-1 down to start:  // backward pass
    if arr[i] > arr[i+1]: swap; swapped = true
  start++`,
      cppCode: `void cocktailSort(int arr[], int n) {
  bool swapped = true;
  int start = 0, end = n;
  while (swapped) {
    swapped = false;
    for (int i = start; i < end-1; i++)
      if (arr[i] > arr[i+1]) { std::swap(arr[i], arr[i+1]); swapped = true; }
    if (!swapped) break;
    swapped = false; end--;
    for (int i = end-1; i >= start; i--)
      if (arr[i] > arr[i+1]) { std::swap(arr[i], arr[i+1]); swapped = true; }
    start++;
  }
}`,
    },
    {
      name: 'Pancake Sort',
      function: pancakeSort,
      description:
        'Pancake Sort is a fun sorting algorithm where the only allowed operation is to flip (reverse) a prefix of the array. In each pass it finds the maximum element in the unsorted region, flips it to the front, and then flips the entire unsorted region to move it to its final position.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      pseudocode: `for size = n down to 2:
  mi = index of max in arr[0..size-1]
  if mi != size-1:
    flip(arr, mi)          // bring max to front
    flip(arr, size-1)      // move max to end

flip(arr, k): reverse arr[0..k]`,
      cppCode: `void flip(int arr[], int k) {
  int start = 0;
  while (start < k) std::swap(arr[start++], arr[k--]);
}

int findMax(int arr[], int n) {
  int mi = 0;
  for (int i = 1; i < n; i++) if (arr[i] > arr[mi]) mi = i;
  return mi;
}

void pancakeSort(int arr[], int n) {
  for (int sz = n; sz > 1; sz--) {
    int mi = findMax(arr, sz);
    if (mi != sz-1) { flip(arr, mi); flip(arr, sz-1); }
  }
}`,
    },
  ],
  [
    {
      name: 'Stooge Sort',
      function: stoogeSort,
      description:
        'Stooge Sort is a recursive sorting algorithm. It sorts the first 2/3 of the array, then the last 2/3, and then the first 2/3 again. While it correctly sorts any array, its time complexity of O(n^2.71) makes it significantly worse than most practical sorting algorithms — it is mainly of theoretical interest.',
      timeComplexity: 'O(n^2.71)',
      spaceComplexity: 'O(n)',
      pseudocode: `stoogeSort(arr, l, h):
  if arr[l] > arr[h]: swap(arr[l], arr[h])
  if h - l + 1 > 2:
    t = (h - l + 1) / 3
    stoogeSort(arr, l, h-t)
    stoogeSort(arr, l+t, h)
    stoogeSort(arr, l, h-t)`,
      cppCode: `void stoogeSort(int arr[], int l, int h) {
  if (arr[l] > arr[h]) std::swap(arr[l], arr[h]);
  if (h - l + 1 > 2) {
    int t = (h - l + 1) / 3;
    stoogeSort(arr, l, h - t);
    stoogeSort(arr, l + t, h);
    stoogeSort(arr, l, h - t);
  }
}`,
    },
    {
      name: 'Bogo Sort',
      function: bogoSort,
      description:
        'Bogo Sort (also known as Permutation Sort or Stupid Sort) works by generating random permutations of the array until one happens to be sorted. It has no practical use and exists purely as a joke/educational example. Its expected time complexity is O(n × n!) — catastrophically slow.',
      timeComplexity: 'O(n × n!) expected',
      spaceComplexity: 'O(1)',
      pseudocode: `while arr is not sorted:
  randomly shuffle arr`,
      cppCode: `bool isSorted(int arr[], int n) {
  for (int i = 1; i < n; i++) if (arr[i] < arr[i-1]) return false;
  return true;
}

void bogoSort(int arr[], int n) {
  while (!isSorted(arr, n))
    std::shuffle(arr, arr + n, std::default_random_engine{});
}`,
    },
    {
      name: 'Exchange Sort',
      function: exchangeSort,
      description:
        'Exchange Sort (also known as Comparison Sort) is similar to Bubble Sort but instead of only comparing adjacent elements it compares each element with all subsequent elements and immediately swaps if out of order. It performs the same number of comparisons as Selection Sort but more swaps.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      pseudocode: `for i = 0 to n-2:
  for j = i+1 to n-1:
    if arr[i] > arr[j]:
      swap(arr[i], arr[j])`,
      cppCode: `void exchangeSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++)
    for (int j = i + 1; j < n; j++)
      if (arr[i] > arr[j]) std::swap(arr[i], arr[j]);
}`,
    },
    {
      name: 'Odd Even Sort',
      function: oddEvenSort,
      description:
        'Odd-Even Sort (also called Brick Sort) is a parallel variant of Bubble Sort. In each iteration it performs two passes: one comparing and swapping elements at odd indices with their next neighbour, and one comparing elements at even indices. It is especially well-suited for parallel execution.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      pseudocode: `sorted = false
while not sorted:
  sorted = true
  for i = 1 to n-2 step 2 (odd phase):
    if arr[i] > arr[i+1]: swap; sorted = false
  for i = 0 to n-2 step 2 (even phase):
    if arr[i] > arr[i+1]: swap; sorted = false`,
      cppCode: `void oddEvenSort(int arr[], int n) {
  bool sorted = false;
  while (!sorted) {
    sorted = true;
    for (int i = 1; i <= n-2; i += 2)
      if (arr[i] > arr[i+1]) { std::swap(arr[i], arr[i+1]); sorted = false; }
    for (int i = 0; i <= n-2; i += 2)
      if (arr[i] > arr[i+1]) { std::swap(arr[i], arr[i+1]); sorted = false; }
  }
}`,
    },
    {
      name: 'Counting Sort',
      function: countingSort,
      badge: 'new',
      description:
        'Counting Sort is a non-comparison integer sorting algorithm that counts the occurrences of each distinct key value, computes prefix sums to determine positions, and then places each element directly into its correct output position. It is extremely fast when the range of values k is small relative to n.',
      timeComplexity: 'O(n + k)',
      spaceComplexity: 'O(k)',
      pseudocode: `find max value k
count[0..k] = 0
for each element x: count[x]++
for i = 1 to k: count[i] += count[i-1]  // prefix sums
for i = n-1 down to 0:
  output[count[arr[i]]-1] = arr[i]
  count[arr[i]]--
copy output back to arr`,
      cppCode: `void countingSort(int arr[], int n) {
  int k = *std::max_element(arr, arr+n);
  std::vector<int> count(k+1, 0), output(n);
  for (int i = 0; i < n; i++) count[arr[i]]++;
  for (int i = 1; i <= k; i++) count[i] += count[i-1];
  for (int i = n-1; i >= 0; i--)
    output[--count[arr[i]]] = arr[i];
  for (int i = 0; i < n; i++) arr[i] = output[i];
}`,
    },
    {
      name: 'Comb Sort',
      function: combSort,
      badge: 'new',
      description:
        'Comb Sort improves on Bubble Sort by using a gap larger than 1 to compare and swap elements. The gap starts at n and shrinks by a factor of ~1.3 each iteration. Large gaps eliminate "turtles" (small values near the end of the array) quickly. When the gap reaches 1 it degenerates to Bubble Sort for the final cleanup.',
      timeComplexity: 'O(n²) worst / O(n log n) avg',
      spaceComplexity: 'O(1)',
      pseudocode: `gap = n; shrink = 1.3; sorted = false
while gap > 1 or not sorted:
  gap = max(1, floor(gap / shrink))
  sorted = true
  for i = 0 to n-gap-1:
    if arr[i] > arr[i+gap]:
      swap(arr[i], arr[i+gap])
      sorted = false`,
      cppCode: `void combSort(int arr[], int n) {
  int gap = n;
  bool swapped = true;
  while (gap != 1 || swapped) {
    gap = std::max(1, (int)(gap / 1.3));
    swapped = false;
    for (int i = 0; i < n - gap; i++)
      if (arr[i] > arr[i + gap]) {
        std::swap(arr[i], arr[i + gap]);
        swapped = true;
      }
  }
}`,
    },
    {
      name: 'Intro Sort',
      function: introSort,
      badge: 'new',
      description:
        'Introsort is a hybrid algorithm used as the default sort in many standard libraries (e.g. C++ std::sort). It starts with Quicksort for average-case O(n log n) performance, switches to Heapsort if the recursion depth exceeds 2·log₂(n) to guarantee O(n log n) worst case, and uses Insertion Sort for small subarrays (size < 16).',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      pseudocode: `introSort(arr, low, high, depthLimit):
  size = high - low + 1
  if size < 16:
    insertionSort(arr, low, high)
  else if depthLimit == 0:
    heapSort(arr, low, high)
  else:
    pivot = partition(arr, low, high)
    introSort(arr, low, pivot-1, depthLimit-1)
    introSort(arr, pivot+1, high, depthLimit-1)`,
      cppCode: `void introSort(int arr[], int low, int high, int depth) {
  if (high - low < 16) { insertionSort(arr, low, high); return; }
  if (depth == 0) { heapSortRange(arr, low, high); return; }
  int pivot = partition(arr, low, high);
  introSort(arr, low, pivot - 1, depth - 1);
  introSort(arr, pivot + 1, high, depth - 1);
}

void sort(int arr[], int n) {
  introSort(arr, 0, n-1, 2 * (int)log2(n));
}`,
    },
    {
      name: 'Bucket Sort',
      function: bucketSort,
      badge: 'new',
      description:
        'Bucket Sort distributes elements into a fixed number of buckets based on their value range, sorts each bucket individually (typically with Insertion Sort), and then concatenates the buckets to produce the sorted output. It performs well when the input is uniformly distributed and is ideal for floating-point numbers in a known range.',
      timeComplexity: 'O(n + k) avg / O(n²) worst',
      spaceComplexity: 'O(n + k)',
      pseudocode: `bucketCount = sqrt(n)
buckets = array of bucketCount empty lists
for each element x:
  idx = floor(x / (maxVal+1) * bucketCount)
  buckets[idx].append(x)
for each bucket:
  insertionSort(bucket)
concatenate all buckets into arr`,
      cppCode: `void bucketSort(float arr[], int n) {
  std::vector<std::vector<float>> b(n);
  for (int i = 0; i < n; i++)
    b[(int)(n * arr[i])].push_back(arr[i]);
  for (int i = 0; i < n; i++)
    std::sort(b[i].begin(), b[i].end());
  int idx = 0;
  for (int i = 0; i < n; i++)
    for (float x : b[i]) arr[idx++] = x;
}`,
    },
  ],
];
