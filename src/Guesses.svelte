<script type="ts">
	import { fade } from 'svelte/transition';
	import type { Game, Color } from './game';
	export let game: Game;
	const padToFive = (x: string): Array<string> => {
		return [...x.split(''), ...new Array(5 - x.length).fill('')];
	};
	const emptyGuess = (): Array<[string, Color | null]> =>
		new Array(5).fill(0).map(() => ['', null]);
	$: guesses = [
		...game.guesses,
		...(game.t === 'active' ? [padToFive(game.activeGuess).map((letter) => [letter, null])] : []),
		...new Array(5 - game.guesses.length).fill(0).map(() => emptyGuess())
	];
	$: revealed = [0, 0, 0, 0, 0, 0];
</script>

<div class="container">
	{#each guesses as guess, i}
		{#if i < game.guesses.length}
			{#each guess as [letter, color], j}
				{#if j > revealed[i]}
					<div
						style={`grid-row-start: ${i + 1}; grid-column-start: ${j + 1}`}
						class:cell={true}
						class:pending={letter !== ''}
					>
						{letter}
					</div>
				{:else}
					<div
						class:green={color === 'green'}
						class:yellow={color === 'yellow'}
						class:dark={color === 'dark'}
						class:cell={true}
						style={`grid-row-start: ${i + 1}; grid-column-start: ${j + 1}`}
						on:introend={() => {
							revealed[i]++;
						}}
						transition:fade
					>
						{letter}
					</div>
				{/if}
			{/each}
		{:else}
			{#each guess as [letter, _], j}
				<div
					style={`grid-row-start: ${i + 1}; grid-column-start: ${j + 1}`}
					class:cell={true}
					class:pending={letter !== ''}
				>
					{letter}
				</div>
			{/each}
		{/if}
	{/each}
</div>

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
