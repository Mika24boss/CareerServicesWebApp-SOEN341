<script>
	import Interview from '$lib/components/Interview.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import authService from '$lib/features/authService.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const okToLoad = auth();
	let user;

	async function auth() {
		await onMount(() => {
			user = authService.getUser();
		});
		if (user == null || user.role !== 'Employer') {
			await goto('/');
		}
		return '';
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


{#await okToLoad}
{:then load}

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
		<div class='interviews'>
			<Interview />
			<Interview />
			<Interview />
			<Interview />
			<Interview />
			<Interview />
		</div>
	</div>
{/await}



<style>
    * {
        font-family: 'Barlow', sans-serif;
    }

    h1 {
        color: white;
    }

    .notif-section, .interviews-section{
        margin: 2%;
    }

    .interviews, .notifications {
        display: grid;
        grid-template-columns: 2fr 2fr;
        grid-gap: 1em;
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
