<script>
	//import Profile from '$lib/images/profile-logo.png';
	import { createEventDispatcher } from 'svelte';
	export let name, email, id, role, profilePicture, CV; // todo: Add CV
	const dispatch = createEventDispatcher();
	const toggle = () => dispatch('toggle', id);

</script>


<div class='user'>
	<div class='profile'>
		<img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/544px-Valorant_logo_-_pink_color_version.svg.png?20200516191842"} alt='profile-logo' /> <!-- to change -->

	</div>
	<div class='user-info'>
		<b style='color:#3A98B9;'>{role}</b>
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
				--line-height: 4em;
    }

    .profile {
				aspect-ratio: 1;
    }

    img {
        position: relative;
				top: 16%;
				left: 16%;
        width: 70%;
        height: 70%;
        border-radius: 1em;
				align-self: center;
    }

    .user-info{
        padding: 1em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
				align-self: center;
				height: var(--line-height);
				line-height: 10px;
    }

    .resume {
				height: 2em;
        padding: 2em 1em;
        aspect-ratio: 1;
    }

    .btn-resume {
				position: relative;
				bottom: 0.8em;
        width: 100%;
        height: 180%;
        font-size: 1em;
        font-weight: bold;
				color: black;
        background: #3A98B9;
        border-radius: 0.5em;
				cursor: pointer;
				align-self: center;
    }

    input[type=checkbox] {
				position: relative;
        width: 30%;
        height: 30%;
				float: right;
				right: 10%;
				top: 35%;
				cursor: pointer;
    }

</style>
