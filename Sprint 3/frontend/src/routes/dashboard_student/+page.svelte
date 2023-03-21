<script>
	import Interview from '$lib/components/Interview.svelte';
	import Signout from '$lib/components/Signout.svelte';
	import {goto} from "$app/navigation";
	import authService from "$lib/features/authService.js";

	async function auth() {
		const user = authService.getUser();
		if (user === null || user === undefined || user.role !== "Student") {
			await goto('/');
		}
	}

	auth();

</script>

	<!--<Signout />-->

	<h1>Upcoming Interviews</h1>

	<div class='interviews'>
		<Interview />
		<Interview />
		<Interview />
		<Interview />
		<Interview />
		<Interview />

	</div>


<style>

    *{
        font-family: 'Barlow', sans-serif;
    }

		h1{
        color: white;
		}

    .interviews {
				display: grid;
				grid-template-columns: 2fr 2fr;
				grid-gap: 1em;
				justify-items: stretch;
				position: relative;
				left: 2em;
    }

</style>

