<svelte:head>
    <title>Profile</title>
</svelte:head>

<script>
    import {onMount} from 'svelte';
    import {goto} from '$app/navigation';
    import {authService} from '$lib/features/authService.js';
    import {fileService} from '$lib/features/fileService.js';
    import LoadingAnimation from "$lib/components/LoadingAnimation.svelte";

    let user;
    let profilePictureURL, resumeURL, logoURL;

    function handleImageChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePictureURL = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function handleImageChange1(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            logoURL = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    async function uploadPic() {
        const uploadimage = document.getElementById('image')
        const formData = new FormData();
        formData.append("id", user._id);
        formData.append("profileImage", uploadimage.files[0], user._id + ".png");
        const response = await authService.uploadProfileImage(formData);
        if (response) {
            alert("Profile picture uploaded!")
        } else {
            alert("Error while uploading profile picture.")
        }
    }

    async function uploadLogo() {
        const uploadimage = document.getElementById('image1')
        const formData = new FormData();
        formData.append("id", user._id);
        formData.append("profileImage", uploadimage.files[0], "logo-" + user._id + ".png");
        const response = await authService.uploadProfileImage(formData);
        if (response) {
            alert("Logo uploaded!")
        } else {
            alert("Error while uploading logo.")
        }
    }

    async function uploadCV() {
        const uploadfile = document.getElementById('cv')
        const formData = new FormData();
        formData.append("id", user._id);
        formData.append("resume", uploadfile.files[0], user._id + ".pdf");
        const response = await authService.uploadCV(formData);
        if (response) {
            location.reload();
            alert("Resume uploaded!");
        } else {
            alert("Error while uploading resume.")
        }
    }

    async function loadUser() {
        user = authService.getUser();
        if (user == null) {
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
        //	console.log(response);
        if (response) {
            alert("Information updated!")
        } else {
            alert("Error while updating information.")
        }
    }
    async function editCompany() {
        const userData = {
            id: user._id,
            companyName: document.getElementById('companyName').value,
            vision: document.getElementById('vision').value,
            industry: document.getElementById('industry').value,
            location: document.getElementById('location').value
        };
        const response = await authService.edit(userData, user.token);
        //	console.log(response);
        if (response) {
            alert("Company information updated!")
        } else {
            alert("Error while updating company information.")
        }
    }

    onMount(async () => {
        await loadUser();
        console.log(user.companyName);
        profilePictureURL = await fileService.getProfilePictureURL(user._id);
        if (user.role === "Student"){
        resumeURL = await fileService.getResumeURL(user._id);}
        if (user.role === "Employer"){
        logoURL = await fileService.getLogoURL(user._id);}
    });

</script>

{#if !user}
    <LoadingAnimation/>
{:else}

    <div class='profile-page'>
        <h1>Profile</h1>
        <div class='profile'>
            <div class='avatar-upload'>
                <h3>Avatar</h3>
                <div class='image-container'>
                    <label class='image-btn' for='image'>
                        <input type='file' name='image' id='image' style='display: none;' accept='image/*'
                               on:change={handleImageChange}>
                        <img id='previewImage' src={profilePictureURL} alt='Click to upload image'>
                    </label>
                </div>
                <div class='btn' style='padding-top: 10px;'>
                    <button on:click={uploadPic}>Submit</button>
                </div>
            </div>

            <div class='information'>
                {#if user.role === "Student"}
                    <h3>Student Information</h3>
                {:else if user.role === "Employer"}
                    <h3>Employer Information</h3>
                {:else if user.role === "Admin"}
                    <h3>Admin Information</h3>
                {/if}
                <label for='name'>Full Name</label>
                <div class='formGroup'><input type='text' id='name' name='name' value={user.name}></div>
                <label for='email'>Email Address</label>
                <div class='formGroup'><input type='email' id='email' name='email' value={user.email}></div>
                <label for='password'>Password</label>
                <div class='formGroup'><input type='new-password' id='password'
                                              name='password' placeholder='Leave empty if no change'></div>
                <div class='btn'><button class='save' on:click={editUser}>Save</button></div>
            </div>

            {#if user.role === "Student"}
                <div class='cv-upload'>
                    <h3>Resume</h3>
                    <div id="currentCV">
                        <div class='btn' style='text-align: left;padding-bottom: 15px'>
                            {#if resumeURL}
                                <a href={resumeURL} target="_blank" style="color: #3A98B9;">
                                    <button>Open current CV</button>
                                </a>
                            {:else}
                                <button>No CV uploaded</button>
                            {/if}
                        </div>
                    </div>
                    <div id="newCV">
                        <label for='cv'>Upload a new resume</label>
                        <div class='btn' style='text-align: left;'>
                            <input type='file' id='cv' name='cv' accept='application/pdf'>
                        </div>
                        <div class='btn'>
                            <input type='submit' value='Upload' on:click={uploadCV}
                                   style='cursor: pointer; width: auto; border-radius: 10px;'>
                        </div>
                    </div>
                </div>
            {:else if user.role === "Employer"}
                <div class='logo-upload'>
                    <h3>Logo</h3>
                    <div class='image-container'>
                        <label class='image-btn' for='image1'>
                            <input type='file' name='image1' id='image1' style='display: none;' accept='image/*'
                                   on:change={handleImageChange1}>
                            <img id='previewImage1' src={logoURL} alt='Click to upload image'>
                        </label>
                    </div>
                    <div class='btn' style='padding-top: 10px;'>
                        <button on:click={uploadLogo}>Submit</button>
                    </div>
                </div>
                <div class="companyInfo">
                    <h3>Company Information</h3>
                    <label for='companyName'>Company Name</label>
                    <div class='formGroup'><input type='text' id='companyName' name='companyName' value={user.companyName || ''}></div>
                    <label for='vision'>Vision</label>
                    <div class='formGroup'><input type='text' id='vision' name='vision' value={user.vision || ''}></div>
                    <label for='industry'>Industry/Sector</label>
                    <div class='formGroup'><input type='text' id='industry' name='industry' value={user.industry || ''}></div>
                    <label for='location'>Location</label>
                    <div class='formGroup'><input type='text' id='location' name='location' value={user.location || ''}></div>
                    <div class='btn'><button class='save' on:click={editCompany}>Save</button></div>
                </div>
            {:else if user.role === "Admin"}
                <div class="adminInfo">
                    <h3>Admin Permissions</h3>
                    <ul>
                        <li>You can manage and delete users</li>
                        <li>You can manage and delete job offers</li>
                    </ul>
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    h1 {
        color: lightgray;
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
        width: 80%;
        margin-left: 10%;
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

    #previewImage, #previewImage1 {
        display: block;
        margin-left: auto;
        margin-right: auto;
        object-fit: cover;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        cursor: pointer;
        opacity: 1;
        transition: 0.5s ease;
    }

    #previewImage:hover, #previewImage1:hover {
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
        width: 90%;
        margin-left: 10px;
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
        border: 1px solid;
        border-radius: 10px;
        padding: 5px;
        color: #3A98B9;
    }

    .companyInfo {
        background-color: #141414;
        display: flex;
        flex-direction: column;
        border-radius: 1em;
        grid-area: auto;
        grid-gap: 10px;
        padding: 10px 30px 10px;
    }

    .logo-upload {
        background-color: #141414;
        display: flex;
        flex-direction: column;
        border-radius: 1em;
        grid-area: auto;
        padding: 10px 20px 10px;
    }
</style>


