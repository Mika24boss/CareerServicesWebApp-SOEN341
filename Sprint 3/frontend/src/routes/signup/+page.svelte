<script>
    import {authService} from '$lib/features/authService.js';
    import {goto} from "$app/navigation";
    import {env} from "$env/dynamic/public";

    const API_URL = env.PUBLIC_API_URL + '/api/users/'

    let name, email, password, role;
    let response;


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
        response = await authService.register(userData);
        console.log('Response: ', response);
        await goto("/");
    }

</script>

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
                <p>Full Name: <input type="text" id="name" name="Name" placeholder="Full Name" required></p>
                <p>Email: <input type="text" id="email" name="Email" placeholder="Email" required></p>
                <p>Password: <input type="password" id="password" name="Password" placeholder="Password" required></p>
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
<button class="btn-test" value='Admin' style='background-color: rgb(8,14,14)'>Testing</button>


<style>
    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    section {
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

    .centerBlock input {
        border-radius: 1em;
        color: black;
        padding: 0.5em;
    }

    .btn-container {
        justify-content: center;
        display: flex;
        padding-top: 20px;

    }

    .btn-signup, .btn-back {
        border-radius: 1em;
        box-shadow: 0 1px 1px 1px rgba(255, 255, 255, 0.2);
        background: black;
        padding: 5px 5px 5px 5px;
        width: 10em;
    }

    .btn-signup:hover, .btn-back:hover, .btn-back a:hover {
        background-color: white;
        color: black;
        transition: 0.7s;
    }

    .btn-signup:focus, .btn-back:focus {
        font-weight: bold;
        color: white;
    }

    .btn-signup:active, .btn-back:active {
        background-color: rgb(75, 0, 130);
    }


</style>