<script>
    import {authService} from '$lib/features/authService.js';
    import {goto} from "$app/navigation";
    import {hasUpdated} from "../lib/stores/updateUser.js";

    let email, password;
    let response;
    let hasInvalidCredentials = false;

    async function onSubmit() {
        email = document.getElementById("email").value;
        password = document.getElementById("password").value;
        const userData = {
            email,
            password
        };
        response = await authService.login(userData);
        console.log('Response: ', response);

        hasUpdated.set(true);
        if (!response) {
            hasInvalidCredentials = true;
            console.log("Invalid credentials")
        } else if (response.role === 'Student') {
            await goto('/dashboard_student');
        } else if (response.role === 'Employer') {
            await goto('/dashboard_employer');
        }
        else if(response.role === 'Admin'){
            await goto('/admin_users');
        }

    }

</script>

<svelte:head>
    <title>AsianQuadPower</title>
    <meta name="description" content="Career website"/>
</svelte:head>

<section>
    <div class="welcome centerBlock">
        <p style="font-size: 30px;">Welcome to AsianQuadPower! </p>
    </div>

    <form class='centerBlock'>
        <div class='formGroup'><input type="text" id="email" placeholder="Email" required style='color:white'></div>
        <div class='formGroup'><input type="password" id="password" placeholder="Password" required style='color:white'></div>
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


<style>
    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    section{
        width: 70%;
        height: auto;
        position: relative;
        text-align: center;
        margin: 5em auto auto;
        /*border-radius: 1em;
        background: rgba(41, 39, 39, 0.2);*/
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

    * a:hover{
        color: white;
        transition: 0.7s;
    }

    * a:focus{
        color: #3A98B9;
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
    }

    .formGroup input::placeholder{
        color: white;
    }

    .btn-signin{
        background-color: #3A98B9;
        color: white;
        width: 25%;
        text-align: center;
        margin: auto;
        padding: 5px 5px;
        border-radius: 1em;
        box-shadow: 0 1px 1px 1px rgba(255, 255, 255, 0.2);
    }

    .btn-signin:hover {
        background-color: #3A98B9;
        color: black;
        transition: 0.7s;
    }

    .btn-signin:focus {
        font-weight: bold;
        color: #3A98B9;
    }

    .btn-signin:active{
        background-color: white;
    }

    .signup {
        margin-top: 5em;
        font-size: 12px;
        color: #3A98B9;
    }

    .centerBlock input{
        color: black;
        padding: 0.5em;
    }

    .invalidCredentials-box > p {
        width: 40%;
        color: black;
        font-weight: bold;
        background-color: #cc0000;
        text-align: center;
        margin: 1em auto;
        padding: 0.5em;
    }
</style>
