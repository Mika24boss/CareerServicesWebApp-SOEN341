<script>
    export var jobTitle, companyName, location, jobID;

    var applyText = "Apply";

    function apply(e) {
        applyText = "Applied!";
        console.log(e);
        document.getElementById(jobID).style.background = "linear-gradient(180deg, red, darkgreen)";
    }

</script>
<div class="gradient" id={jobID}>
    <div class="posting">
        <div class="apply-button">
            <button on:click={apply}>
                {applyText}
            </button>
        </div>
        <div class="title">
            <a href="">
                {jobTitle}<br/>
                {companyName}
            </a>
        </div>
        <div class="location">
            {location}
        </div>
    </div>
</div>

<style>

    :root {
        font-size: 1.3em;
    }
    .gradient {
        background-image: linear-gradient(135deg, blue, darkblue);
    }

    .posting {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        justify-items: stretch;
        margin: 0.3em;
        background-image: linear-gradient(135deg, lightblue, turquoise);

        --line-height: 3em;
    }

    .apply-button {
        padding: 0.5em;
    }

    button {
        width: 100%;
        height: 100%;
        font-size: 1em;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    a:hover {
        text-decoration: underline;
        color: blue;
    }

    .title {
        line-height: calc(var(--line-height) / 2);
        padding: 1em;
    }

    .location {
        padding: 1em;
        text-align: center;
        line-height: var(--line-height);
    }

</style>
