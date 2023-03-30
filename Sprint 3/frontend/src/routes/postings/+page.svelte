<script>
    import Posting from '$lib/components/Posting.svelte';
    import authService from '$lib/features/authService.js';
    import jobService from '$lib/features/jobService.js';
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {redirect} from "@sveltejs/kit";
    import {browser} from '$app/environment'

    let jobsActive = [], jobsDeactivated = [], jobsOther = [];
    let user;
    let selectedJobs = [];
    let isLoaded = false;

    loadJobs();

    async function loadJobs() {
        if (!browser) return;
        await onMount(() => {
            user = authService.getUser();
        })

        if (user == null) {
            await goto('/');
        } else {
            const jobs = await jobService.getJobs(user.token);
            jobs.forEach((job) => {
                let newJob = {
                    jobID: job.jobID,
                    title: job.title,
                    companyName: job.companyName,
                    location: job.location,
                    applicants: job.applicants,
                    isActive: job.isActive,
                };
                switch (user.role) {
                    case "Student":
                        if (newJob.isActive) jobsOther.push(newJob);
                        break;
                    case "Admin":
                        jobsOther.push(newJob);
                        break;
                    case "Employer":
                        if (newJob.isActive)
                            if (job.user === user._id)
                                jobsActive.push(newJob);
                            else
                                jobsOther.push(newJob);
                        else if (job.user === user._id)
                            jobsDeactivated.push(newJob);
                        break;
                }
                isLoaded = true;
            });

            return jobs.map(function (job) {
                return {
                    jobID: job.jobID,
                    title: job.title,
                    companyName: job.companyName,
                    location: job.location,
                    applicants: job.applicants,
                    isActive: job.isActive,
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
    }

    async function deleteJobs() {
        while (selectedJobs.length > 0) {
            await jobService.deleteJob(selectedJobs.pop(), user.token);
        }
        location.reload();
    }

    function createJob() {
        goto("/postings/new");
    }
</script>

{#if isLoaded && jobsActive.length === 0 && jobsDeactivated.length === 0 && jobsOther.length === 0}
    <h1>No job postings available. Check again soon!</h1>
    {#if user.role === "Employer"}
        <button class="actionButton" on:click={createJob} style="width: 250px;">Create new posting</button>
    {/if}
{:else if isLoaded}
    <div class="postingsPage">

        <div class="pageHeader">
            <h1>Job Postings</h1>
            <input type="search" class="search" placeholder="Type job or company name...">
        </div>

        {#if user.role === "Employer"}
            <button class="actionButton" on:click={createJob}>Create new posting</button>
        {:else if user.role === "Admin"}
            <button class="actionButton" on:click={deleteJobs}>Delete selected</button>
        {/if}

        <br/>

        {#if user.role !== "Employer"}
            <br/>
            <div class="postings">
                {#each jobsOther as job}
                    <Posting {...job} on:toggle={toggleSelected}/>
                {/each}
            </div>
        {:else}
            <div class="separator">Your job postings</div>
            <div class="postings">
                {#each jobsActive as job}
                    <Posting {...job} on:toggle={toggleSelected}/>
                {/each}
            </div>
            <div class="separator">Your deactivated postings</div>
            <div class="postings">
                {#each jobsDeactivated as job}
                    <Posting {...job} on:toggle={toggleSelected}/>
                {/each}
            </div>
            <div class="separator">Other job postings</div>
            <div class="postings">
                {#each jobsOther as job}
                    <Posting {...job} on:toggle={toggleSelected}/>
                {/each}
            </div>
        {/if}

    </div>
{/if}

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
        margin-bottom: 1em;
        display: flex;
        justify-content: space-between;
    }

    .search {
        margin: auto 0;
        font-size: 1em;
        height: 40px;
        width: 250px;
        background: lightgray;
        border-radius: 0.5em;
    }

    .actionButton {
        color: black;
        background: #3A98B9;
        border-radius: 0.5em;
        padding: 0.5em;
    }

    button:hover {
        cursor: pointer;
    }

    .separator {
        display: flex;
        align-items: center;
        text-align: center;
        color: lightgray;
        font-size: 1.5em;
        margin-top: 1em;
        margin-bottom: 1em;
    }

    .separator::before,
    .separator::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid lightgray;
    }

    .separator:not(:empty)::before {
        margin-right: .25em;
    }

    .separator:not(:empty)::after {
        margin-left: .25em;
    }

</style>