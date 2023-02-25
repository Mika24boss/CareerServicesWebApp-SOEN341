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
                <p>Full Name: <input type="text" id="name" name="Name" required></p>
                <p>Email: <input type="text" id="email" name="Email" required></p>
                <p>Password: <input type="password" id="pwd" name="Password" required></p>
            </div>
            <div class="btn-container">
                <button class="btn-signup centerBlock" type="submit" on:click="{onSubmit}">Sign-Up</button>
                <button class="btn-back centerBlock"><a href="/">Back</a></button>
            </div>
        </form>

    </div>

</section>
        <button class="btn-test" value='Admin'>Testing</button>

<style>
    *{
        font-family: 'Barlow', sans-serif;
    }

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

    .btn-container {
        justify-content: center;
        display: flex;
        padding-top: 20px;
    }
</style>