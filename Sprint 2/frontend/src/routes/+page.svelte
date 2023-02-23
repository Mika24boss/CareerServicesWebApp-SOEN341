<script>

</script>

<svelte:head>
	<title>AsianQuadPower</title>
	<meta name="description" content="Career website" />
</svelte:head>


<section>
	<div class="welcome centerBlock">
		<p style="font-size: 30px;">Welcome to AsianQuadPower! </p>
	</div>
	<div class='inputs-form centerBlock'>
		<p>Email: <input type="text" id="email" name="Email"></p>
		<p>Password: <input type="text" id="pwd" name="Password"></p>
	</div>
		<div class="btn-container">
			<button class="btn-signin centerBlock">Sign-In</button>
			<button class="btn-signup centerBlock"><a href="/signup">Sign-Up</a></button>
		</div>
</section>


<style>

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
