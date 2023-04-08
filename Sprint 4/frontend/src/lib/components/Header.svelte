<script>
    import {hasUpdated} from "../stores/updateUser.js";
    import {get} from "svelte/store";
    import {authService} from '$lib/features/authService.js';
    import {onMount} from "svelte";

    $: if ($hasUpdated) {
        updateUser();
    }
    let user;
    let isLoggedOut = true;
    let isStudent = false;
    let isEmployer = false;
    let isAdmin = false;
    let canLoad = false;

    onMount(() => {
        updateUser();
    });

    function logoutAndAlert() {
        authService.logout(user, user.token);
        hasUpdated.set(true);
    }

    function updateUser() {
        isLoggedOut = true;
        isStudent = false;
        isEmployer = false;
        isAdmin = false;
        user = authService.getUser();
        if (user) {
            isLoggedOut = false;
            if (user.role === "Student") isStudent = true;
            else if (user.role === "Employer") isEmployer = true;
            else if (user.role === "Admin") isAdmin = true;
            else isLoggedOut = true;
        }
        hasUpdated.set(false);
        canLoad = true;
    }
</script>

<header>
    {#if canLoad}
        <div>
        </div>

        <nav>
            <svg viewBox="0 0 2 3">
                <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"/>
            </svg>
            <ul>
                {#if isLoggedOut}
                    <li>
                        <a href='/'>Login</a>
                    </li>
                {:else}
                    {#if isStudent}
                        <li>
                            <a href='/dashboard_student'>Dashboard</a>
                        </li>
                        <li>
                            <a href="/postings">Postings</a>
                        </li>
                        <li>
                            <a href="/profile">Profile</a>
                        </li>
                    {:else if isEmployer}
                        <li>
                            <a href='/dashboard_employer'>Dashboard</a>
                        </li>
                        <li>
                            <a href="/postings">Postings</a>
                        </li>
                        <li>
                            <a href="/profile">Profile</a>
                        </li>
                    {:else if isAdmin}
                        <li>
                            <a href="/postings">Postings</a>
                        </li>
                        <li>
                            <a href="/admin_users">Users</a>
                        </li>
                    {/if}
                    <li>
                        <a href='/' on:click="{logoutAndAlert}">Logout</a>
                    </li>
                {/if}
            </ul>
            <svg viewBox="0 0 2 3">
                <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"/>
            </svg>
        </nav>
    {/if}
</header>

<style>
    * {
        font-family: 'Barlow', sans-serif;
    }

    header {
        display: flex;
        justify-content: space-between;
        left: 50%;
        right: 50%;
        z-index: 10;
    }

    nav {
        position: fixed;
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
        color: #3A98B9;
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-decoration: none;
        transition: color 0.2s linear;
    }
</style>
