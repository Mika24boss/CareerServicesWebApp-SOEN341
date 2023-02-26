<script>
    import {authService} from '$lib/features/authService.js';
    import {userService} from '$lib/userStore';
    import {get} from 'svelte/store';

    console.log(userService.UserState[get(userService.userState)]);
    let email, password;
    let response;

    /*
    async function onSubmit() {
        email = document.getElementById("email").value;
        password = document.getElementById("password").value;
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        if (response.ok) {
            const data = await authService.login(response);
            console.log(data);
        } else {
            console.error('Failed to login');
        }
    }*/

    function onSubmit() {
        email = document.getElementById("email").value;
        password = document.getElementById("password").value;
        const userData = {
            email,
            password
        };
        let response = authService.login(userData);
        console.log(response);
        //userID = response.something;
        //userState.set(UserState.Student);
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
        <p>Email: <input type="text" id="email" placeholder="Email" required></p>
        <p>Password: <input type="password" id="password" placeholder="Password" required></p>

        <button class="btn-signin centerBlock" type="submit" on:click="{onSubmit}">Sign-In</button>
        <a class="signup centerBlock" href="/signup">Don't have an account? Sign-Up</a>
    </form>


</section>


<style>
    *{
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    section{
        width: 60%;
        height: auto;
        position: relative;
        text-align: center;
        margin: 5em auto auto;
        border-radius: 1em;
        background: #141414;
        box-shadow: -10px -10px 15px rgba(0, 0, 0, 0.5), 10px 10px 15px rgba(70, 70, 70, 0.2);
    }

    .welcome {
        display: block;
        position: relative;
        width: 100%;
        padding-top: 1em;
    }

    .welcome p {
        margin: 2px;
        font-weight: bold;
    }


    .welcome img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        display: block;
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

    .btn-signin{
        position: relative;
        background-color: black;
        color: white;
        width: 30%;
        text-align: center;
        margin: auto;
        padding: 5px 5px;
        border-radius: 1em;
    }

    .signup{
        padding-top: 2em;
    }

    .centerBlock input{
        border-radius: 1em;
        color: black;
        padding: 0.5em;
    }

</style>
