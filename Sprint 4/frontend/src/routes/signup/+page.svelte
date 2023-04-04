<svelte:head>
	<title>Sign-up</title>
</svelte:head>

<script>
	import authService from '$lib/features/authService.js';
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import { hasUpdated } from '../../lib/stores/updateUser.js';

	const API_URL = env.PUBLIC_API_URL + '/api/users/';

	let name, email, password, role;
	let response;
	let hasMissingFields = false;

	async function onSubmit() {
		name = document.getElementById('name').value;
		role = role;
		email = document.getElementById('email').value;
		password = document.getElementById('password').value;
		const userData = {
			name,
			email,
			password,
			role
		};
		response = await authService.register(userData);
		hasUpdated.set(true);
		if (!response) {
			hasMissingFields = true;
			//console.log('Response: ', response);
		} else if (response.role === 'Student') {
			await goto('/dashboard_student');
		} else if (response.role === 'Employer') {
			await goto('/dashboard_employer');
		}
	}

</script>

<section>
	<div class='signup-title centerBlock' style='padding-bottom:0'>
		<p style='font-size: 30px'>Sign-Up as a ... </p>
		{API_URL}
	</div>

	<div class='centerBlock'>
		<div class='signup-form'>
			<div class='radio-input'>
				<input type='radio' id='student' name='user-type' value='Student' required bind:group={role}>
          <div class="plus1">
              <div class="plus2"></div>
          </div>
				<label for='student'>Student</label>
				<input type='radio' id='employer' name='user-type' value='Employer' required bind:group={role}>
          <div class="plus1">
              <div class="plus2"></div>
          </div>
				<label for='employer'>Employer</label>
			</div>
			<div class='inputs-form centerBlock'>
				<div class='formGroup'><input type='text' id='name' name='Name' placeholder='Full Name' required
																			style='color:white'></div>
				<div class='formGroup'><input type='text' id='email' name='Email' placeholder='Email' required
																			style='color:white'></div>
				<div class='formGroup'><input type='password' id='password' name='Password' placeholder='Password' required
																			style='color:white'></div>
			</div>

			{#if hasMissingFields}
				<div class='missingFields-box'>
					<p>Please fill all the fields and try again.</p>
				</div>
			{/if}
			<div class='btn-container'>
				<button class='btn-signup centerBlock' type='submit' on:click='{onSubmit}'>Sign-Up</button>
				<a href='/'>
					<button class='btn-back centerBlock'>Back</button>
				</a>
			</div>
		</div>
	</div>
</section>

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

    h1 {
        width: 100%;
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

    .missingFields-box > p {
        width: 40%;
        color: #cc0000;
        font-weight: bold;
        background-color: #EF9A9A;
        text-align: center;
        margin: 1em auto;
        padding: 0.5em;
    }

    .btn-signup, .btn-back {
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

    .btn-signup::before, .btn-back::before {
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

    .btn-signup:hover::before, .btn-back:hover::before {
        transform: translateX(0);
    }

    .radio-input {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .radio-input input {
        appearance: none;
        width: 2em;
        height: 2em;
        background-color: #171717;
        box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
        border-radius: 5px;
        transition: .4s ease-in-out;
        outline: darkgray solid 1px;
    }

    .radio-input input:hover {
        scale: 1.2;
        cursor: pointer;
        box-shadow: none;
    }

    .radio-input .plus1 {
        position: relative;
        top: 0.01em;
        left: -1.45em;
        width: 1.3em;
        height: 0.2em;
        background-color: #3A98B9;
        rotate: 45deg;
        scale: 0;
        border-radius: 5px;
        transition: .4s ease-in-out;
    }

    .radio-input .plus2 {
        position: relative;
        width: 1.3em;
        height: 0.2em;
        background-color: #3A98B9;
        transform: rotate(90deg);
        border-radius: 5px;
        transition: .4s ease-in-out;
    }

    .radio-input input:checked {
        box-shadow: none;
    }

    .radio-input input:checked + .plus1 {
        transform: rotate(180deg);
        scale: 1;
    }
</style>