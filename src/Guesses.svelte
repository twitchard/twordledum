<script type="ts">
	import { fade } from 'svelte/transition';
  import { makeCalculateColor } from './guesses.ts'
	export let guesses: Array<Array<string>>;
	export let secretWordLetters: Array<string>;
	export let curI: number;
  $: revealed = [0, 0, 0, 0, 0, 0];
  $: calculateColor = makeCalculateColor(guesses, secretWordLetters);
  $: colors = guesses.map((guess, i) => guess.map((_, j) => calculateColor(i, j)));

</script>
<style>
	.container {
	  display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(6, minmax(0, 1fr));
		/*justify-content: center;*/
		width: 200px;
		height: 200px;
		margin-left: auto;
		margin-right: auto;
    grid-gap: 5px;
	}
	.cell {
		border: 2px lightgray solid;
		width: 1fr;
		height: 1fr;
    text-align: center;
		line-height: 1fr;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    display: inline-flex;
	}
  .green {
    background: green;
  }
  .yellow {
    background: yellow;
  }
  .dark {
    background: gray;
  }
  .pending {
    border: 2px black solid;
  } 
</style>
<div class="container">
	{#each guesses as guess, i}
    {#if (i < curI)}
	    {#each guess as letter, j}
        {#if (j > revealed[i])}
          <div
            style={`grid-row-start: ${i+1}; grid-column-start: ${j+1}`}
            class:cell={true}
            class:pending={letter !== ""}
          >
            {letter}
          </div>
        {:else}
          <div class:green={colors[i][j] === 'green'}
               class:yellow={colors[i][j] === 'yellow'}
               class:dark={colors[i][j] === 'dark'}
               class:cell={true}
               style={`grid-row-start: ${i+1}; grid-column-start: ${j+1}`}
               on:introend={() => {revealed[i]++}}
               transition:fade
           >
       	    {letter}
	        </div>
        {/if}
      {/each}
		{:else}
	    {#each guess as letter, j}
			  <div 
            style={`grid-row-start: ${i+1}; grid-column-start: ${j+1}`}
            class:cell={true}
            class:pending={letter !== ""}
        >
          {letter}
        </div>
      {/each}
		{/if}
	{/each}
</div>
