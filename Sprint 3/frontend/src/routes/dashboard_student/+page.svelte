<script>
    import Interview from '$lib/components/Interview.svelte';
    import authService from "$lib/features/authService.js";
    import jobService from "$lib/features/jobService.js";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    let jobsPack = loadAllJobs();
    let user;

    async function loadAllJobs() {
        await onMount(() => {
            user = authService.getUser();
        })

        if (user === null || user === undefined) {
            await goto('/');
        }

        const jobs = await jobService.getJobs(user.token);

        jobsPack = jobs.map(function (job) {
            return {
                jobID: job.jobID,
                title: job.title,
                companyName: job.companyName,
                location: job.location,
                isActive: job.isActive,
                applicants: job.applicants,
            }
        });
        console.log(jobsPack)
    }

    async function loadDashboard(){
      let status, studentID;
      let appsArray;
      console.log('before')
      for(let i=0; i<jobsPack.length; i++){
        console.log('in loop')
        status = jobsPack[i].isActive;
        appsArray = jobsPack[i].applicants
        console.log('status: '+ status)
        console.log('appsArray: '+ appsArray)

        for(let j=0;j<appsArray.length;j++){
          studentID = appsArray[j].id;
        }/*
        if((status === true) && (studentID === user.id)){
          // then display in dashboard
        }*/
      }
    }

</script>

<div class='student-dashboard' on:load={loadDashboard()}>
        <h1>Upcoming Interviews</h1>

        {#await jobsPack}
        {:then jobsPack}

        <div class='interviews'>
            {#each jobsPack as interview}
                <Interview {...interview}/>
            {/each}
        </div>

    {/await}
    </div>

<style>

    * {
        font-family: 'Barlow', sans-serif;
    }

    h1 {
        color: white;
    }

    .interviews {
				display: grid;
				grid-template-columns: 2fr 2fr;
				grid-gap: 1em;
				justify-items: stretch;
				position: relative;
				left: 2em;
    }

</style>

