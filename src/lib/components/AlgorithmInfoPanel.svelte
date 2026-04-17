<script lang="ts">
  import type { AlgorithmDefinition } from '../sort-algorithms/types';

  export let algorithm: AlgorithmDefinition | undefined;

  let activeTab: 'description' | 'pseudocode' | 'cpp' = 'description';

  $: if (algorithm) activeTab = 'description';
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

    <div role="tablist" class="tabs tabs-bordered tabs-sm mb-3">
      {#if algorithm.description}
        <button
          role="tab"
          class="tab {activeTab === 'description' ? 'tab-active' : ''}"
          on:click={() => (activeTab = 'description')}
        >
          Description
        </button>
      {/if}
      {#if algorithm.pseudocode}
        <button
          role="tab"
          class="tab {activeTab === 'pseudocode' ? 'tab-active' : ''}"
          on:click={() => (activeTab = 'pseudocode')}
        >
          Pseudocode
        </button>
      {/if}
      {#if algorithm.cppCode}
        <button
          role="tab"
          class="tab {activeTab === 'cpp' ? 'tab-active' : ''}"
          on:click={() => (activeTab = 'cpp')}
        >
          C++ Code
        </button>
      {/if}
    </div>

    {#if activeTab === 'description' && algorithm.description}
      <p class="text-sm leading-relaxed">{algorithm.description}</p>
    {/if}

    {#if activeTab === 'pseudocode' && algorithm.pseudocode}
      <pre class="text-xs bg-base-200 rounded p-3 overflow-x-auto whitespace-pre leading-5">{algorithm.pseudocode}</pre>
    {/if}

    {#if activeTab === 'cpp' && algorithm.cppCode}
      <pre class="text-xs bg-base-200 rounded p-3 overflow-x-auto whitespace-pre leading-5">{algorithm.cppCode}</pre>
    {/if}
  </div>
{/if}
