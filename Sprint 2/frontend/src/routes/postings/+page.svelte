<script>
    import Posting from '$lib/components/Posting.svelte';
    import {userService} from '$lib/userStore';
    import {get} from 'svelte/store';

    console.log(userService.UserState[get(userService.userState)]);

    const pkgs = [
        {
            jobTitle: 'Professional gamer',
            companyName: 'Ubisoft',
            location: 'Montreal but also remote like very far away',
            jobID: "1"
        },
        {
            jobTitle: 'Semiprofessional gamer very god', companyName: 'Ubihard', location: 'Toronto', jobID: "2"
        },
        {
            jobTitle: 'Streamer', companyName: 'Twitch', location: 'Remote', jobID: "3"
        }
    ];

</script>

<div class="pageHeader">
    <h1>Job Postings</h1>
    <input type="search" class="search" placeholder="Type job or company name...">
</div>

<div class="postings">
    {#each pkgs as pkg}
        <Posting {...pkg}/>
    {/each}
</div>



<style>

    *{
        font-family: 'Barlow', sans-serif;
    }

    h1{
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