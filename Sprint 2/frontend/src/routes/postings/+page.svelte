<script>
    import Posting from '$lib/components/Posting.svelte';

    let pkgs = [
        {
            jobTitle: 'Professional gamer',
            companyName: 'Ubisoft',
            location: 'Montreal but also remote like very far away',
            jobID: "1",
            jobDesc: "This is an amazing opportunity for an amazing person. Free orange juice every morning! Minimum salary! Premium benefits! Apply now and hear from us in one to two business decades."
        },
        {
            jobTitle: 'Semiprofessional gamer very god', companyName: 'Ubihard', location: 'Toronto', jobID: "2",
            jobDesc: "We're almost pro! Join us on our journey to becoming pro. I mean, you become pro. We guide the best! Almost"
        },
        {
            jobTitle: 'Streamer', companyName: 'Twitch', location: 'Remote', jobID: "3",
            jobDesc: "Do you dream of becoming a successful streamer? Are you motivated, enthusiastic and have great interpersonal skills? Come work for us and we will promote you until we die! Or go to YouTube."
        }
    ];

</script>

<div class="postings">
    {#each pkgs as pkg, i}
        <Posting {...pkg}/>
    {/each}
</div>

<style>

    .postings {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 2em;
        justify-items: stretch;
        max-width: 80%;
        margin: 0 auto;
    }


</style>