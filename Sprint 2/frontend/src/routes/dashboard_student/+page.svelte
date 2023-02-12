<script>
	import Interview from '$lib/components/Interview.svelte';

</script>

<section>
	<h1 style='font-size: 25px;'>Upcoming Interviews</h1>

	<div class='interviews-grid'>
		<Interview />
		<Interview />
		<Interview />
		<Interview />
		<Interview />
		<Interview />

	</div>

</section>

<style>
    section {
        outline-color: black;
        outline-style: solid;
        outline-width: 2px;
        width: 90%;
        display: block;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 80px;
        bottom: 80px;
    }

    .interviews-grid {
        display: grid;
        grid-auto-flow: row;
        grid-template-columns: 2fr 2fr;
        grid-template-rows: unset;
				width: 100%;
				gap: 1.5em;
				margin: 2em;

    }

</style>

