<script>
    import {error} from '@sveltejs/kit';
    import {authService} from '$lib/features/authService.js';
    import {jobService} from '$lib/features/jobService.js';
    import {page} from '$app/stores';
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    const jobID = $page.url.pathname.split('/').pop();
    let data;

    onMount(async () => {
            const user = authService.getUser();
            if (user == null) {
                await goto('/');
                return;
            }
            data = (await jobService.getJobByID(jobID, user.token))[0];

            if (data == null) alert("No job has an ID #" + jobID + ".");
            //throw error(404, 'Not found');
        }
    )
</script>

{#if data}
    <div class="title">
        <div class="topInfo">
            <h1>{data.title} (#{data.jobID})</h1>
            <h2>{data.companyName}</h2>
            <h3>{data.location}</h3>
        </div>
        <button class="apply">
            <b style='color: black'>Apply</b>
        </button>
    </div>

    <div class="desc">
        <pre>{@html data.description}</pre>
    </div>
{/if}


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
        width: 8em;
        height: 4em;
        background: #3A98B9;
        font-size: 1.1em;
        margin-top: 1.5em;
        border-radius: 0.5em;
    }

    .desc {
        width: 85%;
        padding: 1em;
        background: #141414;
        border-radius: 1em;
    }
</style>