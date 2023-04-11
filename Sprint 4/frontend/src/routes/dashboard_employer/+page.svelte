<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<script>
    import Interview from '$lib/components/Interview.svelte';
    import Notification from '$lib/components/Notification.svelte';
    import authService from '$lib/features/authService.js';
    import jobService from '$lib/features/jobService.js';
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';
    import LoadingAnimation from '$lib/components/LoadingAnimation.svelte';

    let interviewsPack = [];
    let notificationsPack = [];
    let myApps = [];
    let user, interviews, allJobs, student;
    let finishedLoading = false;

    onMount(() => {
        user = authService.getUser();
        loadAllNotifications();
        loadAllInterviews();
    });

    async function loadAllInterviews() {
        if (user == null) {
            await goto('/');
        }

        let date;
        let todayDate = new Date();
        let employer = await authService.getUserByID(user._id, user.token);
        interviews = employer.interview;

        for (let i = 0; i < interviews.length; i++) {
            date = new Date(interviews[i].date);

            if (date < todayDate) {
                let res = await authService.deleteInterview(user._id, interviews[i].job, user.token);
                //console.log(res);
            }

            const job = await jobService.getJobByID(interviews[i].job, user.token);

            interviewsPack.push({
                jobID: job[0].jobID,
                title: job[0].title,
                companyName: job[0].companyName,
                interviewDate: date
            });

            interviewsPack = interviewsPack;
        }
        finishedLoading = true;
    }

    async function loadAllNotifications() {
        if (user == null) {
            await goto('/');
        }

        allJobs = await jobService.getJobs(user.token);
        //console.log(allJobs);

        for (let i = 0; i < allJobs.length; i++) {
            if (allJobs[i].user === user._id) {
                //console.log('job ' + i + ': ');
                myApps = [];
                myApps = allJobs[i].applicants;
                //console.log('currentView: ' + allJobs[i].currentView);
                //console.log('length: ' + allJobs[i].applicants.length);
                //console.log(allJobs[i].applicants);

                for (let j = allJobs[i].currentView; j < myApps.length; j++) {
                    console.log(j + ' app: ' + myApps[j]);
                    student = await authService.getUserByID(myApps[j], user.token);

                    notificationsPack.push({
                        jobID: allJobs[j].jobID,
                        title: allJobs[j].title,
                        companyName: allJobs[j].companyName,
                        name: student.name
                    });
                    notificationsPack = notificationsPack;
                }
                await jobService.updateJob(allJobs[i].jobID, {currentView: allJobs[i].applicants.length}, user.token);
            }
        }
    }

</script>

<div class='employer-dashboard'>
    {#if !finishedLoading}
        <LoadingAnimation/>
    {:else}

        <!-- Notifications Section-->
        <div class='notification-section'>
            <div class='notif'>
                <h1 class='badge' id='notificationBadge'>{notificationsPack.length}</h1>
                <h1 class='label'>Notification(s)</h1>
            </div>
            {#if notificationsPack.length > 0}
                <div class='notifications' id='notificationList'>
                    {#each notificationsPack as notification}
                        <Notification {...notification}/>
                    {/each}
                </div>
            {:else}
                <p>No new applicants since your last login</p>
            {/if}
        </div>


        <!-- Interviews Section -->
        <div class='interviews-section'>
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
    {/if}
</div>

<style>
    * {
        font-family: 'Barlow', sans-serif;
    }

    h1, p {
        color: lightgray;
    }

    .employer-dashboard {
        width: 80%;
        margin-left: 10%;
    }

    .notification-section {
        margin-top: 2%;
    }

    .interviews-section {
        margin-top: 10%;
    }

    .interviews, .notifications {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
        grid-gap: 2em;
        justify-items: stretch;
        position: relative;
        margin-left: 2em;
    }

    .notif {
        text-align: left;
        margin-bottom: 1em;
    }

    .badge, .label {
        display: inline;
    }

    .badge {
        border-radius: 50%;
        padding-left: 0.3em;
        padding-right: 0.3em;

        text-align: center;
        background: #3A98B9;
        color: white;
    }

</style>
