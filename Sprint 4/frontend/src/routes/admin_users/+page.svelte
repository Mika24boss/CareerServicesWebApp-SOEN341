<svelte:head>
	<title>Users</title>
</svelte:head>

<script>
	import User from '$lib/components/User.svelte';
	import { authService } from '$lib/features/authService.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { page } from '$app/stores';

	const [send, receive] = crossfade({
		fallback(node) {
			if ($page.url.pathname !== '/admin_users') return;
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;
			return {
				duration: 400,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
	let usersPack = loadAllUsers();
	let selectedUsersArray = [];
	let arrayLength;
	let boolArray = Array(arrayLength);
	var user;
	let searchTerm = '';

	async function loadAllUsers() {
		await onMount(() => {
			user = authService.getUser();
		});

		if (user === null || user === undefined) {
			await goto('/');
		}

		let users;
		users = await authService.getAllUsers(user.token);
		//console.log('Users: '+ users)

		usersPack = users.map(function(user) {
			return {
				name: user.name,
				email: user.email,
				id: user._id,
				role: user.role,
				profilePicture: user.profilePicture,
				CV: user.resume
			};
		});
		//console.log('usersPack: '+	usersPack)
	}

	async function deleteUsers() {
		console.log(selectedUsersArray.length);
		for (let i = 0; i < selectedUsersArray.length; i++) {
			let delUser = await authService.deleteUser(selectedUsersArray[i], user.token);
			//console.log(selectedUsersArray)
		}
		selectedUsersArray = [];
		location.reload();
	}

	async function consoleUsersPack() {
		console.log('usersPack: ' + usersPack);
		arrayLength = usersPack.length;
	}

	function toggleSelected(event) {
		let id = event.detail;
		const index = selectedUsersArray.indexOf(id);
		if (index > -1) { // only splice array when item is found
			selectedUsersArray.splice(index, 1); // 2nd parameter means remove one item only
		} else {
			selectedUsersArray.push(id);
		}
		console.log(selectedUsersArray);
	}

	function updateSearchTerm(e) {
		searchTerm = e.target.value;
	}
</script>


<div class='usersPage' on:load={consoleUsersPack}>
	<div class='pageHeader'>
		<h1>Users</h1>
		<div class='container-input'>
			<input type='text' placeholder='Search' name='text' class='input' on:input={updateSearchTerm}>
		</div>
	</div>

	{#await usersPack}
	{:then usersPack}

		<div class='users'>
			{#each usersPack.filter((v) => {
				return v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.email.toLowerCase().includes(searchTerm.toLowerCase()) || v.role.toLowerCase().includes(searchTerm.toLowerCase())
			}) as userA(userA.id)}
				<div in:receive='{{key: userA.id}}'
						 out:send='{{key: userA.id}}'
						 animate:flip='{{duration: 400}}'>
					<User {...userA} userID={userA} on:toggle={toggleSelected} />
				</div>
			{/each}
		</div>

		<button type='button' class='deleteUser-btn' on:click='{deleteUsers}'>Delete</button>
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
        grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
        justify-items: stretch;
        grid-gap: 2em;
    }

    .pageHeader {
        margin-bottom: 1em;
        display: flex;
        justify-content: space-between;
    }

    .deleteUser-btn {
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
        float: right;
        margin-top: 1em;
    }

    .deleteUser-btn::before {
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

    .deleteUser-btn:hover::before {
        transform: translateX(0);
    }

    .container-input {
        position: relative;
    }

    .input {
        width: 150px;
        padding: 10px 0 10px 40px;
        border-radius: 9999px;
        border: solid 1px #333;
        transition: all .2s ease-in-out;
        outline: none;
        opacity: 0.8;
				color: #3A98B9;
				font-weight: bold;
    }

    .container-input svg {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translate(0, -50%);
    }

    .input:focus {
        opacity: 1;
        width: 250px;
    }

</style>