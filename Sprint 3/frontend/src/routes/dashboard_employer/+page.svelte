<script>
	import Interview from '$lib/components/Interview.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Signout from '$lib/components/Signout.svelte';
	import authService from "$lib/features/authService.js";
	import {goto} from "$app/navigation";

	async function auth() {
		const user = authService.getUser();
		if (user === null || user === undefined || user.role !== "Employer") {
			await goto('/');
		}
	}

	auth();
</script>

<!--<Signout />-->
<!-- Notifications Section-->
<div class="notif-section">
	<div class="notif">
		<h1 class="badge">3</h1>
		<h1 class="label">Notification(s)</h1>
	</div>

	<div class="notifications">
		<Notification />
		<Notification />
		<Notification />
		<Notification />
	</div>

	<button type="button" class="clear-btn">Clear</button>
</div>

<!-- Interviews Section -->
<div class="interviews-section">
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


<style>
    *{
        font-family: 'Barlow', sans-serif;
    }

		h1{
        color: white;
		}

	.interviews, .notifications{
		display: grid;
		grid-template-columns: 2fr 2fr;
		grid-gap: 1em;
		justify-items: stretch;
		position: relative;
		left: 2em;

	}

	.notif{
		text-align: left;
		margin-bottom: 1em;
	}

	.badge, .label{
		display: inline;
	}

	.badge{
		border-radius: 50%;
		padding: 0.4em;

		align-items: center;
		text-align: center;
		background: blue;
		color: white;
	}

	.clear-btn{
		display: block;
		width: 20%;
		border: solid;
		border-color: black;
		background-color: blue;
		color: white;
		padding: 14px 28px;
		font-size: 2em;
		cursor: pointer;
		text-align: center;
		margin-top: 1em;
		position: relative;
		right: 20px;
		float: right;
	}

	.interviews-section{
		margin-bottom: 2em;
	}


</style>


