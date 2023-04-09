<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<script>
    import authService from '$lib/features/authService.js';
    import jobService from '$lib/features/jobService.js';
    import {page} from '$app/stores';
    import {onMount} from 'svelte';
    import {goto} from '$app/navigation';
    import Applicant from '$lib/components/Applicant.svelte';
    import {preventTabClose} from '$lib/features/preventTabClose.js'
    import {quintOut} from 'svelte/easing';
    import {crossfade} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import LoadingAnimation from "$lib/components/LoadingAnimation.svelte";
    import fileService from "$lib/features/fileService.js";

    const [send, receive] = crossfade({
        fallback(node) {
            if (!$page.url.pathname.includes('applicants')) return;
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

    const jobID = $page.url.pathname.split('/').pop();
    let data, user;
    let applicants = [], accepted = [], rejected = [], interviewDates = [];
    let canLoad = false;
    let hasChanges = false;
    let pageTitle = "Applicants";
    let searchTerm = "";

    onMount(async () => {
        user = authService.getUser();
        if (user == null || user.role !== 'Employer') {
            await goto('/');
            return;
        }

        data = (await jobService.getJobByID(jobID, user.token))[0];

        if (data == null) {
            alert('No job has an ID #' + jobID + '.');
            await goto('/postings');
        }

        if (user._id !== data.user) { //not the employer who created the job
            await goto('/');
            return;
        }

        pageTitle = "Applicants - " + data.title;

        if (data.applicants) {
            let counter = data.applicants.length + 3;
            for (let appID of data.applicants) {
                let applicant = await authService.getUserByID(appID, user.token);
                let appProfilePic = await fileService.getProfilePictureURL(appID);
                let appResume = await fileService.getResumeURL(appID);
                if (applicant) applicants.push({
                    name: applicant.name,
                    email: applicant.email,
                    id: applicant._id,
                    profilePicURL: appProfilePic,
                    resumeURL: appResume,
                    zIndexSchedule: counter--,
                });
            }

            if (data.applicants.length !== applicants.length) { // some applicant ids belong to deleted accounts, so remove them from the database
                if (applicants.length === 0)
                    await jobService.updateJob(jobID, {applicants: '[]'}, user.token);
                else {
                    await jobService.updateJob(jobID, {applicants: applicants.map((applicant) => applicant.id).toString()}, user.token);
                }
                console.log('Removed ids belonging to deleted accounts.');
            }
        }

        canLoad = true;
    });

    function toggleSelected(event) {
        let id = event.detail.id;
        let isAccepted = event.detail.isAccepted;
        if (isAccepted === 'accepted') {
            accepted.push(id);
            const index = rejected.indexOf(id);
            if (index > -1) // found in rejected array
                rejected.splice(index, 1); // remove one item only
        } else if (isAccepted === 'rejected') {
            rejected.push(id);
            const index = accepted.indexOf(id);
            if (index > -1) // found in accepted array
                accepted.splice(index, 1); // remove one item only
        }
        hasChanges = accepted.length !== 0 || rejected.length !== 0;
    }

    function clearSelected(event) {
        let id = event.detail;
        let index = accepted.indexOf(id);
        if (index > -1) { // found in accepted array
            accepted.splice(index, 1); // remove one item only
        } else {
            index = rejected.indexOf(id);
            if (index > -1) { // found in rejected array
                rejected.splice(index, 1); // remove one item only
            }
        }
        hasChanges = accepted.length !== 0 || rejected.length !== 0;
    }

    function addDate(event) {
        let id = event.detail.id;
        const idArray = interviewDates.map((interview) => interview.id);
        if (!idArray.includes(id))
            interviewDates.push(event.detail);
        else {
            const index = idArray.indexOf(id);
            interviewDates.splice(index, 1, event.detail);
        }
    }

    async function submit() {
        if (applicants.length === 0) return;

        if (accepted.length === 0 && rejected.length === 0) {
            alert('Please make a decision for at least one applicant.');
            return;
        }

        const idArray = interviewDates.map((interview) => interview.id);
        for (let i = 0; i < accepted.length; i++) {
            if (!idArray.includes(accepted[i])) {
                let applicant = await authService.getUserByID(accepted[i], user.token);
                if (applicant == null)
                    alert('Warning! An applicant\'s account has been deleted. Please refresh the page to update the applicant list.');
                else
                    alert('Please choose an interview date and time for ' + applicant.name + '.');
                return;
            }
        }

        // Handle all accepted applicants
        while (accepted.length > 0) {
            let date, acceptedID = accepted.pop();

            for (let interviewDate of interviewDates) {
                if (interviewDate.id === acceptedID) {
                    date = interviewDate.date;
                    break;
                }
            }
            let response = await authService.addInterview(acceptedID, jobID, date, user.token); // add student's interview
            await handleAddInterviewResponse(response, acceptedID, date);
            response = await authService.addInterview(user._id, jobID, date, user.token); // add employer's interview
            await handleAddInterviewResponse(response, user._id, date);
        }

        // Handle all rejected applicants
        while (rejected.length > 0) {
            let rejectedID = rejected.pop();
            let applicantsClone = applicants;
            for (let index = 0; index < applicantsClone.length; index++) {
                if (applicantsClone[index].id === rejectedID) {
                    applicantsClone.splice(index, 1);
                    applicants = applicantsClone;
                    break;
                }
            }
        }

        // Update the applicants array in the database
        if (applicants.length === 0)
            await jobService.updateJob(jobID, {applicants: '[]'}, user.token);
        else {
            await jobService.updateJob(jobID, {applicants: applicants.map((applicant) => applicant.id).toString()}, user.token);
        }

        hasChanges = false;
    }

    async function handleAddInterviewResponse(response, interviewUserID, date) {
        if (response.data) { // interview was added successfully
            let applicantsClone = applicants;
            for (let index = 0; index < applicantsClone.length; index++) {
                if (applicantsClone[index].id === interviewUserID) {
                    applicantsClone.splice(index, 1);
                    applicants = applicantsClone;
                    break;
                }
            }
        } else if (!response.error) { // what happened? No error and no data?
            if (interviewUserID !== user._id) //we're adding the student's interview
                accepted.push(interviewUserID); // add it back
            alert('Unknown error when adding the interview. Please contact an admin if this persists.');
        } else { // an error occurred
            if (interviewUserID !== user._id) //we're adding the student's interview
                accepted.push(interviewUserID); // add it back

            if (response.error === 409) { // time conflict
                if (interviewUserID === user._id) //we're adding the employer's interview
                    alert('You already has an interview scheduled at ' + date.toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
                    }) + '. Please choose another date.');
                else {
                    let applicant = await authService.getUserByID(interviewUserID, user.token);
                    if (applicant == null)
                        alert('Warning! An applicant\'s account has been deleted. Please refresh the page to update the applicant list.');
                    else
                        alert('Unfortunately, ' + applicant.name + ' already has an interview scheduled at ' + date.toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
                        }) + '. Please choose another date.');
                }
            } else {
                alert('Error ' + response.error + ' when adding the interview. Please try again or contact an admin if this error persists.');
            }
        }
    }

    function updateSearchTerm(e) {
        searchTerm = e.target.value;
    }
</script>


{#if !canLoad}
    <LoadingAnimation/>
{:else}
    <div class='page' use:preventTabClose={hasChanges}>
        <div class='topSection'>
            <div class='title'>{data.title} (#{data.jobID})
                {#if !data.isActive}<span class='deactivatedText'>&nbsp;(deactivated)</span>{/if}
            </div>
            <div class='companyName'>{data.companyName}</div>
            <div class='numApplicants'>{applicants.length} applicant{applicants.length > 1 ? 's' : ''}</div>
            <input type='search' class='search' placeholder='Search...' on:input={updateSearchTerm}>
        </div>

        <div class='applicants'>
            {#each applicants.filter((v) => {
                return v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.email.toLowerCase().includes(searchTerm.toLowerCase())
            }) as app, index(app.id)}
                <div in:receive="{{key: app.id}}"
                     out:send="{{key: app.id}}"
                     animate:flip="{{duration: 400}}">
                    <Applicant {...app} on:toggle={toggleSelected} on:clear={clearSelected}
                               on:dateChanged={addDate}/>
                </div>
            {/each}
        </div>

        <button class='submit' on:click={submit}>Submit</button>
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
    "title title applicants . search"
    "company company applicants . search";
        gap: 0.5em;
        justify-items: stretch;
        align-items: stretch;
        margin-top: 1em;
        margin-bottom: 3em;
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

    .deactivatedText {
        color: darkred;
    }

    .applicants {
        display: grid;
        justify-items: stretch;
        grid-gap: 2em;
        margin-bottom: 4em;
    }

    .submit {
        position: fixed;
        bottom: 2em;
        color: black;
        background: #3A98B9;
        border-radius: 0.5em;
        padding: 0.5em;
        font-size: 1.5em;
        left: 35%;
        width: 30%;
    }

    .submit{
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

    .submit::before{
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

    .submit:hover::before {
        transform: translateX(0);
    }

    .search {
        width: 180px;
        height: 50%;
        padding: 10px 0 10px 40px;
        border-radius: 9999px;
        border: solid 1px #333;
        transition: all .2s ease-in-out;
        outline: none;
        opacity: 0.8;
        color: #3A98B9;
        font-weight: bold;
        justify-self: right;
        grid-area: search;
    }

    .search:focus {
        opacity: 1;
        width: 250px;
    }

</style>