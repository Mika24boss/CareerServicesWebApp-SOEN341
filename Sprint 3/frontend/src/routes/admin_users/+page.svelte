<script>
	import User from '$lib/components/User.svelte';
	import {authService} from '$lib/features/authService.js';
	import {goto} from "$app/navigation";
	import {onMount} from "svelte";

	let usersPack = loadAllUsers();
	let selectedUsersArray = [];
	let arrayLength;
	let boolArray = Array(arrayLength);
	var user;

	async function loadAllUsers(){
		await onMount(() => {
			user = authService.getUser();
		})

		if (user === null || user === undefined) {
			await goto('/');
		}

		let users;
		users = await authService.getAllUsers(user.token);
		console.log('Users: '+ users)

		usersPack = users.map(function (user) {
			return {
				name: user.name,
				email: user.email,
			} // todo: add profilePicture and CV
		});
		console.log('usersPack: '+	usersPack)
	}

	async function deleteUsers(){
		for(let i=0; i<arrayLength;i++){
			authService.deleteUser();
		}
	}

	async function consoleUsersPack(){
		console.log('usersPack: '+usersPack);
		arrayLength = usersPack.length;
	}
</script>


<div class="usersPage" on:load={consoleUsersPack}>
	<div class="pageHeader">
		<h1>Users</h1>
		<input type="search" class="search" placeholder="Type a name...">
	</div>

	{#await usersPack}
	{:then usersPack}

	<div class='users'>
		{#each usersPack as userID, i}
			<User {...userID} userID={userID}/>
			<input type='checkbox' style='float: right;' bind:checked={boolArray[i]} on:change={()=> {
				if (boolArray[i]) {
					selectedUsersArray.push(userID)
					console.log(selectedUsersArray)
				}
				else {
					if (selectedUsersArray.indexOf(userID) !== -1) selectedUsersArray.splice(selectedUsersArray.indexOf(userID), 1);
					console.log(selectedUsersArray)
				}
			}
			}/>
		{/each}
	</div>

	<button type="button" class="deleteUser-btn" on:click={deleteUsers}>Delete</button>

	{/await}
</div>


<style>
    * {
        font-family: 'Barlow', sans-serif;
    }

    .usersPage {
        width: 80%;
        margin-left: 10%;
    }

    h1, h2 {
        color: lightgray;
    }

    .users {
        display: grid;
        grid-template-columns: 5fr 1fr;
        justify-items: stretch;
        grid-gap: 3em;
    }

    .pageHeader {
        margin-bottom: 2em;
        display: flex;
        justify-content: space-between;
    }

    .search {
        margin: auto 0;
        font-size: 1em;
        height: 40px;
        width: 250px;
        background: lightgray;
    }

    .deleteUser-btn{
        display: block;
        width: 20%;
        border: solid black;
        background-color: #3A98B9;
        color: black;
        padding: 14px 28px;
        font-size: 2em;
        cursor: pointer;
        text-align: center;
        margin-top: 1em;
        position: relative;
        right: 20px;
        float: right;
    }

    input[type=checkbox]{
				width: 30%;
        height: 30%;
    }

</style>