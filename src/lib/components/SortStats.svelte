<script lang="ts">
  export let comparisons: number;
  export let dataAccesses: number;

  const fmt = (n: number) =>
    n >= 1_000_000
      ? (n / 1_000_000).toFixed(1) + 'M'
      : n >= 1_000
        ? (n / 1_000).toFixed(1) + 'K'
        : n.toString();
</script>

<div class="flex gap-4 text-sm font-mono">
  <div class="flex items-center gap-1.5">
    <span
      class="inline-block w-3 h-3 rounded-sm shrink-0"
      style="background: var(--color-stat-cmp, oklch(var(--a)))"
    ></span>
    <span class="opacity-70">Comparisons:</span>
    <span class="font-bold tabular-nums">{fmt(comparisons)}</span>
  </div>
  <div class="flex items-center gap-1.5">
    <span
      class="inline-block w-3 h-3 rounded-sm shrink-0"
      style="background: var(--color-stat-acc, oklch(var(--p)))"
    ></span>
    <span class="opacity-70">Array accesses:</span>
    <span class="font-bold tabular-nums">{fmt(dataAccesses)}</span>
  </div>
</div>
