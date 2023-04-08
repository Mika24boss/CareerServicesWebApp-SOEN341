<script>
    import Zoom from '$lib/images/zoom.png';

    export var title, companyName, jobID, interviewDate;
    let user;

    function formatInterviewDate() {
        return interviewDate.toLocaleDateString([], {year: 'numeric', month: 'long', day: 'numeric'}) +
            ' at ' + interviewDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }
</script>


<div class='interview' id='jobID'>
    <div class='details'>
        <p style='font-weight: bold'>{title} with {companyName} ({jobID})</p>
        <p>{formatInterviewDate()}</p>
    </div>
    <div class='platform'>
        <img src={Zoom} alt='zoom_image'/>
    </div>
</div>


<style>

    * {
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
        outline: 1px solid gray;
        position: relative;
    }

    .interview:before {
        background: linear-gradient(to right, transparent, rgb(1, 49, 64), rgb(2, 128, 166));
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        border-radius: 1em;
        transition: width 300ms ease;
    }

    .interview:hover:before {
        width: 100%;
        transition-duration: 600ms;
    }

    .details {
        width: 70%;
        height: 70%;
        margin: 1em;
    }

    .details p {
        position: relative;
    }

    .platform {
        position: relative;
        width: 30%;
        align-self: center;
    }

    img {
        justify-self: right;
        position: relative;
        width: 3em;
        height: 3em;
    }

</style>