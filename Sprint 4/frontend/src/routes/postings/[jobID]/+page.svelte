<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<script>
    import authService from '$lib/features/authService.js';
    import jobService from '$lib/features/jobService.js';
    import fileService from '$lib/features/fileService';
    import {autoresize} from 'svelte-textarea-autoresize';
    import {preventTabClose} from '$lib/features/preventTabClose.js'
    import {page} from '$app/stores';
    import {onMount} from 'svelte';
    import {goto} from '$app/navigation';
    import LoadingAnimation from "$lib/components/LoadingAnimation.svelte";

    const jobID = $page.url.pathname.split('/').pop();
    let data, user, creatorInfo;
    let isNew = jobID === 'new';
    let canEdit = isNew;
    let descriptionText = '', actionButtonText = '';
    let descriptionElement;
    let isActive = true;
    let hasChanged = false;
    let pageTitle = "Job Posting";

    onMount(async () => {
            user = authService.getUser();
            if (user == null) {
                await goto('/');
                return;
            }

            if (jobID === 'new' && user.role !== 'Employer') { // Only employers can create new jobs
                alert('No job has an ID #' + jobID + '.');
                await goto('/postings');
                return;
            }

            if (isNew) { // Don't have to fetch job data
                data = 'Create new job';
                actionButtonText = 'Publish';
                pageTitle = "Create new job";
                return;
            }

            data = (await jobService.getJobByID(jobID, user.token))[0];

            if (data == null) {
                alert('No job has an ID #' + jobID + '.');
                await goto('/postings');
                return;
            }

            if (data.user === user._id) canEdit = true;
            isActive = data.isActive;
            pageTitle = data.title + " (#" + jobID + ")";

            if (!isNew) descriptionText = data.description;

            if (user.role === 'Student')
                if (data.applicants != null && data.applicants.includes(user._id))
                    actionButtonText = 'Applied';
                else if (isActive)
                    actionButtonText = 'Apply';
                else
                    actionButtonText = 'Deactivated';
            else if (user.role === 'Admin' || user.role === 'Employer')
                actionButtonText = data.isActive ? 'Deactivate' : 'Activate';

            const creator = await authService.getUserByID(data.user, user.token);
            let creatorName, creatorProfilePic;
            if (!creator) {
                const ans = confirm('The employer\'s account who created this job posting doesn\'t exist anymore. ' +
                    'Click Ok to view the job posting or Cancel to redirect to the postings page.\n' +
                    'Our apologies for the inconvenience.');
                if (ans) {
                    creatorName = 'DELETED USER';
                    if (user.role === 'Student') user.role = 'Employer'; //So the apply button doesn't appear
                } else {
                    await goto('/postings');
                    return;
                }
            } else {
                creatorName = creator.name;
                creatorProfilePic = await fileService.getProfilePictureURL(creator._id);
            }

            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            };
            const createdDate = new Date(data.createdAt).toLocaleDateString('en-US', options);
            const updatedDate = new Date(data.updatedAt).toLocaleDateString('en-US', options);
            creatorInfo = {
                creatorName: creatorName,
                creationDate: createdDate,
                updateDate: updatedDate,
                creatorImage: creatorProfilePic,
            };
        }
    );

    async function actionClicked() {
        if (actionButtonText === 'Apply') await apply();
        else if (actionButtonText === 'Publish') await createJob();
        else if (actionButtonText === 'Deactivate' || actionButtonText === 'Activate') await toggleIsActiveJob();
    }

    async function createJob() {
        const jobData = getFieldData();
        if (!jobData) return;

        const response = await jobService.createJob(jobData, user.token);
        if (!response) {
            alert('Failed to create job.');
        } else {
            await goto('/postings');
        }
    }

    async function apply() {
        let response = await jobService.applyToJob(jobID, user._id, user.token);
        if (!response) {
            alert('Failed to apply');
        } else {
            actionButtonText = 'Applied';
        }
    }

    async function toggleIsActiveJob() {
        let response = await jobService.updateJob(jobID, {isActive: !data.isActive}, user.token);
        if (!response) {
            alert('Failed to ' + (data.isActive ? 'deactivate' : 'activate') + ' job');
        } else {
            data.isActive = !data.isActive;
            isActive = !isActive;
            actionButtonText = data.isActive ? 'Deactivate' : 'Activate';
        }
    }

    async function saveEditedJob() {
        if (!hasChanged) {
            alert("Nothing to save.");
            return;
        }
        const ans = confirm('Are you sure you want to edit the job posting? All the applicants will be discarded.\nClick Ok to proceed.');
        if (!ans) return; // clicked cancel

        hasChanged = false;
        const jobData = getFieldData();
        if (!jobData) return;
        jobData.applicants = '[]';

        let response = await jobService.updateJob(jobID, jobData, user.token);
        if (!response)
            alert('Failed to edit job.');
        else
            location.reload();
    }

    function getFieldData() {
        let title = document.getElementById('title').value;
        let companyName = document.getElementById('companyName').value;
        let location = document.getElementById('location').value;
        let description = document.getElementById('description').value;
        let alertText = '';
        if (!title.trim()) alertText += 'Missing title!\n';
        if (!companyName.trim()) alertText += 'Missing company name!\n';
        if (!location.trim()) alertText += 'Missing location!\n';
        if (!description.trim()) alertText += 'Missing description!\n';
        if (alertText) {
            alert(alertText);
            return null;
        } else return {
            title, companyName, location, description
        };
    }

    function gotoApplicants() {
        goto('/postings/applicants/' + jobID);
    }

    function changedText() {
        hasChanged = true;
        if (!isNew) pageTitle = '* ' + data.title;
    }
</script>
{#if (!data && isNew) || (!creatorInfo && !isNew)}
    <LoadingAnimation/>
{:else if (data && isNew) || (creatorInfo && !isNew)}
    <div class='topSection' use:preventTabClose={hasChanged}>
        {#if canEdit}
            <input class='title canEdit' type='text' id='title'
                   value="{isNew?'':data.title}" placeholder='Title' on:keydown={changedText}/>
            {#if !isNew}
                <span class='id'>#{data.jobID}</span>
            {/if}
            <input class='companyName canEdit' type='text' id='companyName'
                   value="{isNew?'':data.companyName}" placeholder='Company name' on:keydown={changedText}/>
            <input class='location canEdit' type='text' id='location'
                   value="{isNew?'':data.location}" placeholder='Location' on:keydown={changedText}/>
        {:else}

            <div class="title {!isActive ? 'deactivatedText' : ''}">{!isActive ? 'DEACTIVATED - ' : ''}{data.title}</div>
            <div class='id'>#{data.jobID}</div>
            <div class='companyName'>{data.companyName}</div>
            <div class='location'>{data.location}</div>

        {/if}

        {#if user.role === "Employer" && !isNew && canEdit}
            <button class='actionButton applicantsButton' on:click={gotoApplicants}>
                {#if data.applicants != null}
                    <b style='color: white'>{data.applicants.length}
                        applicant{data.applicants.length > 1 ? 's' : ''}</b>
                {:else}
                    <b style='color: white'>0 applicant</b>
                {/if}
            </button>
            <button class='actionButton editButton' on:click={saveEditedJob}>
                <b style='color: white'>Save</b>
            </button>
        {/if}
        {#if user.role !== "Employer" || canEdit}
            <button
                    class="actionButton {(!isNew && (!isActive && user.role === 'Student' || isActive && user.role !== 'Student')) ? 'deactivated' : ''}"
                    on:click={actionClicked}>
                <b style='color: white'>{actionButtonText}</b>
            </button>
        {/if}
    </div>

    <br/>
    <hr style='width:100%;'>
    <br/>

    {#if canEdit}
        <textarea class='description' id='description' placeholder='Description' use:autoresize
                  bind:value={descriptionText} bind:this={descriptionElement} on:keydown={changedText}></textarea>
    {:else}
        <div class='description'>
            <pre>{@html data.description}</pre>
        </div>
    {/if}
    <br/>
    {#if creatorInfo}
        <div class='employerInfo'>
            <span class="employerInfoPosted">Posted by:</span>
            <span class="employerInfoName">{creatorInfo.creatorName}
                <img class="employerInfoPic" src="{creatorInfo.creatorImage}" alt="Employer picture">
            </span>
            <span class="employerInfoCreated">Created:</span>
            <span class="employerInfoCreatedDate">{creatorInfo.creationDate}</span>
            <span class="employerInfoUpdated">Updated:</span>
            <span class="employerInfoUpdatedDate">{creatorInfo.updateDate}</span>
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
        display: grid;
        grid-template-rows: 2fr 1fr 1fr;
        grid-template-columns: 30% 25% 15% 15% 15%;
        grid-template-areas:
    "title title title title id"
    "company company applicants edit actionButton"
    "location location applicants edit actionButton";
        gap: 1em;
        margin-right: 4em;
        justify-items: stretch;
        align-items: stretch;
    }

    .title {
        grid-area: title;
        font-size: 2em;
        font-weight: bold;
    }

    .id {
        align-self: center;
        grid-area: id;
        font-size: 2em;
        font-weight: bold;
    }

    .companyName {
        font-size: 1.5em;
        font-weight: bold;
        grid-area: company;
    }

    .location {
        font-size: 1.15em;
        font-weight: bold;
        grid-area: location;
    }

    .actionButton {
        background: #3A98B9;
        font-size: 1.2em;
        grid-area: actionButton;
        border-radius: 0.5em;
    }

    .applicantsButton {
        background: #3A98B9;
        font-size: 1.2em;
        grid-area: applicants;
        border-radius: 0.5em;
    }

    .editButton {
        background: #3A98B9;
        font-size: 1.2em;
        grid-area: edit;
        border-radius: 0.5em;
    }

    .deactivated {
        background: darkred;
    }

    .deactivatedText {
        color: darkred;
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

    .actionButton {
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

    .employerInfo {
        width: 50%;
        display: grid;
        grid-template-rows: 4fr 1fr 1fr;
        grid-template-columns: 1fr 5fr;
        grid-column-gap: 2em;
        grid-row-gap: 1em;
        grid-template-areas:
    "posted name"
    "created dateC"
    "updated dateU";
    }

    .employerInfoPosted {
        grid-area: posted;
        font-size: 1.3em;
        text-decoration: underline;
        justify-self: end;
        max-width: 100px;
        align-self: center;
    }

    .employerInfoCreated {
        grid-area: created;
        font-size: 1em;
        text-decoration: underline;
        justify-self: end;
        max-width: 100px;
    }

    .employerInfoUpdated {
        grid-area: updated;
        font-size: 1em;
        text-decoration: underline;
        justify-self: end;
        max-width: 100px;
    }

    .employerInfoName {
        grid-area: name;
        font-size: 1.3em;
        display: flex;
        align-items: center;
        gap: 1em;
        max-width: 1000px;
    }

    .employerInfoPic {
        border-radius: 1em;
        object-fit: cover;
        width: 100px;
        height: 100px;
    }

    .employerInfoCreatedDate {
        grid-area: dateC;
        max-width: 1000px;
    }

    .employerInfoUpdatedDate {
        grid-area: dateU;
        max-width: 1000px;
    }
</style>