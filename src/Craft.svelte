<script type="ts">
	type MyPuzzle = {
		word: string;
	};
	export let myPuzzles:
		| { today: null; tomorrow: null }
		| { today: MyPuzzle; tomorrow: null }
		| { today: MyPuzzle; tomorrow: MyPuzzle };
	let todayWord: string = '';

	// const onTodayWordInput = (event: Event & {currentTarget: HTMLInputElement}) => {
	// 	  todayWord = event.currentTarget.value.slice(0, 5);
	//     event.currentTarget.value = todayWord
	// 		event.preventDefault();
	// };
	const letters = new Set('abcdefghijklmnopqrstuvwxyz'.split(''));
	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Backspace') {
			todayWord = todayWord.slice(0, -1);
			return;
		}
	};
	const onKeypress = (event: KeyboardEvent) => {
		const letter = event.key.toLowerCase();
		if (!letters.has(letter)) return;
		todayWord += letter;
		todayWord = todayWord.slice(0, 5);
	};
	$: slots = new Array(5).fill(0).map((_, i) => todayWord[i] || '');
</script>

<svelte:window on:keydown={onKeyDown} on:keypress={onKeypress} />
{#if !myPuzzles.today}
	<p>Choose your secret, five-letter word of the day</p>
	<div class="container">
		{#each slots as slot, i}
			<div class:cell={true} class:active={todayWord.length === i}>{slot}</div>
		{/each}
		<button class:active={todayWord.length === 5}>submit</button>
	</div>
	<!--<input type="text" placeholder="" on:input={onTodayWordInput} />-->
{:else}
	<h3>Your word today is {myPuzzles.today.word}</h3>
{/if}

<style>
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
	.container {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr)) 2.5fr;
		grid-template-rows: minmax(0, 1fr);
		/*justify-content: center;*/
		width: 320px;
		height: 36px;
		margin-left: auto;
		margin-right: auto;
		grid-gap: 5px;
	}
	.active {
		border: blue 2px solid;
	}
</style>
