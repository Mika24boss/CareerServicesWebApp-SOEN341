<script>

    import {onMount} from 'svelte';
    import {goto} from "$app/navigation";
    import {authService} from '$lib/features/authService.js';

	let user;
	let previewUrl;

    function handleImageChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            previewUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    onMount(() => {
        const input = document.querySelector('#image-upload');
        input.addEventListener('change', handleImageChange);

        loadUser();
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
    });

    async function loadUser() {
        user = authService.getUser();
        if (user == null || user.role === 'Admin') {
            await goto('/');
        }
    }

    async function editUser() {

		const userData = {
			id: user._id,
			name: document.getElementById('name').value,
			email: document.getElementById('email').value,
			password: document.getElementById('password').value
		};
		const response = await authService.edit(userData, user.token);
		console.log(response);
	}

</script>

<div class='profile'>

    <form class="profile-pic">
        <h3>Avatar</h3>

        <div class="image-container">
            <label id="image-btn" for="image-upload">
                <input type="file" name="image-upload" id="image-upload" style="display: none;" accept="image/*">
                <img id="previewImage"
                     src={previewUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                     alt="Click to upload image">
            </label>
        </div>

        <div class="btn" style="padding-top: 10px;">
            <button>Change</button>
        </div>
    </form>

		<div class='information'>
			<h3>Information</h3>

			<label for='name'>Full Name</label>
			<div class='formGroup'><input type='text' id='name' name='name'></div>
			<label for='email'>Email Address</label>
			<div class='formGroup'><input type='email' id='email' name='email'></div>
			<label for='password'>Password</label>
			<div class='formGroup'><input type='new-password' id='password' name='password'
																		placeholder='Leave empty if no change'></div>

			<div class='btn'>
				<button class='save' on:click={editUser}>Save</button>
			</div>
		</div>

    <form class="resume">
        <h3>Resume</h3>

        <div class="btn" style="text-align: left;">
            <input type="file" id="file-upload" name="file" accept="application/pdf,application/msword,.doc,docx">
        </div>

        <div class="btn">
            <input type="submit" value="Upload" style="cursor: pointer; width: auto; border-radius: 10px;">
        </div>
    </form>
</div>

<style>
    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    h1 {
        color: white;
    }

    h3 {
        margin: 5px 5px 10px;
    }

    button {
        border: 1px solid;
        border-radius: 10px;
        padding: 5px;
        cursor: pointer;
    }

    input {
        border: 2px solid;
        padding: 5px;
    }

    .btn {
        text-align: center;
    }

    .btn input, .btn button {
        color: #3A98B9;
    }

    .profile {
        width: 80%;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: 340px 2fr;
        grid-template-areas:
                'aside main'
                'footer footer';
        grid-gap: 1em;
        margin: auto;
    }

    .profile-pic {
        background-color: #141414;
        display: flex;
        flex-direction: column;
        border-radius: 1em;
        grid-area: aside;
        padding: 10px 20px 10px;
    }

    #previewImage {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        cursor: pointer;
        opacity: 1;
        transition: 0.5s ease;
    }

    #previewImage:hover {
        opacity: 0.5;
        transition: 0.5s ease;
    }

    .information {
        background-color: #141414;
        display: flex;
        flex-direction: column;
        border-radius: 1em;
        grid-area: main;
        grid-gap: 10px;
        padding: 10px 30px 10px;
    }

    .formGroup input, .formGroup input:focus {
        border: none;
        width: 100%;
        border-bottom: 2px solid #3A98B9;
        font-size: 14px;
        font-weight: bold;
        background-color: transparent;
        color: white;
    }

    .formGroup input::placeholder {
        color: white;
    }

    .resume {
        background-color: #141414;
        display: flex;
        flex-direction: column;
        border-radius: 1em;
        grid-area: footer;
        padding: 10px 30px 10px;
    }

    input[id=file-upload] {
        border: none;
    }

    input::file-selector-button {
        cursor: pointer;
        border: 1px solid black;
        border-radius: 10px;
        padding: 5px;
    }
</style>
