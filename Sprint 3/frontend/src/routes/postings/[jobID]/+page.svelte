<script>
    import {error} from '@sveltejs/kit';
    import {authService} from '$lib/features/authService.js';
    import {jobService} from '$lib/features/jobService.js';
    import {page} from '$app/stores';
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    const jobID = $page.url.pathname.split('/').pop();
    let data, user, creatorInfo;
    let isNew = jobID === "new";
    let canEdit = isNew;
    let descriptionText = "";

    onMount(async () => {
            user = authService.getUser();
            if (user == null) {
                await goto('/');
                return;
            }
            if (jobID !== "new") {
                data = (await jobService.getJobByID(jobID, user.token))[0];

                if (data == null) {
                    alert("No job has an ID #" + jobID + ".");
                    await goto('/postings');
                    return;
                }

                const creatorName = (await authService.getUserByID(data.user, user.token)).name;
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                };
                const createdDate = new Date(data.createdAt).toLocaleDateString('en-US', options);
                const updatedDate = new Date(data.updatedAt).toLocaleDateString('en-US', options);
                creatorInfo = {
                    creatorName: creatorName,
                    creationDate: createdDate,
                    updateDate: updatedDate,
                }
                //console.log(creatorInfo.creatorName, creatorInfo.creationDate,creatorInfo.updateDate)

                if (data.user === user._id) canEdit = true;
                if (!isNew) descriptionText = data.description;

            } else {
                data = "Create new job";
            }
            //throw error(404, 'Not found');
        }
    )

    async function createJob() {
        const jobData = {
            title: document.getElementById('title').value,
            companyName: document.getElementById('companyName').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value
        }
        const response = await jobService.createJob(jobData, user.token);
        console.log(response);
    }

    function expandTextArea() {
        const textarea = document.getElementById('description');

        textarea.addEventListener('keydown', () => {
            setTimeout(() => {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }, 0);
        });
    }
</script>

{#if data}
    <div class="topSection">
        <div class="topInfo">
            {#if canEdit}
                <input class="title canEdit" type="text" id="title"
                       value="{isNew?'':data.title}" placeholder="Title"/><span class="title">&nbsp;(#{data.jobID}
                )</span><br/>
                <input class="companyName canEdit" type="text" id="companyName"
                       value="{isNew?'':data.companyName}" placeholder="Company name"/><br/>
                <input class="location canEdit" type="text" id="location"
                       value="{isNew?'':data.location}" placeholder="Location"/>
            {:else}
                <div class="title">{data.title} (#{data.jobID})</div>
                <div class="companyName">{data.companyName}</div>
                <div class="location">{data.location}</div>
            {/if}
        </div>
        <button class="apply">
            <b style='color: black'>Apply</b>
        </button>
    </div>

    <br/>
    <hr style="width:100%;">
    <br/>

    {#if canEdit}
        <textarea class="description" id="description" placeholder="Description"
                  bind:value={descriptionText} on:focus={expandTextArea}></textarea>
    {:else}
        <div class="description">
            <pre>{@html data.description}</pre>
        </div>
    {/if}
    <br/>
    {#if creatorInfo}
        <div class="employerInfo">
            Posted by: {creatorInfo.creatorName}<br/>
            Created: {creatorInfo.creationDate}<br/>
            Updated: {creatorInfo.updateDate}
        </div>
    {/if}
{/if}

<style>
    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    .canEdit {
        background: none;
        border-style: ridge;
    }

    .topSection {
        display: flex;
        justify-content: space-between;
    }

    .title {
        font-size: 2em;
        font-weight: bold;
        width: 80vw;
        margin-bottom: 0.5em;
        line-height: 2em;
    }

    .companyName {
        font-size: 1.5em;
        font-weight: bold;
        width: 25vw;
        margin-bottom: 0.5em;
    }

    .location {
        font-size: 1.15em;
        font-weight: bold;
        width: 25vw;
        margin-bottom: 0.5em;
    }

    .description {
        font-size: 1em;
        padding: 1em;
        background: #141414;
        border-radius: 1em;
        min-height: 100px;
    }

    textarea {
        resize: none;
        /*transition: height 1000ms ease 0s;*/
    }

    pre {
        white-space: pre-wrap;
    }

    .apply {
        width: 8em;
        height: 4em;
        background: #3A98B9;
        font-size: 1.1em;
        margin-top: 1.5em;
        border-radius: 0.5em;
    }
</style>