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
        <p>Email: <input type="text" id="email" required></p>
        <p>Password: <input type="password" id="password" required></p>

        <div class="btn-container">
            <button class="btn-signin centerBlock" type="submit" on:click="{onSubmit}">Sign-In</button>
            <button class="btn-signup centerBlock"><a href="/signup">Sign-Up</a></button>
        </div>
    </form>

</section>


<style>
    *{
        font-family: 'Barlow', sans-serif;
    }

    .welcome {
        display: block;
        position: relative;
        width: 100%;
        padding-top: 30px;
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

    .btn-container {
        justify-content: center;
        display: flex;
        padding-top: 20px;
    }
</style>
