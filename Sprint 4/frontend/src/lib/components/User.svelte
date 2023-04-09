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
    <input type='checkbox' class='checkbox' on:change={toggle}/>
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

    .checkbox {
        align-self: center;
        justify-self: center;
        margin: 2.5em;
        background-color: white;
        border-radius: 50%;
        appearance: none;
        -webkit-appearance: none;
        outline: none;
        cursor: pointer;
        aspect-ratio: 1;
        min-height: 20px;
        max-height: 30px;
        min-width: 20px;
        max-width: 30px;
        float: right;
    }

    .checkbox:checked {
        background-color: darkred;
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

</style>
