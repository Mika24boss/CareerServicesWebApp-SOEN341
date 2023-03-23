<script>
	import Profile from '$lib/images/profile-logo.png';
	export let name, email, userID, profilePicture, CV; // todo: Add CV


</script>


<div class='user' id={userID}>
	<div class='profile'>
		<img src={Profile} alt='profile-logo' /> <!-- to change -->
	</div>
	<div class='user-info'>
		<p>{name}</p>
		<p>{email}</p>
	</div>
	<div class='resume'>
		<button class='btn-resume'>CV</button>
	</div>
	<!--<div class='checkbox'>
		<input type='checkbox' value={userID}>
	</div>-->
</div>


<style>

    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    .user {
        display: grid;
        grid-template-columns: 1fr 4fr 1fr;
        justify-items: stretch;
        margin: 0.3em;
        background: #141414;
        outline: 1px solid white; /* to remove */

    }

    .profile {
        padding: 1.5em;
    }

    img {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .user-info{
        padding: 1.5em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .resume {
        padding: 2em 1em;
    }

    .btn-resume {
        width: 100%;
        height: 100%;
        font-size: 1em;
        color: black;
        background: #3A98B9;
        border-radius: 0.5em;
    }

    .checkbox input {
        position: relative;
        width: 25%;
        height: 25%;
        float: right;
        top: 3.5em;
    }

</style>
