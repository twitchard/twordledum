export async function get() {
	return {
		status: 200,
		body: {
			secretWord: 'widen',
			authConfig: {
				domain: 'dev-aerjfdlb.us.auth0.com',
				clientId: 'iPCy4qRSArGCrPDZW9Y7dkpD1M8vOpeG'
			},
			myPuzzles: {
				today: null,
				tomorrow: null
			},
			suggestedPuzzles: [
				{
					author: 'twitchard',
					word: 'forth'
				},
				{
					author: 'angelica',
					word: 'froth'
				}
			]
		}
	};
}
