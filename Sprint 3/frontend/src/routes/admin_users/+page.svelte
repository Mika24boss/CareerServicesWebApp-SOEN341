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
	</div>

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

</style>