<script>
    import authService from '$lib/features/authService.js';
    import jobService from '$lib/features/jobService.js';
    import {page} from '$app/stores';
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import Applicant from "$lib/components/Applicant.svelte";

    const jobID = $page.url.pathname.split('/').pop();
    let data, user;
    let applicants = [], accepted = [], rejected = [];
    let canLoad = false;

    onMount(async () => {
        user = authService.getUser();
        if (user == null || user.role !== "Employer") {
            await goto('/');
            return;
        }

        data = (await jobService.getJobByID(jobID, user.token))[0];

        if (data == null) {
            alert("No job has an ID #" + jobID + ".");
            await goto('/postings');
        }

        if (user._id !== data.user) { //not the employer who created the job
            await goto('/');
            return;
        }

        for (let appID of data.applicants) {
            let applicant = await authService.getUserByID(appID, user.token);
            if (applicant) applicants.push(applicant)
        }
        canLoad = true;
    })

    function toggleSelected(event) {
        console.log(event)
        let id = event.detail;
        const index = accepted.indexOf(id);
        if (index > -1) { // only splice array when item is found
            accepted.splice(index, 1); // 2nd parameter means remove one item only
        } else {
            accepted.push(id);
        }
    }

</script>

{#if canLoad}
    <div class="page">
        <div class="topSection">
            <div class="title">{data.title} (#{data.jobID})
                {#if !data.isActive}<span class="deactivatedText">&nbsp;(deactivated)</span>{/if}
            </div>
            <div class="companyName">{data.companyName}</div>
            <div class="numApplicants">{applicants.length} applicant{applicants.length > 1 ? 's' : ''}</div>
            <input type="search" class="search" placeholder="Type a name...">
        </div>

        <div class="applicants">
            {#each applicants as app}
                <Applicant {...app} on:toggle={toggleSelected}/>
            {/each}
        </div>
    </div>
{/if}

<style>
    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    .page {
        width: 80%;
        margin-left: 10%;
    }

    .topSection {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 4fr 0.5fr 4fr 1fr 3.5fr;
        grid-template-areas:
    "title . applicants . search"
    "company . applicants . search";
        gap: 1em;
        justify-items: stretch;
        align-items: stretch;
    }

    .title {
        grid-area: title;
        font-size: 1.5em;
        font-weight: bold;
    }

    .companyName {
        grid-area: company;
        font-size: 1.25em;
        font-weight: bold;
    }

    .numApplicants {
        justify-self: center;
        align-self: center;
        grid-area: applicants;
        font-size: 1.75em;
        font-weight: bold;
    }

    .search {
        justify-self: stretch;
        grid-area: search;
        margin: auto 0;
        font-size: 1em;
        height: 40px;
        width: 100%;
        background: lightgray;
        border-radius: 0.5em;
    }

    .deactivatedText {
        color: darkred;
    }

</style>