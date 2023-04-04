<script>
	import Zoom from '$lib/images/zoom.png';
	export var title, companyName, jobID, interviewDate;
	let  user;

	function formatInterviewDate(){
		return interviewDate.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' }) +
			' at ' + interviewDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}
</script>


	<div class='interview' id='jobID'>
		<div class='details'>
			<p style='font-weight: bold'>{title} with {companyName} ({jobID})</p>
			<p>{formatInterviewDate()}</p>
		</div>
		<div class='platform'>
			<p style='color: #3A98B9; font-weight: bold;'>via Zoom</p>
			<img src={Zoom} alt='zoom_image'/>
		</div>
	</div>


<style>

    *{
        font-family: 'Barlow', sans-serif;
				color: white;
    }

    .interview {
    /*background-color: rgba(255, 255, 255, 0.8);*/
		background: #141414;
    width: 90%;
    display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		border-radius: 1em;
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