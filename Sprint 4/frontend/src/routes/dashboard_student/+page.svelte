<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<script>
    import Interview from '$lib/components/Interview.svelte';
    import authService from '$lib/features/authService.js';
    import jobService from '$lib/features/jobService.js';
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';
    import LoadingAnimation from "$lib/components/LoadingAnimation.svelte";

    let interviewsPack = [];
    let user, interviews;
    let finishedLoading = false;

    onMount(() => {
        user = authService.getUser();
        loadAllInterviews();
    });

    async function loadAllInterviews() {
        if (user == null) {
            await goto('/');
        }

        let date;
        let todayDate = new Date();
        let student = await authService.getUserByID(user._id, user.token);
        interviews = student.interview;

        for (let i = 0; i < interviews.length; i++) {
            date = new Date(interviews[i].date);

            if (date < todayDate) {
                let res = await authService.deleteInterview(user._id, interviews[i].job, user.token);
                //console.log(res);
            }

            const job = (await jobService.getJobByID(interviews[i].job, user.token))[0];
            console.log(job)
            if (job == null) {
                await authService.deleteInterview(user._id, interviews[i].job, user.token);
            } else {
                interviewsPack.push({
                    jobID: job.jobID,
                    title: job.title,
                    companyName: job.companyName,
                    interviewDate: date
                });

                interviewsPack = interviewsPack;
            }
        }
        finishedLoading = true;
    }
</script>

{#if !finishedLoading}
    <LoadingAnimation/>
{/if}

<div class='student-dashboard'>
    <h1>Upcoming Interviews</h1>

    {#if interviewsPack.length > 0}
        <div class='interviews'>
            {#each interviewsPack as interview}
                <Interview {...interview}/>
            {/each}
        </div>
    {:else}
        <p>No upcoming interviews</p>
    {/if}
</div>


<style>

    * {
        font-family: 'Barlow', sans-serif;
    }

    h1, p {
        color: lightgray;
    }

    .student-dashboard {
        width: 80%;
        margin-left: 10%;
    }

    .interviews {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
        grid-gap: 2em;
        justify-items: stretch;
    }
</style>

