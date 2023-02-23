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
        name = 'John';
        role = 'Student'; // or Employer or Admin
        email = document.getElementById("email").value;
        password = document.getElementById("password").value;
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
        //await goto("/");
    }
</script>

<section>
    <div class="signup-title centerBlock" style="padding-bottom:0">
        <p style="font-size: 30px">Sign-Up as a ... </p>
        {API_URL}<br/>
        {response}
    </div>
    <div class="centerBlock">
        <button class="btn-student">Student</button>
        <button class="btn-employer">Employer</button>

        <form>
            <div class='inputs-form centerBlock'>
                <p>Full Name: <input type="text" id="name" name="Name"></p>
                <p>Email: <input type="text" id="email" name="Email"></p>
                <p>Password: <input type="text" id="pwd" name="Password"></p>
            </div>
            <div class="btn-container">
                <button class="btn-signup centerBlock" type="submit" on:click="{onSubmit}">Sign-Up</button>
                <button class="btn-back centerBlock"><a href="/">Back</a></button>
            </div>
        </form>

    </div>

</section>
        <button class="btn-test">Testing</button>

<style>

    h1 {
        width: 100%;
    }

    .btn-test{
        position: fixed;
        bottom: 5px;
        right: 10px;
    }

    .signup-title {
        display: block;
        position: relative;
        width: 100%;
        padding-top: 30px;
    }

    .signup-title p {
        margin: 2px;
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