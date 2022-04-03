<script type="ts">
	import Game from '../Game.svelte';
	import Loader from '../Loader.svelte';
	import Craft from '../Craft.svelte';
	import Solve from '../Solve.svelte';
	import Score from '../Score.svelte';

	import createAuth0Client from '@auth0/auth0-spa-js';

	export let authConfig: {
		domain: string;
		clientId: string;
	};

	type MyPuzzle = {
		word: string;
	};
	export let myPuzzles: {
		today: null | MyPuzzle;
		tomorrow: null | MyPuzzle;
	};
	export let suggestedPuzzles = [];
	export let score = [];

	const secretWord = 'xxxxx';

	const getAuthInfo = async () => {
		if (1 === 1) return null as any;
		const auth0 = await createAuth0Client({
			domain: authConfig.domain,
			client_id: authConfig.clientId
		});
		const isAuthenticated = await auth0.isAuthenticated();
		if (!isAuthenticated) {
			const query = window.location.search;
			if (query.includes('code=') && query.includes('state=')) {
				await auth0.handleRedirectCallback();
				window.history.replaceState({}, document.title, '/');
			}
		}
		return { auth0, isAuthenticated };
	};
</script>

<div class="app">
	<Craft {myPuzzles} />
	<Solve {suggestedPuzzles} />
	<Score {score} />

	{#await getAuthInfo()}
		<Loader --width="20px" --height="20px" />
	{:then { auth0, isAuthenticated }}
		{#if isAuthenticated}
			<Game {secretWord} />
		{:else}
			<button
				on:click={() => {
					auth0.loginWithRedirect({ redirect_uri: window.location.origin });
				}}>Log in</button
			>
		{/if}
	{/await}
</div>

<style>
	.app {
		text-align: center;
		width: 800;
	}
</style>
