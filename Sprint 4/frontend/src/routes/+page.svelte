<script>
    import {authService} from '$lib/features/authService.js';
    import {goto} from "$app/navigation";
    import {hasUpdated} from "../lib/stores/updateUser.js";
    import LoadingAnimation from "$lib/components/LoadingAnimation.svelte";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {env} from "$env/dynamic/public";

    let email, password;
    let response;
    let hasInvalidCredentials = false;
    let isWaiting = false;

    /*onMount(() => {
        if (!$page.url.hostname.includes("localhost") && env.PUBLIC_API_URL.includes("localhost")){
            location.reload();
        }
    })*/

    async function onSubmit() {
        email = document.getElementById("email").value;
        password = document.getElementById("password").value;
        const userData = {
            email,
            password
        };
        isWaiting = true;
        response = await authService.login(userData);
        //console.log('Response: ', response);

        hasUpdated.set(true);
        if (!response) {
            setTimeout(() => isWaiting = false, 100);
            hasInvalidCredentials = true;
        } else if (response.role === 'Student') {
            await goto('/dashboard_student');
        } else if (response.role === 'Employer') {
            await goto('/dashboard_employer');
        } else if (response.role === 'Admin') {
            await goto('/admin_users');
        }

    }

</script>

<svelte:head>
    <title>Login</title>
    <meta name="description" content="Career website"/>
</svelte:head>

{#if isWaiting}
    <LoadingAnimation/>
{:else}
    <section>
        <div class="welcome centerBlock">
            <p style="font-size: 30px;">Welcome to AsianQuadPower! </p>
        </div>
        <form class='centerBlock'>
            <div class='formGroup'><input type="text" id="email" placeholder="Email" required style='color:white'></div>
            <div class='formGroup'><input type="password" id="password" placeholder="Password" required
                                          style='color:white'></div>
            <div class='btn-container'>
                <button class="btn-signin centerBlock" type="submit" on:click="{onSubmit}">Sign-In</button>
            </div>

            {#if hasInvalidCredentials}
                <div class='invalidCredentials-box'>
                    <p>Incorrect email or password! Please try again.</p>
                </div>
            {/if}

            <a class="signup centerBlock" href="/signup">Don't have an account? Click here to Sign-Up</a>
        </form>

    </section>
{/if}

<style>
    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    section {
        width: 70%;
        height: auto;
        position: relative;
        text-align: center;
        margin: 5em auto auto;
    }

    .welcome {
        display: block;
        position: relative;
        width: 100%;
    }

    .welcome p {
        margin: 2px;
        font-weight: bold;
        padding-bottom: 1em;
    }

    * a:link, a:visited {
        text-decoration: none;
    }

    * a:hover {
        color: white;
        transition: 0.7s;
    }

    * a:focus {
        color: #3A98B9;
    }

    .signup{
        font-size: 15px;
        color: #3A98B9;
    }

    .centerBlock {
        text-align: center;
        display: block;
        margin: 10px;
    }

    .formGroup input, .formGroup input:focus {
        border: none;
        width: 45%;
        border-bottom: 2px solid #3A98B9;
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: bold;
        background-color: transparent;
    }

    .formGroup input::placeholder {
        color: white;
    }

    .centerBlock input {
        color: black;
        padding: 0.5em;
    }

    .invalidCredentials-box > p {
        width: 40%;
        color: #cc0000;
        font-weight: bold;
        background-color: #EF9A9A;
        text-align: center;
        margin: 1em auto;
        padding: 0.5em;
    }

    .btn-signin {
        display: inline-block;
        padding: 0.9rem 1.8rem;
        font-size: 16px;
        font-weight: 700;
        color: white;
        border: 3px solid #3A98B9;
        cursor: pointer;
        position: relative;
        background-color: transparent;
        text-decoration: none;
        overflow: hidden;
        z-index: 1;
        font-family: inherit;
        border-radius: 1em;
    }

    .btn-signin::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #3A98B9;
        transform: translateX(-100%);
        transition: all .3s;
        z-index: -1;
    }

    .btn-signin:hover::before {
        transform: translateX(0);
    }

</style>
