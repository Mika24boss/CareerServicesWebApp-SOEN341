<style>

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

    .avatar img {
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

    .avatar img:hover{
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

    input[id=file]{
        border: none;
    }

    input::file-selector-button{
        cursor: pointer;
        border: 1px solid black;
        border-radius: 10px;
        padding: 5px;
    }

</style>

<h1 style="text-align: left;">Profile</h1>
<div class="profile">

    <form class="profile-pic">
        <h3>Avatar</h3>

       <div class="avatar">
            <label id="upload-btn" for="photo">
                <img id="default-photo" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Avatar">
                <input type="file" name="photo" id="photo" style="display: none;" accept="image/*" onchange="readURL(this);">
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

    <form class="resume" action="/"> <!-- is an action needed after uploading a file? -->
        <h3>Resume</h3>

        <div class="btn" style="text-align: left;">
            <input type="file" id="file" name="file" accept="application/pdf,application/msword,.doc,docx">
        </div>

        <div class="btn">
            <input type="submit" value="Upload" style="cursor: pointer; width: auto;">
        </div>
    </form>

</div>