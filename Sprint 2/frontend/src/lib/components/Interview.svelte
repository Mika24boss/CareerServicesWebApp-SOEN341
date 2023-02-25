<script>
	import Zoom from '$lib/images/zoom.png';
</script>


	<div class='interview'>
		<div class='details'>
			<p>Job title at Location (123)</p>
			<p>Date at Time</p>
		</div>
		<div class='platform'>
			<p>via Zoom</p>
			<img src={Zoom} alt='zoom_image'/>
		</div>
	</div>


<style>

    *{
        font-family: 'Barlow', sans-serif;
    }

    .interview {
        background-color: rgba(255, 255, 255, 0.8);
        width: 90%;
        display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		outline: black solid 2px;
	}

	.details{
		width: 70%;
		height: 70%;
		margin: 1em;
	}

	.details p{
		position: relative;
	}

	.platform{
		position: relative;
		width: 30%;
		text-align: center;
	}

	img{
		position: relative;
		width: 3em;
		height: 3em;
	}

</style>