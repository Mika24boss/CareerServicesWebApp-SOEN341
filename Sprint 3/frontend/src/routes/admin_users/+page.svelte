<script>
	import User from '$lib/components/User.svelte';

</script>


<div class="usersPage">
	<div class="pageHeader">
		<h1>Users</h1>
		<input type="search" class="search" placeholder="Type a name...">
	</div>

	<div class='users'>
		<User/>
		<User/>
		<User/>
	</div>

	<button type="button" class="deleteUser-btn">Delete</button>

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
        border: solid;
        border-color: black;
        background-color: blue;
        color: white;
        padding: 14px 28px;
        font-size: 2em;
        cursor: pointer;
        text-align: center;
        margin-top: 1em;
        position: relative;
        right: 20px;
        float: right;
    }

</style>