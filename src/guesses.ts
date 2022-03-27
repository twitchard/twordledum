export const makeCalculateColor = (guesses: Array<Array<string>>, secretWordLetters: Array<string>) => {
  const isCorrect = (i: number, j: number): boolean => guesses[i][j] == secretWordLetters[j] 
  const isMisplaced = (i: number, j: number): boolean => !isCorrect(i, j) && secretWordLetters.includes(guesses[i][j]) && guesses[i][j] !== secretWordLetters[j]
  const nSatisfy = <T>(arr: Array<T>, pred: (t: T, i: number) => boolean): number => arr.map((x, i) => pred(x, i) ? 1 : 0).reduce((acc, cur) => acc + cur, 0)
  
  const calculateColor = (i: number, j: number) => {
    const letter = guesses[i][j]
  
    if (isCorrect(i, j)) {
      return 'green'
    }
    if (isMisplaced(i, j)) {
      const nMisplacedOfThatLetter = nSatisfy(guesses[i], (x, k) => x === letter && isMisplaced(i, k))
      const nPriorMisplacedOfThatLetter = nSatisfy(guesses[i].slice(0, j), (x, k) => x === letter && isMisplaced(i, k))
      if (nPriorMisplacedOfThatLetter < nMisplacedOfThatLetter) return 'yellow'
    }
    return 'dark'
  }
	return calculateColor;
}
