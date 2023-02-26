<script>
    /** @type {import('./$types').PageData} */
    export let data;
    //jobTitle, companyName, location, jobID, jobDesc
</script>

<div class="title">
    <div class="topInfo">
        <h1>{data.jobTitle} (#{data.jobID})</h1>
        <h2>{data.companyName}</h2>
        <h3>{data.location}</h3>
    </div>
    <button class="apply">
        <b style='color: black'>Apply</b>
    </button>
</div>

<div class="desc">
    <p>
        {@html data.jobDesc}
    </p>
</div>

<style>
    *{
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    h2 {
        line-height: 1em;
    }

    .title {
        display: flex;
        justify-content: space-between;
    }

    .apply {
        width: 10em;
        height: 5em;
        font-size: 1.1em;
        margin-top: 1.5em;
    }

    .desc {
        outline: solid;
        padding: 1em;
    }
</style>