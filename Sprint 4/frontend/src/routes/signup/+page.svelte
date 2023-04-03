<svelte:head>
    <title>Sign-up</title>
</svelte:head>

<script>
    import authService from '$lib/features/authService.js';
    import {goto} from "$app/navigation";
    import {env} from "$env/dynamic/public";
    import {hasUpdated} from "../../lib/stores/updateUser.js";
    import LoadingAnimation from "$lib/components/LoadingAnimation.svelte";

    const API_URL = env.PUBLIC_API_URL + '/api/users/'

    let name, email, password, role;
    let response;
    let isWaiting = false;

    async function onSubmit() {
        name = document.getElementById('name').value;
        role = role;
        email = document.getElementById("email").value;
        password = document.getElementById("password").value;
        const userData = {
            name,
            email,
            password,
            role
        };
        isWaiting = true;
        response = await authService.register(userData);
        //console.log('Response: ', response);
        if (!response) {
            setTimeout(() => {
                alert("Error when creating your account!")
                isWaiting = false;
            }, 100);
        }
        else if (response.role === 'Student') {
            hasUpdated.set(true);
            await goto('/dashboard_student');
        } else if (response.role === 'Employer') {
            hasUpdated.set(true);
            await goto('/dashboard_employer');
        }
    }

</script>

{#if isWaiting}
    <LoadingAnimation/>
{:else}
    <section>
        <div class="signup-title centerBlock" style="padding-bottom:0">
            <p style="font-size: 30px">Sign-Up as a ... </p>
            {API_URL}
        </div>

        <div class="centerBlock">
            <div class='signup-form'>
                <input type='radio' id='student' name='user-type' value='Student' required bind:group={role}>
                <label for='student'>Student</label>
                <input type='radio' id='employer' name='user-type' value='Employer' required bind:group={role}>
                <label for='employer'>Employer</label>

                <div class='inputs-form centerBlock'>
                    <div class='formGroup'><input type="text" id="name" name="Name" placeholder="Full Name" required
                                                  style='color:white'></div>
                    <div class='formGroup'><input type="text" id="email" name="Email" placeholder="Email" required
                                                  style='color:white'></div>
                    <div class='formGroup'><input type="password" id="password" name="Password" placeholder="Password"
                                                  required style='color:white'></div>
                </div>
                <div class="btn-container">
                    <button class="btn-signup centerBlock" type="submit" on:click="{onSubmit}">Sign-Up</button>
                    <a href="/">
                        <button class="btn-back centerBlock">Back</button>
                    </a>
                </div>
            </div>
        </div>
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
        /*border-radius: 1em;
        background: #141414;
        box-shadow: -10px -10px 15px rgba(0, 0, 0, 0.5), 10px 10px 15px rgba(70, 70, 70, 0.2);*/
    }

    h1 {
        width: 100%;
    }

    .btn-test {
        position: fixed;
        bottom: 5px;
        right: 10px;
        background-color: black;
        border-radius: 1em;
    }

    .signup-title {
        display: block;
        position: relative;
        width: 100%;
    }

    .signup-title p {
        margin: 2px;
        font-weight: bold;
    }

    * a:link, a:visited, a:hover {
        text-decoration: none;
    }

    .centerBlock {
        text-align: center;
        display: block;
        margin: 10px;
        font-size: 20px;
    }

    .formGroup input, .formGroup input:focus {
        border: none;
        width: 45%;
        border-bottom: 2px solid #3A98B9;
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: bold;
        background-color: transparent;
        color: white;
    }

    .formGroup input::placeholder {
        color: white;
    }

    .btn-container {
        justify-content: center;
        display: flex;
        padding-top: 20px;

    }

    .btn-signup, .btn-back {
        border-radius: 1em;
        box-shadow: 0 1px 1px 1px rgba(255, 255, 255, 0.2);
        background: #3A98B9;
        padding: 5px 5px 5px 5px;
        width: 10em;
    }

    .btn-signup:hover, .btn-back:hover, .btn-back a:hover {
        background-color: #3A98B9;
        color: black;
        transition: 0.7s;
    }

    .btn-signup:focus, .btn-back:focus {
        font-weight: bold;
        color: #3A98B9;
    }

    .btn-signup:active, .btn-back:active {
        background-color: white;
    }


</style>