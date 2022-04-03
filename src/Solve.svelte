<script type="ts">
	type Puzzle = {
		author: string;
		word: string;
	};
	export let suggestedPuzzles: Array<Puzzle>;
	import Game from './Game.svelte';
	let selected = 0;
	const onNext = () => {
		if (selected >= suggestedPuzzles.length - 1) {
			return;
		}
		selected++;
	};

	const onPrev = () => {
		if (selected <= 0) {
			return;
		}
		selected--;
	};
</script>

{#each suggestedPuzzles as puzzle, i}
	<div hidden={i !== selected}>
		<p>
			Solve {puzzle.author}'s puzzle
		</p>
		<p>
			<button on:click={onPrev}>previous</button>
			<button on:click={onNext}>next</button>
		</p>
		<Game gameId={puzzle.author} />
	</div>
{/each}
