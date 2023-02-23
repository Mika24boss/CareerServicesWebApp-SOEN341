<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<section>
	<div class="welcome centerBlock">
		<p style="font-size: 30px;">Welcome to CareerSENSE! </p>
		<p>where you get a sense of your career...</p>
	</div>
	<div class="signin-form centerBlock">
		<p>Email: <input type="text" id="email" name="Email"></p>
		<p>Password: <input type="text" id="pwd" name="Password"></p>
		<div class="btn-container">
			<button class="btn-signin centerBlock">Sign-In</button>
			<button class="btn-signup centerBlock"><a href="">Sign-Up</a></button>
		</div>
	</div>

</section>


<style>

		section {
		/*display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;*/
	}

	h1 {
		width: 100%;
	}

	.welcome{
		display: block;
		position: relative;
		width: 100%;
		padding-top: 30px;
	}

	.welcome p{
			margin: 2px;
	}


	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}

  * a:link, a:visited, a:hover{
      text-decoration: none;
  }

  .centerBlock{
      text-align: center;
      display: block;
      margin: 10px;
      font-size: 20px;
  }

  .signin-form p{
      margin: 10px;
  }

	.signin-form{
			padding-top: 30px;
	}

  .btn-container{
      justify-content: center;
      display: flex;
      padding-top: 20px;
  }
</style>
