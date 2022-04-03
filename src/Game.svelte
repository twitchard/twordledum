<script type="ts">
	import Keyboard from './Keyboard.svelte';
	import Guesses from './Guesses.svelte';
	import * as G from './game';
	import type { Game } from './game';

	export let gameId: string;
	let game: Game = G.initialGame();
	let errorMessage: string | null = null;
	$: colors = G.calculateKeyboardColors(game.guesses);

	const clickLetter = (x: string) => {
		if (game.t !== 'active') return;
		game = G.addLetter(game, x);
	};

	const clickBackspace = () => {
		if (game.t !== 'active') return;
		game = G.removeLetter(game);
	};

	const clickEnter = async () => {
		if (game.t !== 'active') return;
		const response = await fetch('/guess', {
			method: 'POST',
			body: JSON.stringify({
				gameId,
				guess: game.activeGuess
			})
		});
		if (response.status >= 400) {
			errorMessage = await response.text();
		}
		const result: G.EvaluatedGuess = await response.json();
		game = G.getAnswer(game, result);
	};
</script>

<div class="app">
  {#if errorMessage}
<div class:errorMessage={true}>{errorMessage}</div>
  {/if}
	<Guesses {game} />
	<Keyboard {clickLetter} {clickBackspace} {clickEnter} {colors} />
</div>

<style>
	.app {
		width: 500px;
		margin-left: auto;
		margin-right: auto;
	}
	.errorMessage {
    background: lightred;
  }
</style>
