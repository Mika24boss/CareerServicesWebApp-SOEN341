<svelte:head>
    <title>Profile</title>
</svelte:head>

<script>

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authService } from '$lib/features/authService.js';
	import { fileService } from '$lib/features/fileService.js';
  import LoadingAnimation from "$lib/components/LoadingAnimation.svelte";

	let user;
	let profilePictureURL, resumeURL;

	function handleImageChange(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			profilePictureURL = e.target.result;
			//console.log('profilePictureURL:', profilePictureURL);
		};
		reader.readAsDataURL(file);
	}

	async function uploadPic(){
		const uploadimage = document.getElementById('image')
		//console.log(uploadimage.files[0])
		const formData = new FormData();
		formData.append("id", user._id);
		formData.append("name", uploadimage.files[0].name);
		formData.append("profileImage", uploadimage.files[0]);

		const response = await authService.uploadProfileImage(formData, user.token);
		//console.log(response)
	}

	async function uploadCV(){
		const uploadfile = document.getElementById('cv')
		const formData = new FormData();
		formData.append("id", user._id);
		formData.append("name", uploadfile.files[0].name);
		formData.append("resume", uploadfile.files[0]);

		const response = await authService.uploadCV(formData, user.token);
		//console.log(response)
	}

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
		//console.log(response);
	}

	onMount(() => {
		loadUser();

		profilePictureURL = fileService.getProfilePictureURL(user._id);
		resumeURL = fileService.getResumeURL(user._id);

		//document.getElementById('cv').file = fileService.getFileByID(user.resume, user.token);
		// document.getElementById('previewImage').src = URL.createObjectURL(blob);
		// document.getElementById('previewImage').src = "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F12%2F16%2Fanime-cat-names-1204854078-2000.jpg"
	});

</script>

{#if !user}
    <LoadingAnimation/>
{:else}
   
<div class='profile-page'>


	<h1 style='text-align: left;'>Profile</h1>
	<div class='profile'>
		<div class='avatar-upload'>
			<h3>Avatar</h3>

			<div class='image-container'>
				<label id='image-btn' for='image'>
					<input type='file' name='image' id='image' style='display: none;' accept='image/*' on:change={handleImageChange}>
					<img id='previewImage'
							 src={profilePictureURL}
							 alt='Click to upload image'>
				</label>
			</div>

			<div class='btn' style='padding-top: 10px;'>
				<button on:click={uploadPic}>Change</button>
			</div>
		</div>

            <div class='information'>
                <h3>Information</h3>

                <label for='name'>Full Name</label>
                <div class='formGroup'><input type='text' id='name' name='name' value={user.name}></div>
                <label for='email'>Email Address</label>
                <div class='formGroup'><input type='email' id='email' name='email' value={user.email}></div>
                <label for='password'>Password</label>
                <div class='formGroup'><input type='new-password' id='password' name='password'
                                              placeholder='Leave empty if no change'></div>

                <div class='btn'>
                    <button class='save' on:click={editUser}>Save</button>
                </div>
            </div>

		<div class='cv-upload'>
			<h3>Resume</h3>

			<div class='btn' style='text-align: left;'>
				<input type='file' id='cv' name='cv' accept='application/pdf,application/msword,.doc,docx'>
			</div>

			<div class='btn'>
				<input type='submit' value='Upload' on:click={uploadCV} style='cursor: pointer; width: auto; border-radius: 10px;'>
			</div>
		</div>
	</div>
	<a href={resumeURL} download="{user.name + ' - CV.pdf'}">CLICK ME!</a>
</div>
{/if}

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

    .profile-page {
        margin: 2%;
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

    .avatar-upload {
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

    .cv-upload {
        background-color: #141414;
        display: flex;
        flex-direction: column;
        border-radius: 1em;
        grid-area: footer;
        padding: 10px 30px 10px;
    }

    input[id=cv] {
        border: none;
    }

    input::file-selector-button {
        cursor: pointer;
        border: 1px solid black;
        border-radius: 10px;
        padding: 5px;
    }
</style>


