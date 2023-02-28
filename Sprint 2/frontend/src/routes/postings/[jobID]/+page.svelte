<script>
    import {authService} from '$lib/features/authService.js';
    import {jobService} from '$lib/features/jobService.js';

    export let jobID;
    let jobData;
    const user = authService.getUser();
    //jobData = await jobService.getJobByID(jobID, user.token);

    console.log(jobID)
</script>

{#await jobData}
{:then jobData}
    <div class="title">
        <div class="topInfo">
            <h1>{jobData.jobTitle} (#{jobData.jobID})</h1>
            <h2>{jobData.companyName}</h2>
            <h3>{jobData.location}</h3>
        </div>
        <button class="apply">
            <b style='color: black'>Apply</b>
        </button>
    </div>

    <div class="desc">
        <p>
            {@html jobData.jobDesc}
        </p>
    </div>

{/await}

<style>
    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    h2 {
        line-height: 1em;
    }

    .title {
        display: flex;
        justify-content: space-between;
    }

    .apply {
        width: 10em;
        height: 5em;
        font-size: 1.1em;
        margin-top: 1.5em;
    }

    .desc {
        outline: solid;
        padding: 1em;
    }
</style>