<script type="ts">
	import Keyboard from './Keyboard.svelte'
	import Guesses from './Guesses.svelte'
	import wordList from './words'
	const secretWord = "tasty"
	const secretWordLetters = secretWord.split("")
	const emptyGuess = () => ["", "", "", "", ""]
	$: curI = 0
	$: curJ = 0

	let colors: {[color: string]: 'yellow' | 'dark' | 'green'} = {};
													 
	type Color = 'green' | 'yellow' | 'dark'
	const upgrade = (letter: string, newColor: Color): void => {
		const old = colors[letter];
		const value = ['green' as const, 'yellow' as const, 'dark' as const].filter(x => [newColor, old].includes(x))[0];
		colors = {...colors, [letter]: value};
	}
	
  const evaluateGuess = (guess: Array<string>) => {
		for (const i in guess) {
			const letter = guess[i]
			if (secretWordLetters[i] === guess[i]) {
				upgrade(letter, 'green')
			} else if (secretWordLetters.includes(letter)) {
				upgrade(letter, 'yellow')
			} else {
				upgrade(letter, 'dark')
			}
		}
	}

	const handleGuess = () => {
		if (curI >= 6) {
			console.log("Out of guesses")
		}
		if (wordList.has(guesses[curI].join(""))) {
			console.log("I know that word")
			evaluateGuess(guesses[curI])
			curI++
			curJ=0
		} else {
		  console.log("Not a word, try again.")
		}
	}

	const clickLetter = (x: string) => {
		if (curJ < 5) {
		  guesses[curI][curJ] = x
		  curJ++;
		}
	}

	const clickBackspace = () => {
		if (curJ > 0) {
			guesses[curI][curJ-1] = ""
			curJ--
		}
	}

	const clickEnter = () => {
		if (curJ = 4) {
			return handleGuess();
		}
	}

	$: guesses = new Array(6).fill(null).map(_ => emptyGuess())
</script>
<style>
	.app {
    width: 500px;
  }
</style>
<div class="app">
  <Guesses {guesses} {curI} {secretWordLetters}/>
  <Keyboard {clickLetter} {clickBackspace} {clickEnter} {colors}></Keyboard>
</div>
