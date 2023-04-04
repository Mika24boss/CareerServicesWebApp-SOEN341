<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<script>
	import Interview from '$lib/components/Interview.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import authService from '$lib/features/authService.js';
	import jobService from '$lib/features/jobService.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let interviewsPack = [];
	let user, interviews;

	onMount(() => {
		user = authService.getUser();
		loadAllInterviews();
	});

	async function loadAllInterviews() {
		if (user == null) {
			await goto('/');
		}

		let date;
		let todayDate = new Date();
		let employer = await authService.getUserByID(user._id, user.token);
		interviews = employer.interview;

		for (let i = 0; i < interviews.length; i++) {
			date = new Date(interviews[i].date);

			if (date < todayDate) {
				let res = await authService.deleteInterview(user._id, interviews[i].job, user.token);
				//console.log(res);
			}

			const job = await jobService.getJobByID(interviews[i].job, user.token);

			interviewsPack.push({
				jobID: job[0].jobID,
				title: job[0].title,
				companyName: job[0].companyName,
				interviewDate: date
			});

			interviewsPack = interviewsPack;
		}
	}

	// Clear notifications
	function clearNotifications() {
		const notificationList = document.getElementById('notificationList');
		while (notificationList.firstChild) {
			notificationList.removeChild(notificationList.firstChild);
		}
		document.getElementById('notificationBadge').textContent = '0';
	}

</script>

<div class='employer-dashboard'>
	<!-- Notifications Section-->
	<div class='notif-section'>
		<div class='notif'>
			<h1 class='badge' id='notificationBadge'>4</h1>
			<h1 class='label'>Notification(s)</h1>
		</div>

		<div class='notifications' id='notificationList'>
			<Notification />
			<Notification />
			<Notification />
			<Notification />
		</div>
		<button type='button' class='clear-btn' on:click={clearNotifications}>Clear</button>
	</div>


	<!-- Interviews Section -->
	<div class='interviews-section'>
		<h1>Upcoming Interviews</h1>

		{#if interviewsPack.length > 0}
			<div class='interviews'>
				{#each interviewsPack as interview}
					<Interview {...interview} />
				{/each}
			</div>
		{:else}
			<p>No upcoming interviews</p>
		{/if}
	</div>
</div>

<style>
    * {
        font-family: 'Barlow', sans-serif;
    }

    h1, p {
        color: lightgray;
    }

		.employer-dashboard{
        width: 80%;
        margin-left: 10%;
		}

    .notif-section{
        margin-top: 2%;
    }

		.interviews-section{
				margin-top: 10%;
		}

    .interviews, .notifications {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
        grid-gap: 2em;
        justify-items: stretch;
        position: relative;
        left: 2em;
    }

    .notif {
        text-align: left;
        margin-bottom: 1em;
    }

    .badge, .label {
        display: inline;
    }

    .badge {
        border-radius: 50%;
        padding-left: 0.3em;
        padding-right: 0.3em;

        align-items: center;
        text-align: center;
        background: #3A98B9;
        color: white;
    }

    .clear-btn {
        display: block;
        width: 20%;
        border: solid black;
        border-radius: 1em;
        background-color: #3A98B9;
        color: white;
        padding: 14px 28px;
        font-size: 2em;
        cursor: pointer;
        text-align: center;
        margin-top: 1em;
        right: 20px;
        float: right;
    }

    .interviews-section {
        margin-bottom: 2em;
    }

</style>
