<script>
    import {createEventDispatcher, onMount} from 'svelte';
    import {goto} from '$app/navigation';
    import {authService} from '$lib/features/authService.js';
    import {fileService} from '$lib/features/fileService.js';

    export let name, email, id, role;
    let user;
    let profilePictureURL, resumeURL;
    const dispatch = createEventDispatcher();
    const toggle = () => dispatch('toggle', id);

    async function loadUser() {
        user = authService.getUser();
        if (user == null) {
            await goto('/');
        }
    }

    onMount(async () => {
        await loadUser();
        profilePictureURL = await fileService.getProfilePictureURL(id);
        resumeURL = await fileService.getResumeURL(id);
    });

</script>


<div class='user'>

    <img class='profile'
         src={profilePictureURL}
         alt='profile-logo'/> <!-- to change -->

    <div class='user-info'>
        <b style='color:#3A98B9;'>{role}</b>
        <p>{name}</p>
        <p>{email}</p>
    </div>
    <div class='resume'>
        {#if resumeURL}
            <a href={resumeURL} target="_blank" style="color: #3A98B9;">
                <button class='btn-resume'>CV</button>
            </a>
        {:else}
            <a style="color: #3A98B9;">
                <button class='btn-resume'>No CV</button>
            </a>
        {/if}
    </div>
    <div class='checkbox-div'>
        <input type='checkbox' class='checkbox' on:change={toggle}/>
        <div class="plus1">
            <div class="plus2"></div>
        </div>
    </div>

</div>


<style>

    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    .user {
        display: grid;
        grid-template-columns: 1.5fr 4fr 2fr 2fr;
        justify-items: stretch;
        gap: 0.3em;
        border-radius: 1em;
        background: #141414;
        --line-height: 4em;
        outline: 1px solid gray;
        position: relative;
    }

    .user * {
        z-index: 2;
    }

    .user:before {
        z-index: 1;
        background: linear-gradient(to right, transparent, rgb(87, 41, 24), rgb(255, 127, 80));
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        border-radius: 1em;
        transition: width 300ms ease;
    }

    .user:hover:before {
        width: 100%;
        transition-duration: 600ms;
    }

    .profile {
        margin: 1em 1em 1em 1.5em;
        justify-self: center;
        align-self: center;
        object-fit: cover;
        width: var(--line-height);
        height: var(--line-height);
        border-radius: 1em;
    }

    .user-info {
        padding: 0.5em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        align-self: center;
        height: var(--line-height);
        line-height: 10px;
    }

    .resume {
        padding: 2em 1em;
        display: flex;
        align-items: center;
    }

    .btn-resume {
        width: 100px;
        aspect-ratio: 1.4;
        font-size: 1em;
        font-weight: bold;
        color: black;
        background: #3A98B9;
        border-radius: 0.5em;
        cursor: pointer;
    }

    .btn-resume {
        display: inline-block;
        padding: 0.5em;
        font-size: 16px;
        font-weight: 700;
        color: white;
        border: 3px solid #3A98B9;
        cursor: pointer;
        position: relative;
        background-color: transparent;
        text-decoration: none;
        overflow: hidden;
        z-index: 1;
        font-family: inherit;
        border-radius: 1em;
    }

    .btn-resume::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #3A98B9;
        transform: translateX(-100%);
        transition: all .3s;
        z-index: -1;
    }

    .btn-resume:hover::before {
        transform: translateX(0);
    }

    .checkbox-div {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .checkbox-div input {
        appearance: none;
        width: 2em;
        height: 2em;
        background-color: #171717;
        box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
        border-radius: 5px;
        transition: .4s ease-in-out;
        outline: darkgray solid 1px;
    }

    .checkbox-div input:hover {
        scale: 1.2;
        cursor: pointer;
        box-shadow: none;
    }

    .checkbox-div .plus1 {
        position: relative;
        left: -26.5px;
        width: 1.3em;
        height: 0.2em;
        background-color: #3A98B9;
        rotate: 45deg;
        scale: 0;
        border-radius: 5px;
        transition: .4s ease-in-out;
    }

    .checkbox-div .plus2 {
        position: relative;
        width: 1.3em;
        height: 0.2em;
        background-color: #3A98B9;
        transform: rotate(90deg);
        border-radius: 5px;
        transition: .4s ease-in-out;
    }

    .checkbox-div input:checked {
        box-shadow: none;
    }

    .checkbox-div input:checked + .plus1 {
        transform: rotate(180deg);
        scale: 1;
    }

</style>
