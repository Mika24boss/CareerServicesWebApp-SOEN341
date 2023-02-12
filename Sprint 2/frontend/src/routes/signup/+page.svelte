<script>
	import Inputs from '$lib/components/Inputs.svelte';

</script>

<section>
	<div class="signup-title centerBlock" style="padding-bottom:0">
		<p style="font-size: 30px">Sign-Up as a ... </p>
	</div>
	<div class="user-type centerBlock">
		<button class="btn-student">Student</button>
		<button class="btn-employer">Employer</button>
		<button class="btn-admin">Admin</button>
	</div>
	<Inputs/>
		<div class="btn-container">
			<button class="btn-signup centerBlock">Sign-Up</button>
			<button class="btn-back centerBlock"><a href="/">Back</a></button>
		</div>

</section>


<style>

    h1 {
        width: 100%;
    }

    .signup-title{
        display: block;
        position: relative;
        width: 100%;
        padding-top: 30px;
    }

    .signup-title p{
        margin: 2px;
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