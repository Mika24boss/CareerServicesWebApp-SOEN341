<script>
	import Interview from '$lib/components/Interview.svelte';

</script>


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

    .interviews {
		display: grid;
		grid-template-columns: 2fr 2fr;
		grid-gap: 1em;
		justify-items: stretch;
		position: relative;
		left: 2em;

    }

</style>

