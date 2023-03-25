<script>
	import Interview from '$lib/components/Interview.svelte';
	import authService from '$lib/features/authService.js';
	import jobService from '$lib/features/jobService.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let jobsPack;
	let interviewsArray;
	let user;

	onMount(() => {
		user = authService.getUser();
		jobsPack = loadAllJobs();
	});

	async function loadAllJobs() {
		if (user === null || user === undefined) {
			await goto('/');
		}

		const jobs = await jobService.getJobs(user.token);
		jobsPack = jobs.map(function(job) {
			return {
				jobID: job.jobID,
				title: job.title,
				companyName: job.companyName,
				location: job.location,
				isActive: job.isActive,
				applicants: job.applicants
			};
		});

		let status, studentID = '';
		let appsArray;
		interviewsArray = [];

		for (let i = 0; i < jobsPack.length; i++) {
			status = jobsPack[i].isActive;
			appsArray = jobsPack[i].applicants;

			for (let j = 0; j < appsArray.length; j++) {
				studentID = appsArray[j];
				if ((status === true) && (studentID === user._id)) interviewsArray.push(jobsPack[i]);
			}
		}
	}
</script>


<div class='student-dashboard'>
	<h1>Upcoming Interviews</h1>

	{#if interviewsArray}
		<div class='interviews'>
			{#each interviewsArray as interview}
				<Interview {...interview} />
			{/each}
		</div>
	{/if}
</div>


<style>

    * {
        font-family: 'Barlow', sans-serif;
    }

    h1 {
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

