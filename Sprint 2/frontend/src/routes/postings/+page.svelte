<script>
    import Posting from '$lib/components/Posting.svelte';
    import {authService} from '$lib/features/authService.js';
    import {jobService} from '$lib/features/jobService.js';

    const user = authService.getUser();
    const pkgs = loadJobs();

    /*if (user.role === 'Student') {
        alert('Welcome student!');
    } else {
        alert('You\'re logged out :(');
        //throw error(401, 'Please log in.');
    }*/

    async function loadJobs() {
        const jobs = await jobService.getJobs(user.token);
        return jobs.map(function (job) {
            return {
                title: job.title,
                companyName: job.companyName,
                location: job.location,
                jobID: job.jobID
            }
        });
    }
</script>

<div class="pageHeader">
    <h1>Job Postings</h1>
    <input type="search" class="search" placeholder="Type job or company name...">
</div>

<div class="postings">
    {#await pkgs}
    {:then pkgs}
        {#each pkgs as pkg}
            <Posting {...pkg}/>
        {/each}
    {/await}
</div>


<style>

    * {
        font-family: 'Barlow', sans-serif;
    }

    h1 {
        color: white;
    }

    .postings {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
        grid-gap: 2em;
        justify-items: stretch;
        max-width: 80%;
        margin: 0 auto;
    }

    .pageHeader {
        margin-left: 10%;
        max-width: 80%;
        margin-bottom: 2em;
        display: flex;
        justify-content: space-between;
    }

    .search {
        margin: auto 0;
        font-size: 1em;
        height: 40px;
        width: 250px;
    }
</style>