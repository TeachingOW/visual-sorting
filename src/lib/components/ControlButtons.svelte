<script lang="ts">
  export let size: number;
  export let step: () => void;
  export let reset: () => void;

  import { arrayToSort, running } from '../../states';
  import { generateArray, shuffle, almostSorted } from '../randomized-array-generator';
  import { trackEvent } from '../umami';

  let radius = 10;

  const start = () => {
    $running = !$running;
  };

  const reverse = () => {
    $arrayToSort = generateArray(size).reverse();
    reset();
    trackEvent('array-pattern', { pattern: 'reverse' });
  };

  const shuffleClick = () => {
    $arrayToSort = shuffle(generateArray(size));
    reset();
    trackEvent('array-pattern', { pattern: 'shuffle' });
  };

  const oddsEvens = () =>
    generateArray(size)
      .sort((a, b) => a - b)
      .reduce<[number[], number[]]>(
        ([odds, evens], v) => {
          v % 2 === 0 ? evens.push(v) : odds.push(v);
          return [odds, evens];
        },
        [[], []]
      );

  const valley = () => {
    const [odds, evens] = oddsEvens();
    $arrayToSort = [...odds.reverse(), ...evens];

    reset();
    trackEvent('array-pattern', { pattern: 'valley' });
  };

  const mountain = () => {
    const [odds, evens] = oddsEvens();
    $arrayToSort = [...odds, ...evens.reverse()];

    reset();
    trackEvent('array-pattern', { pattern: 'mountain' });
  };

  const almostSortedClick = () => {
    $arrayToSort = almostSorted(size, radius);
    reset();
    trackEvent('array-pattern', { pattern: 'almost-sorted' });
  };

  const stepClick = () => {
    step();
  };
</script>

<div class="mb-2 lg:mb-4">
  <div class="join">
    <button
      class="btn join-item {$running
        ? 'btn-secondary'
        : 'btn-primary'} lg:btn-lg lg:w-24"
      on:click={start}>{$running ? 'Stop' : 'Start'}</button
    >
    <button class="btn join-item lg:btn-lg lg:w-24" on:click={stepClick}>Step</button
    >
  </div>
  <button class="btn lg:btn-lg" on:click={shuffleClick}>Shuffle</button>
</div>
<div>
  <button class="btn" on:click={reverse}>Reverse</button>
  <button class="btn" on:click={valley}>Valley</button>
  <button class="btn" on:click={mountain}>Mountain</button>
  <button class="btn" on:click={almostSortedClick}>Almost Sorted</button>
</div>
<div class="mt-1">
  <label class="form-control w-full max-w-xs">
    <div class="label py-0">
      <span class="label-text text-xs">Almost sorted radius</span>
      <span class="label-text-alt text-xs">{radius}</span>
    </div>
    <input
      class="range range-xs"
      type="range"
      min="2"
      max="50"
      bind:value={radius}
      disabled={$running}
    />
  </label>
</div>
