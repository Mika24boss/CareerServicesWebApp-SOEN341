<script>
    import Posting from '$lib/components/Posting.svelte';
    import authService from '$lib/features/authService.js';
    import jobService from '$lib/features/jobService.js';
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    const pkgs = loadJobs();
    let user;
    let selectedJobs = [];

    async function loadJobs() {
        await onMount(() => {
            user = authService.getUser();
        })

        if (user == null) {
            await goto('/');
        } else {
            const jobs = await jobService.getJobs(user.token);
            return jobs.map(function (job) {
                return {
                    jobID: job.jobID,
                    title: job.title,
                    companyName: job.companyName,
                    location: job.location,
                    applicants: job.applicants,
                }
            });
        }
    }

    function toggleSelected(event) {
        let id = event.detail;
        const index = selectedJobs.indexOf(id);
        if (index > -1) { // only splice array when item is found
            selectedJobs.splice(index, 1); // 2nd parameter means remove one item only
        } else {
            selectedJobs.push(id);
        }
        console.log(selectedJobs);
    }

    async function deleteJobs() {
        let response;
        while (selectedJobs.length > 0) {
            response = await jobService.deleteJob(selectedJobs.pop(), user.token);
            console.log(response);
        }
    }

    function createJob() {
        goto("/postings/new");
        /*const jobData = {
            title: document.getElementById('jobTitle').value,
            companyName: document.getElementById('companyName').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value
        }
        const response = await jobService.createJob(jobData, user.token);
        console.log(response);*/
    }
</script>

{#await pkgs then pkgs}
    <div class="postingsPage">

        <div class="pageHeader">
            <h1>Job Postings</h1>
            <input type="search" class="search" placeholder="Type job or company name...">
        </div>

        {#if user.role === "Employer"}
            <button on:click={createJob}>Create new posting</button>
        {/if}

        <div class="postings">
            {#each pkgs as pkg}
                <Posting {...pkg} on:toggle={toggleSelected}/>
            {/each}
        </div>

        {#if user.role === "Admin"}
            <br/>
            <button on:click={deleteJobs}>Delete selected</button>
        {:else if user.role === "Employer"}
            <div class="jobCreationTesting">
                <h2>For testing purposes</h2>
                <input type="text" class="textBoxTesting" id="jobTitle" placeholder="Job title"><br/>
                <input type="text" class="textBoxTesting" id="companyName" placeholder="Company name"><br/>
                <input type="text" class="textBoxTesting" id="location" placeholder="Location"><br/>
                <textarea class="textBoxTesting" id="description" placeholder="Description"></textarea><br/>
                <button class="createJobButton" on:click="{createJob}">Create job</button>
            </div>
        {/if}
    </div>
{/await}

<style>

    * {
        font-family: 'Barlow', sans-serif;
    }

    .postingsPage {
        width: 80%;
        margin-left: 10%;
    }

    h1, h2 {
        color: lightgray;
    }

    .postings {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
        justify-items: stretch;
        grid-gap: 3em;
    }

    .pageHeader {
        margin-bottom: 2em;
        display: flex;
        justify-content: space-between;
    }

    .search {
        margin: auto 0;
        font-size: 1em;
        height: 40px;
        width: 250px;
        background: lightgray;
    }

    .jobCreationTesting {
        display: grid;
        width: 30%;
        margin-top: 10em;
        bottom: 1em;
        padding: 0 1em 1em;
        outline: darkgray solid 1px;
    }

    .textBoxTesting {
        background: lightgray;
    }

</style>