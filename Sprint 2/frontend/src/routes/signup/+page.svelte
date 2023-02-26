<script>
    import {authService} from '$lib/features/authService.js';
    import {userService} from '$lib/userStore';
    import {get} from 'svelte/store';
    import {goto} from "$app/navigation";
    import {env} from "$env/dynamic/public";

    const API_URL = env.PUBLIC_API_URL + '/api/users/'

    console.log(userService.UserState[get(userService.userState)]);
    let name, email, password, role;
    let response;


    async function onSubmit() {
        name = document.getElementById('name').value;
        role = role;
        email = document.getElementById("email").value;
        password = document.getElementById("pwd").value;
        const userData = {
            name,
            email,
            password,
            role
        };
        response = await authService.register(userData);
        console.log('Response: ', response);

        //userID = response.something;
        userService.userState.set(userService.UserState.Student);
        await goto("/");
    }

</script>

<section>
    <div class="signup-title centerBlock" style="padding-bottom:0">
        <p style="font-size: 30px">Sign-Up as a ... </p>
        {API_URL}<br/>
        {response}
    </div>
    <div class="centerBlock">

        <form>
            <input type='radio' id='student' name='user-type' value='Student' bind:group={role}>
            <label for='student'>Student</label>
            <input type='radio' id='employer' name='user-type' value='Employer' bind:group={role}>
            <label for='employer'>Employer</label>

            <div class='inputs-form centerBlock'>
                <p>Full Name: <input type="text" id="name" name="Name" placeholder="Full Name" required></p>
                <p>Email: <input type="text" id="email" name="Email" placeholder="Email" required></p>
                <p>Password: <input type="password" id="pwd" name="Password" placeholder="Password" required></p>
            </div>
            <div class="btn-container">
                <button class="btn-signup centerBlock" type="submit" on:click="{onSubmit}">Sign-Up</button>
                <button class="btn-back centerBlock"><a href="/">Back</a></button>
            </div>
        </form>

    </div>

</section>
        <button class="btn-test" value='Admin' style='background-color: rgb(8,14,14)'>Testing</button>

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

    h1 {
        width: 100%;
    }

    .btn-test{
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
        padding-top: 30px;
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

    .centerBlock input{
        border-radius: 1em;
        color: black;
        padding: 0.5em;
    }

    .btn-container {
        justify-content: center;
        display: flex;
        padding-top: 20px;

    }

    .btn-signup, .btn-back{
        border-radius: 1em;
        background: black;
        padding: 5px 5px 5px 5px;
        width: 10em;
    }
</style>