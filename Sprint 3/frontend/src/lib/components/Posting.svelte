<script>
    export var title, companyName, location, jobID;

    var applyText = "Apply";

    function apply(e) {
        applyText = "Applied!";
        document.getElementById(jobID).style.background = "linear-gradient(180deg, lightgreen, mediumslateblue)";
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
            <a href="/postings/{jobID}/">
                <b>{title}</b><br/>
                {companyName}
            </a>
        </div>
        <div class="location">
            {location}
        </div>
    </div>
</div>

<style>

    *{
        font-family: 'Barlow', sans-serif;
    }

    .gradient {
        background-image: linear-gradient(135deg, blue, darkblue);
        font-size: 1.1em;
    }

    .posting {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        justify-items: stretch;
        margin: 0.3em;
        background-image: linear-gradient(135deg, darkgray, darkslateblue);

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
        color: mediumblue;
    }

    .title {
        line-height: calc(var(--line-height) / 2);
        padding: 1em;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .location {
        padding: 1em;
        text-align: center;
        line-height: var(--line-height);

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>
