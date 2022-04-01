const nSatisfy = <T>(arr: Array<T>, pred: (t: T, i: number) => boolean): number =>
	arr.map((x, i) => (pred(x, i) ? 1 : 0)).reduce((acc, cur) => acc + cur, 0);

const letterStatus = (
	guesses: Array<Array<string>>,
	secretWordLetters: Array<string>,
	i: number,
	j: number
): 'correct' | 'misplaced' | 'wrong' => {
	if (guesses[i][j] == secretWordLetters[j]) return 'correct';
	if (secretWordLetters.includes(guesses[i][j]) && guesses[i][j] !== secretWordLetters[j])
		return 'misplaced';
	return 'wrong';
};
export const calculateColor = (
	guesses: Array<Array<string>>,
	secretWordLetters: Array<string>,
	i: number,
	j: number
) => {
	const letter = guesses[i][j];

	const status = letterStatus(guesses, secretWordLetters, i, j);
	if (status === 'correct') {
		return 'green';
	}
	if (status === 'misplaced') {
		const nMisplacedOfThatLetter = nSatisfy(
			guesses[i],
			(x, k) => x === letter && letterStatus(guesses, secretWordLetters, i, k) === 'misplaced'
		);
		const nPriorMisplacedOfThatLetter = nSatisfy(
			guesses[i].slice(0, j),
			(x, k) => x === letter && letterStatus(guesses, secretWordLetters, i, k) === 'misplaced'
		);
		if (nPriorMisplacedOfThatLetter < nMisplacedOfThatLetter) return 'yellow';
	}
	return 'dark';
};
