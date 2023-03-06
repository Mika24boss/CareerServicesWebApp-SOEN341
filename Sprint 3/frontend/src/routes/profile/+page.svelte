<script>
    import { onMount } from 'svelte';
    import {goto} from "$app/navigation";
    import {authService} from '$lib/features/authService.js';
    async function auth() {
        const user = authService.getUser();
        if (user === null || user === undefined) {
            await goto('/');
        }
    }

    let previewUrl;
    auth();

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
    });
</script>

<h1 style="text-align: left;">Profile</h1>
<div class="profile">

    <form class="profile-pic" method="post" enctype="multipart/form-data">
        <h3>Avatar</h3>

        <div class="image-container">
            <label id="image-btn" for="image-upload">
                <input type="file" name="image-upload" id="image-upload" style="display: none;" accept="image/*" >
                <img id="previewImage" src={previewUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Click to upload image">
            </label>
         </div>

        <div class="btn" style="padding-top: 10px;">
            <button type="submit">Change</button>
        </div>
    </form>

    <form class="information">
        <h3>Information</h3>

        <label for="name">Full Name</label>
        <input type="text" id="name" name="name">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">

        <div class="btn">
          <button class="save">Save</button>
        </div>
    </form>

    <form class="resume">
        <h3>Resume</h3>

        <div class="btn" style="text-align: left;">
            <input type="file" id="file-upload" name="file" accept="application/pdf,application/msword,.doc,docx">
        </div>

        <div class="btn">
            <input type="submit" value="Upload" style="cursor: pointer; width: auto;">
        </div>
    </form>

</div>

<style>
  *{font-family: 'Barlow', sans-serif;}

    h1{color: white;}
      
    h3{margin:5px 5px 10px;}

    button{
        border: 1px solid;
        border-radius: 10px;
        padding:5px;
        cursor: pointer;
    }

    input{
        border: 1px solid;
        border-radius: 10px;
        padding:5px;
    }

    .btn{
        text-align: center;
    }

    .profile{
        display:grid;
        grid-template-columns: 1fr 2fr ;
        grid-template-rows: 300px 1fr;
        grid-template-areas:
                'aside main'
                'footer footer';
        grid-gap: 10px;
    }

    .profile-pic{
        background-color: aliceblue;
        display: flex;
        flex-direction: column;
        border: 1px solid;
        border-radius: 10px;
        grid-area: aside;
        padding: 10px 20px 10px;
    }

    #previewImage{
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

    #previewImage:hover{
        opacity:0.5;
        transition:0.5s ease;
    }

    .information{
        background-color: aliceblue;
        display: flex;
        flex-direction: column;
        border: 1px solid;
        border-radius: 10px;
        grid-area: main;
        grid-gap: 10px;
        padding: 10px 30px 10px;
    }

    .resume{
        background-color: aliceblue;
        display: flex;
        flex-direction: column;
        border: 1px solid;
        border-radius: 10px;
        grid-area: footer;
        padding: 10px 30px 10px;
    }

    input[id=file-upload]{
        border: none;
    }

    input::file-selector-button{
        cursor: pointer;
        border: 1px solid black;
        border-radius: 10px;
        padding: 5px;
    }
</style>


