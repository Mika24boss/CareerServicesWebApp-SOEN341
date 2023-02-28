<script>
    import {authService} from '$lib/features/authService.js';

    let email, password;
    let response;

    async function onSubmit(){
        email = document.getElementById("email").value;
        password = document.getElementById("password").value;
        console.log({email, password})
        const userData = {
            email,
            password
        };
        response = await authService.login(userData);
        console.log('Response: ', response);
        //await goto(API_URL);
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
        <div class='btn-container'>
            <button class="btn-signin centerBlock" type="submit" on:click="{onSubmit}">Sign-In</button>
        </div>
        <a class="signup centerBlock" href="/signup">Don't have an account? Click here to Sign-Up</a>
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

    * a:link, a:visited {
        text-decoration: none;
    }

    * a:hover{
        color: rgb(148,0,211);
        transition: 0.7s;
    }

    * a:focus{
        color: rgb(48, 213, 200);
    }

    .centerBlock {
        text-align: center;
        display: block;
        margin: 10px;
        font-size: 20px;
    }

    .btn-signin{
        background-color: black;
        color: white;
        width: 30%;
        text-align: center;
        margin: auto;
        padding: 5px 5px;
        border-radius: 1em;
        box-shadow: 0 1px 1px 1px rgba(255,255,255, 0.2);
    }

    .btn-signin:hover {
        background-color: white;
        color: black;
        transition: 0.7s;
    }

    .btn-signin:focus{
        font-weight: bold;
        color: white;
    }

    .btn-signin:active{
        background-color: rgb(75,0,130);
    }

    .signup{
        margin-top: 5em;
        font-size: 12px;
    }

    .centerBlock input{
        border-radius: 1em;
        color: black;
        padding: 0.5em;
    }


</style>
