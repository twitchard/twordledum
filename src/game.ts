export type Game =
	| {
			t: 'active';
			guesses: Array<EvaluatedGuess>;
			activeGuess: string;
	  }
	| {
			t: 'victory' | 'defeat';
			guesses: Array<EvaluatedGuess>;
	  };

export type Color = 'green' | 'yellow' | 'dark';
export type EvaluatedGuess = Array<[string, Color]>;

export const initialGame = (): Game => ({
	t: 'active',
	guesses: [],
	activeGuess: ''
});

export const addLetter = (game: Game & { t: 'active' }, letter: string): Game => {
	if (game.activeGuess.length >= 5) return game;
	return {
		...game,
		activeGuess: game.activeGuess + letter
	};
};

export const removeLetter = (game: Game & { t: 'active' }): Game => {
	return {
		...game,
		activeGuess: game.activeGuess.slice(0, -1)
	};
};

export const getAnswer = (game: Game & { t: 'active' }, guess: EvaluatedGuess): Game => {
	const guesses = [...game.guesses, guess];
	if (guess.every(([_, color]) => color === 'green')) {
		return {
			...game,
			guesses,
			t: 'victory'
		};
	}
	if (guesses.length === 6) {
		return {
			...game,
			t: 'defeat',
			guesses
		};
	}
	return {
		...game,
		guesses: [...game.guesses, guess],
		activeGuess: ''
	};
};

export const calculateKeyboardColors = (
	guesses: Array<EvaluatedGuess>
): { [letter: string]: Color } => {
	const colors = {};
	const upgrade = (letter: string, color: Color) => {
		colors[letter] = ['green', 'yellow', 'dark'].filter((x) =>
			[colors[letter], color].includes(x)
		)[0];
	};
	guesses.forEach((guess) => {
		guess.forEach(([letter, color]) => upgrade(letter, color));
	});
	return colors;
};
