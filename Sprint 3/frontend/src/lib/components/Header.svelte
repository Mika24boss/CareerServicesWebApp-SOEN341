<script>
    import {authService} from '$lib/features/authService.js';
    import {onMount} from "svelte";

    export let user;
    let isLoggedOut = true
    let isStudent = false
    let isEmployer = false
    let isAdmin = false

    function logoutAndAlert() {
        authService.logout()
        console.log("Logged out")
        location.reload()
    }

    onMount(() => {
        if (user) {
            isLoggedOut = false;
            if (user.role === "Student") isStudent = true;
            else if (user.role === "Employer") isEmployer = true;
            else if (user.role === "Admin") isAdmin = true;
        }
    });
</script>

<header>
    {#await user}
    {:then user}
        <div>
        </div>

        <nav>
            <svg viewBox="0 0 2 3">
                <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"/>
            </svg>
            <ul>
                {#if user}
                    <li>
                        <a href='/' on:click="{logoutAndAlert}">Logout</a>
                    </li>
                {:else}
                    <li>
                        <a href='/'>Login</a>
                    </li>
                {/if}
                <li visible={isStudent}>
                    <a href='/dashboard_student'>Dashboard_S</a>
                </li>
                <li visible={isEmployer}>
                    <a href='/dashboard_employer'>Dashboard_E</a>
                </li>
                <li visible={isStudent || isEmployer}>
                    <a href="/profile">Profile</a>
                </li>
                <li>
                    <a href="/postings">Postings</a>
                </li>

            </ul>
            <svg viewBox="0 0 2 3">
                <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"/>
            </svg>
        </nav>
    {/await}
</header>

<style>
    * {
        font-family: 'Barlow', sans-serif;
    }

    header {
        display: flex;
        justify-content: space-between;
    }

    nav {
        display: flex;
        justify-content: center;
        --background: #141414;
        width: 100%;
    }

    svg {
        width: 2em;
        height: 3em;
        display: block;
    }

    path {
        fill: var(--background);
    }

    ul {
        position: relative;
        padding: 0;
        margin: 0;
        height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        background: var(--background);
        background-size: contain;
    }

    li {
        position: relative;
        height: 100%;
    }

    nav a {
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0 0.5rem;
        color: white;
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-decoration: none;
        transition: color 0.2s linear;
    }
</style>
