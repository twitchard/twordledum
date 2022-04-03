const nSatisfy = <T>(arr: Array<T>, pred: (t: T, i: number) => boolean): number =>
	arr.map((x, i) => (pred(x, i) ? 1 : 0)).reduce((acc, cur) => acc + cur, 0);

const letterStatus = (
	guess: Array<string>,
	secretWordLetters: Array<string>,
	j: number
): 'correct' | 'misplaced' | 'wrong' => {
	if (guess[j] === secretWordLetters[j]) return 'correct';
	if (secretWordLetters.includes(guess[j]) && guess[j] !== secretWordLetters[j]) return 'misplaced';
	return 'wrong';
};
export const calculateColor = (
	guess: Array<string>,
	secretWordLetters: Array<string>,
	j: number
): 'green' | 'yellow' | 'dark' => {
	const letter = guess[j];

	const status = letterStatus(guess, secretWordLetters, j);
	if (status === 'correct') {
		return 'green';
	}
	if (status === 'misplaced') {
		const nMisplacedOfThatLetter = nSatisfy(
			guess,
			(x, k) => x === letter && letterStatus(guess, secretWordLetters, k) === 'misplaced'
		);
		const nPriorMisplacedOfThatLetter = nSatisfy(
			guess.slice(0, j),
			(x, k) => x === letter && letterStatus(guess, secretWordLetters, k) === 'misplaced'
		);
		if (nPriorMisplacedOfThatLetter < nMisplacedOfThatLetter) return 'yellow';
	}
	return 'dark';
};
