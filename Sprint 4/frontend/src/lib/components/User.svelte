<script>
	import Profile from '$lib/images/profile-logo.png';
	import { createEventDispatcher } from 'svelte';
	export let name, email, id, profilePicture, CV; // todo: Add CV
	const dispatch = createEventDispatcher();
	const toggle = () => dispatch('toggle', id);

</script>


<div class='user'>
	<div class='profile'>
		<img src={Profile} alt='profile-logo' /> <!-- to change -->
	</div>
	<div class='user-info'>
		<p>{name}</p>
		<p>{email}</p>
	</div>
	<div class='resume'>
		<button class='btn-resume'>CV</button>
	</div>
	<div class='checkbox'>
		<input type="checkbox" on:change={toggle}/>
	</div>
</div>


<style>

    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    .user {
        display: grid;
        grid-template-columns: 0.5fr 4fr 2fr 2fr;
        justify-items: stretch;
        margin: 0.3em;
				border-radius: 1em;
        background: #141414;
    }

    .profile {
				aspect-ratio: 1;
    }

    img {
        position: relative;
				top: 10%;
				left: 10%;
        width: 80%;
        height: 80%;
        border-radius: 1em;
    }

    .user-info{
        padding: 1.5em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .resume {
        padding: 2em 1em;
        aspect-ratio: 1;
    }

    .btn-resume {
        width: 100%;
        height: 100%;
        font-size: 1em;
        font-weight: bold;
				color: black;
        background: #3A98B9;
        border-radius: 0.5em;
				cursor: pointer;
    }

    input[type=checkbox] {
				position: relative;
        width: 40%;
        height: 40%;
				float: right;
				right: 10%;
				top: 35%;
				cursor: pointer;
    }

</style>
