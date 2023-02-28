<script>
		import {authService} from '$lib/features/authService.js';
		import {goto} from "$app/navigation";


		async function signOut(){
			//console.log("Before: ", localStorage)
			authService.logout();
			//console.log("After: ", localStorage)
			console.log('Logged out');
			await goto('/');
		}

</script>



<div class='btn-container'>
	<button class="btn-signout" type="submit" on:click={signOut}>Sign-Out</button>
</div>




<style>
    *{
        font-family: 'Barlow', sans-serif;
				font-size: 1em;
				color: white;
    }

    .btn-signout {
        position: fixed;
        top: 1.5em;
        right: 2em;
				color: white;
        background-color: black;
				padding: 1em 1em;
        border-radius: 0.5em;
				font-weight: bold;
				outline: 2px solid white
    }

    .btn-signout:hover{
        color: black;
				background-color: white;
        transition: 0.7s;
    }

    .btn-signout:focus{
        font-weight: bold;
        color: black;
    }

    .btn-signout:active{
        background-color: rgb(75,0,130);
    }


</style>