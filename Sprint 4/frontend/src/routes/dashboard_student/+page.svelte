<script>
	import Interview from '$lib/components/Interview.svelte';
	import authService from '$lib/features/authService.js';
	import jobService from '$lib/features/jobService.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let interviewsPack;
	let user, interviews;


	onMount(() => {
		user = authService.getUser();
		interviewsPack = loadAllJobs();
	});

	async function loadAllJobs() {
		if (user == null) {
			await goto('/');
		}

		const student = await authService.getUserByID(user._id, user.token);
		interviews = student.interview;
		console.log(interviews);

		let date, jobID;
		let todayDate = new Date();

		for (let i = 0; i < interviews.length; i++) {
			date = new Date(interviews[i].date);
			/*console.log(i + '- ' + date.toLocaleDateString([], {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}), 'at', date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
			 */

			if (date < todayDate) {
				let res = await authService.deleteInterview(user._id, interviews[i].job, user.token);
				//console.log(res);
			}
		}

		interviewsPack = interviews;

		/*interviewsPack = interviews.map(function(interview) {
			return {
				jobID: interview.jobID,
				title: interview.title,
				companyName: interview.companyName,
				interviewDate: interview.interviewDate
			};
		});
*/
		console.log(interviewsPack)
		/*
		for (let i = 0; i < interviews.length; i++) {
			jobID = interviews[i].jobID;
			//console.log(jobID);
		}

		/*const jobs = await jobService.getJobs(user.token);
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
		}*/
	}

	async function consoleInterviewsPack() {
		console.log('interviewsPack: ' + interviewsPack);
	}

</script>

<div class='student-dashboard' on:load={consoleInterviewsPack}>
	<h1>Upcoming Interviews</h1>

	{#if interviews}
		<div class='interviews'>
			{#each interviews as interview}
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

    .student-dashboard {
        margin: 2%;
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

