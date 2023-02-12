<script>
    import Posting from '$lib/components/Posting.svelte';

    let pkgs = [
        {jobTitle: 'Professional gamer', companyName: 'Ubisoft', location: 'Montreal', jobID: "1"},
        {jobTitle: 'Professional gamer', companyName: 'Ubisoft', location: 'Montreal', jobID: "2"},
        {jobTitle: 'Professional gamer', companyName: 'Ubisoft', location: 'Montreal', jobID: "3"}
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
    }


</style>