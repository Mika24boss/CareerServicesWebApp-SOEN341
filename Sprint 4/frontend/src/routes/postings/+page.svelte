<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<script>
    import Posting from '$lib/components/Posting.svelte';
    import authService from '$lib/features/authService.js';
    import jobService from '$lib/features/jobService.js';
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {browser} from '$app/environment'
    import {quintOut} from 'svelte/easing';
    import {crossfade} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import {page} from "$app/stores";
    import LoadingAnimation from "$lib/components/LoadingAnimation.svelte";

    const [send, receive] = crossfade({
        fallback(node) {
            if ($page.url.pathname !== '/postings') return;
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 400,
                easing: quintOut,
                css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
            };
        }
    });

    let jobsActive = [], jobsDeactivated = [], jobsOther = [];
    let user;
    let selectedJobs = [];
    let isLoaded = false;
    let pageTitle = "Job Postings";
    let searchTerm = "";

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
            let deletedJob = selectedJobs.pop();
            let response = await jobService.deleteJob(deletedJob, user.token);
            if (!response) {
                alert("Failed to delete job #" + deletedJob + ".")
            } else {
                let jobsClone = jobsOther;
                for (let index = 0; index < jobsOther.length; index++) {
                    if (jobsClone[index].jobID === deletedJob) {
                        jobsClone.splice(index, 1);
                        jobsOther = jobsClone;
                        break;
                    }
                }
            }
        }
    }

    function createJob() {
        goto("/postings/new");
    }

    function updateSearchTerm(e) {
        searchTerm = e.target.value;
    }
</script>

{#if !isLoaded}
    <LoadingAnimation/>
{:else if isLoaded && jobsActive.length === 0 && jobsDeactivated.length === 0 && jobsOther.length === 0}
    <h1>No job postings available. Check again soon!</h1>
    {#if user.role === "Employer"}
        <button class="actionButton" on:click={createJob} style="width: 250px;">Create new posting</button>
    {/if}
{:else if isLoaded}
    <div class="postingsPage">

        <div class="pageHeader">
            <h1>Job Postings</h1>
            <input type="search" class="search" placeholder="Search..."
                   on:input={updateSearchTerm}>
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
                {#each jobsOther.filter((v) => {
                    return v.title.toLowerCase().includes(searchTerm.toLowerCase()) || v.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || v.location.toLowerCase().includes(searchTerm.toLowerCase())
                }) as job(job.jobID)}
                    <div in:receive="{{key: job.jobID}}"
                         out:send="{{key: job.jobID}}"
                         animate:flip="{{duration: 400}}">
                        <Posting {...job} on:toggle={toggleSelected}/>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="separator">Your job postings</div>
            <div class="postings">
                {#each jobsActive.filter((v) => {
                    return v.title.toLowerCase().includes(searchTerm.toLowerCase()) || v.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || v.location.toLowerCase().includes(searchTerm.toLowerCase())
                }) as job(job.jobID)}
                    <div in:receive="{{key: job.jobID}}"
                         out:send="{{key: job.jobID}}"
                         animate:flip="{{duration: 400}}">
                        <Posting {...job} on:toggle={toggleSelected}/>
                    </div>
                {/each}
            </div>
            <div class="separator">Your deactivated postings</div>
            <div class="postings">
                {#each jobsDeactivated.filter((v) => {
                    return v.title.toLowerCase().includes(searchTerm.toLowerCase()) || v.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || v.location.toLowerCase().includes(searchTerm.toLowerCase())
                }) as job(job.jobID)}
                    <div in:receive="{{key: job.jobID}}"
                         out:send="{{key: job.jobID}}"
                         animate:flip="{{duration: 400}}">
                        <Posting {...job} on:toggle={toggleSelected}/>
                    </div>
                {/each}
            </div>
            <div class="separator">Other job postings</div>
            <div class="postings">
                {#each jobsOther.filter((v) => {
                    return v.title.toLowerCase().includes(searchTerm.toLowerCase()) || v.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || v.location.toLowerCase().includes(searchTerm.toLowerCase())
                }) as job(job.jobID)}
                    <div in:receive="{{key: job.jobID}}"
                         out:send="{{key: job.jobID}}"
                         animate:flip="{{duration: 400}}">
                        <Posting {...job} on:toggle={toggleSelected}/>
                    </div>
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
        grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
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
        min-height: 50px;
        min-width: 150px;
        font-size: 1em;
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

    .actionButton{
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

    .actionButton::before {
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

    .actionButton:hover::before {
        transform: translateX(0);
    }

</style>