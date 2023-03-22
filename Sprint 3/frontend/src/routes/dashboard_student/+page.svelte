<script>
    import Interview from '$lib/components/Interview.svelte';
    import authService from "$lib/features/authService.js";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    const okToLoad = auth();
    let user;

    async function auth() {
        await onMount(() => {
            user = authService.getUser();
        })
        if (user == null || user.role !== "Student") {
            await goto('/');
        }
        return "";
    }

</script>

{#await okToLoad}
{:then load}
    <h1>Upcoming Interviews</h1>

    <div class='interviews'>
        <Interview/>
        <Interview/>
        <Interview/>
        <Interview/>
        <Interview/>
        <Interview/>
    </div>
{/await}

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

