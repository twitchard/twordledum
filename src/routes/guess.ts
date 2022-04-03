import { calculateColor } from '../guesses';
import wordList from '../words';
const games = {
	twitchard: 'lunch',
	angelica: 'favor'
};
const badRequest = (message: string) => ({ status: 400, body: message });
const notFound = (message: string) => ({ status: 404, body: message });
export async function post({ request }: { request: Request }) {
	const args = await request.json();
	const gameId: string = args['gameId'];
	const guess: string = args['guess'];
	if (!gameId || typeof gameId !== 'string') {
		return badRequest('invalid gameId');
	}
	if (!games[gameId]) {
		return notFound(`No such game ${gameId}`);
	}
	if (typeof guess !== 'string') {
		return badRequest('invalid guess: must be string');
	}
	if (guess.length !== 5) {
		return badRequest('invalid guess: must be five letters');
	}
	if (!wordList.has(guess)) {
		return badRequest("I don't know that word");
	}

	const secretWordLetters = games[gameId].split('');
	const guessLetters = guess.split('');
	return {
		status: 200,
		body: guessLetters.map((letter, i) => [
			letter,
			calculateColor(guessLetters, secretWordLetters, i)
		])
	};
}
