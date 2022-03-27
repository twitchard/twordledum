<script type="ts">
	import Backspace from './Backspace.svelte';
	export let clickLetter: (letter: string) => void;
	export let clickBackspace: () => void;
	export let clickEnter: () => void;
	export let colors: { [letter: string]: 'green' | 'yellow' | 'dark' };
	const makeLetter = (letter: string) => ({ shape: 'letter' as const, letter });
	const space = () => ({ shape: 'space' as const });
	const enter = () => ({ shape: 'enter' as const });
	const backspace = () => ({ shape: 'backspace' as const });

	const rows = [
		'qwertyuiop'.split('').map(makeLetter),
		[space(), ...'asdfghjkl'.split('').map(makeLetter)],
		[enter(), ...'zxcvbnm'.split('').map(makeLetter), backspace()]
	];
</script>

<div class="container">
	{#each rows as row, i}
		{#each row as cell}
			{#if cell.shape === 'backspace'}
				<button
					style={`grid-row-start: ${i + 1}`}
					class:width-3={true}
					class:light={true}
					on:click={() => clickBackspace()}><Backspace /></button
				>
			{/if}
			{#if cell.shape === 'enter'}
				<button
					style={`grid-row-start: ${i + 1}`}
					class:width-3={true}
					class:light={true}
					on:click={() => clickEnter()}
				>
					enter
				</button>
			{/if}
			{#if cell.shape === 'letter'}
				<button
					style={`grid-row-start: ${i + 1}`}
					on:click={() => clickLetter(cell.letter)}
					class:green={colors[cell.letter] === 'green'}
					class:yellow={colors[cell.letter] === 'yellow'}
					class:dark={colors[cell.letter] === 'dark'}
					class:light={!colors[cell.letter]}
					class:width-2={true}
				>
					{cell.letter}
				</button>
			{/if}
			{#if cell.shape === 'space'}
				<div style={`grid-row-start: ${i + 1}`} class:width-1={true} />
			{/if}
		{/each}
	{/each}
</div>

<style>
	.container {
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(20, 1fr);
		grid-template-rows: repeat(3, 1fr);
		grid-gap: 4px;
		margin: 4px;
	}
	.container button {
		font-family: sans;
		font-weight: bold;
		border-radius: 3px;
		height: 60px;
		text-align: center;
		text-transform: uppercase;
		margin: 0;
		padding: 0;
		border: none;
	}
	.container button.light {
		background: lightgray;
	}
	.container button.green {
		background: green;
	}
	.container button.yellow {
		background: yellow;
	}
	.container button.dark {
		background: gray;
	}
	.width-1 {
		grid-column: span 1;
	}
	.width-2 {
		grid-column: span 2;
	}
	.width-3 {
		grid-column: span 3;
	}
</style>
