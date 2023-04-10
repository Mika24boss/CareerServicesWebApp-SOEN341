<script>
    import jobService from '$lib/features/jobService.js';
    import authService from '$lib/features/authService.js';
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {createEventDispatcher} from 'svelte';

    export var jobID, title, companyName, location, applicants, isActive;

    let nbApps = 0;
    let user, role;
    let buttonText;
    const dispatch = createEventDispatcher();
    const toggle = () => dispatch('toggle', jobID);

    loadJob();

    async function loadJob() {
        await onMount(() => {
            user = authService.getUser();
        })
        role = user.role;
        buttonText = user.role === "Student" ? "Apply" : "View";

        if (user == null) {
            await goto('/');
        }

        if (applicants != null && applicants.includes(user._id))
            appliedUI();
        nbApps = applicants ? applicants.length : 0;
    }

    async function onClick() {
        if (buttonText === "Applied!") return;
        if (user.role === "Employer" || user.role === "Admin") {
            await goto("/postings/" + jobID);
            return;
        }

        let response = await jobService.applyToJob(jobID, user, user.token);

        if (!response) {
            alert("Failed to apply")
        } else {
            appliedUI();
        }
    }

    function appliedUI() {
        buttonText = "Applied!";
        document.getElementById(jobID).style.background = "linear-gradient(to right, #AEE2FF, #86C8BC)";
        document.getElementById(jobID).style.borderRadius = "1em";
        document.getElementById(jobID).style.padding = "0.2em";
        document.getElementById(jobID).style.outline = "none";
    }

</script>
{#await user}
{:then user}
    <div class="outline" id={jobID}>
        <div class="posting {role}">
            <div class="action-button">
                <button on:click={onClick}>
                    {buttonText}
                </button>
            </div>
            <a class="click-me title {!isActive ? 'deactivatedText' : ''}" href="/postings/{jobID}/">
                <b>{title}</b><br/>
                {companyName}
            </a>
            <div class="location {!isActive ? 'deactivatedText' : ''}">
                {location}
            </div>
            {#if role === 'Employer'}
                <div class="nbApps {!isActive ? 'deactivatedText' : ''}">
                    {nbApps} apps.
                </div>
            {:else if role === 'Admin'}
                <div class='checkbox-div'>
                    <input type='checkbox' class='checkbox' on:change={toggle}/>
                    <div class="plus1">
                        <div class="plus2"></div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/await}


<style>

    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    .outline {
        outline: 1px solid gray;
        border-radius: 1em;
    }

    .posting * {
        z-index: 1;
    }

    .posting {
        position: relative;
        background: #141414;
        border-radius: 1em;
        display: grid;
        justify-items: stretch;
        --line-height: 4em;
    }

    .posting:before {
        background: linear-gradient(to right, transparent, rgb(0, 90, 0), rgb(0, 150, 0));
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        border-radius: 1em;
        transition: width 300ms ease;
    }

    .posting:hover:before {
        width: 100%;
        transition-duration: 600ms;
    }

    .posting.Student {
        grid-template-columns: 1fr 2fr 1fr;
    }

    .posting.Employer {
        grid-template-columns: 1fr 1.75fr 0.75fr 0.5fr;
    }

    .posting.Admin {
        grid-template-columns: 1fr 1.75fr 0.75fr 0.5fr;
    }

    .action-button {
        padding: 0.69em;
        font-size: 1.15em;
    }

    .action-button button {
        color: black;
        background: #3A98B9;
        border-radius: 0.5em;
    }

    button {
        width: 100%;
        height: 100%;
        font-size: 1em;
    }

    button:hover {
        cursor: pointer;
    }

    .title:hover *, .title:hover {
        color: rgb(155, 212, 155);
        text-shadow: 6px 6px 6px rgba(0, 0, 0, 0.42);
    }

    .title {
        align-self: center;
        line-height: calc(var(--line-height) / 2);
        padding: 1em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-decoration: none;
        color: inherit;
    }

    .location {
        align-self: center;
        padding: 1em;
        text-align: center;
        line-height: var(--line-height);

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .nbApps {
        justify-self: center;
        align-self: center;
    }

    .deactivatedText *, .deactivatedText {
        color: lightcoral;
    }

    .action-button button {
        display: inline-block;
        padding: 0.9rem 1.8rem;
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

    .action-button button::before {
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

    .action-button button:hover::before {
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
