<script type="ts">
	import Game from '../Game.svelte';
	export let secretWord: string;

	import createAuth0Client from '@auth0/auth0-spa-js';

	export let authConfig: {
		domain: string;
		clientId: string;
	};
	const getAuthInfo = async () => {
		const auth0 = await createAuth0Client({
		  domain: authConfig.domain,
		  client_id: authConfig.clientId
	  })
		const isAuthenticated = await auth0.isAuthenticated();
		if (!isAuthenticated) {
			const query = window.location.search;
			if (query.includes("code=") && query.includes("state=")) {
				await auth0.handleRedirectCallback();
				window.history.replaceState({}, document.title, "/");
			}
		}
		return {auth0, isAuthenticated}
	}
</script>

{#await getAuthInfo()}
  Checking to see if you're logged in...
{:then {auth0, isAuthenticated}}
	{#if isAuthenticated}
		<Game {secretWord} />
	{:else}
		<button
			on:click={() => {
				auth0.loginWithRedirect({ redirect_uri: window.location.origin });
			}}
>Log in</button>
	{/if}
{/await}
