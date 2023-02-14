<script>
	import Zoom from '$lib/images/zoom.png';
</script>


<section>

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

</section>


<style>

    .interview {
        background-color: rgba(255, 255, 255, 0.8);
        width: 90%;
        display: flex;
				flex-direction: row;
				justify-content: space-evenly;
				outline-style: solid;
        outline-color: black;
        outline-width: 2px;
        font-size: 15px;
    }

		.details{
				width: 70%;
				height: 70%;
		}

		.details p{
				position: relative;
				left: 1em;

		}

		.platform{
				width: 30%;
				text-align: center;
		}

		img{
				width: 3em;
				height: 3em;
		}

</style>