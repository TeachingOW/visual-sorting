<script lang="ts">
  import type { AlgorithmDefinition } from '../sort-algorithms/types';

  export let algorithm: AlgorithmDefinition | undefined;
</script>

{#if algorithm && (algorithm.description || algorithm.pseudocode || algorithm.cppCode)}
  <div class="card bg-base-300 rounded-box p-4 mt-2">
    <div class="flex flex-wrap items-center gap-3 mb-3">
      <h2 class="text-base font-bold">{algorithm.name}</h2>
      {#if algorithm.timeComplexity}
        <span class="badge badge-outline badge-sm">Time: {algorithm.timeComplexity}</span>
      {/if}
      {#if algorithm.spaceComplexity}
        <span class="badge badge-outline badge-sm">Space: {algorithm.spaceComplexity}</span>
      {/if}
    </div>

    <div class="grid gap-4 lg:grid-cols-3">
      {#if algorithm.description}
        <section class="flex min-h-0 flex-col rounded bg-base-200 p-3">
          <h3 class="mb-2 text-sm font-semibold uppercase tracking-wide opacity-70">Description</h3>
          <p class="text-sm leading-relaxed">{algorithm.description}</p>
        </section>
      {/if}
      {#if algorithm.pseudocode}
        <section class="flex min-h-0 flex-col rounded bg-base-200 p-3">
          <h3 class="mb-2 text-sm font-semibold uppercase tracking-wide opacity-70">Pseudocode</h3>
          <pre class="flex-1 overflow-x-auto whitespace-pre text-xs leading-5">{algorithm.pseudocode}</pre>
        </section>
      {/if}
      {#if algorithm.cppCode}
        <section class="flex min-h-0 flex-col rounded bg-base-200 p-3">
          <h3 class="mb-2 text-sm font-semibold uppercase tracking-wide opacity-70">C++ Code</h3>
          <pre class="flex-1 overflow-x-auto whitespace-pre text-xs leading-5">{algorithm.cppCode}</pre>
        </section>
      {/if}
    </div>
  </div>
{/if}
