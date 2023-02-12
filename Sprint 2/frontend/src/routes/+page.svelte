<script>
	import Inputs from '$lib/components/Inputs.svelte';

</script>

<svelte:head>
	<title>AsianQuadPower</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>


<section>
	<div class="welcome centerBlock">
		<p style="font-size: 30px;">Welcome to AsianQuadPower! </p>
	</div>
	<Inputs/>
		<div class="btn-container">
			<button class="btn-signin centerBlock">Sign-In</button>
			<button class="btn-signup centerBlock"><a href="/signup">Sign-Up</a></button>
		</div>

</section>


<style>

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

  .btn-container{
      justify-content: center;
      display: flex;
      padding-top: 20px;
  }
</style>
