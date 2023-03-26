<script>
    import jobService from '$lib/features/jobService.js';
    import authService from '$lib/features/authService.js';
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {createEventDispatcher} from 'svelte';

    export var jobID, title, companyName, location, applicants;

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

        if (applicants.includes(user._id))
            appliedUI();
        nbApps = applicants.length;
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
        document.getElementById(jobID).style.background = "linear-gradient(180deg, #AEE2FF, #86C8BC)";
        document.getElementById(jobID).style.borderRadius = "1em";
    }

</script>
{#await user}
{:then user}
    <div class="gradient" id={jobID}>
        <div class="posting {role}">
            <div class="action-button">
                <button on:click={onClick}>
                    {buttonText}
                </button>
            </div>
            <div class="title">
                <a class="click-me" href="/postings/{jobID}/">
                    <b>{title}</b><br/>
                    {companyName}
                </a>
            </div>
            <div class="location">
                {location}
            </div>
            {#if role === 'Employer'}
                <div class="nbApps">
                    {nbApps} apps.
                </div>
            {:else if role === 'Admin'}
                <input type="checkbox" on:change={toggle}/>
            {/if}
        </div>
    </div>
{/await}

<style>

    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    .posting {
        display: grid;
        justify-items: stretch;
        margin: 0.3em;
        background: #141414;
        border-radius: 1em;

        --line-height: 4em;
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
        padding: 0.5em;
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

    a, b {
        text-decoration: none;
        color: inherit;
    }

    /*.posting:hover .action-button:not(:hover) ~ div span {
        color: #3A98B9;
    }*/
    a:hover {
        color: #3A98B9;
    }

    /*.posting:hover {
        cursor: pointer;
    }*/

    .title {
        line-height: calc(var(--line-height) / 2);
        padding: 1em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .location {
        padding: 1em;
        text-align: center;
        line-height: var(--line-height);

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>
