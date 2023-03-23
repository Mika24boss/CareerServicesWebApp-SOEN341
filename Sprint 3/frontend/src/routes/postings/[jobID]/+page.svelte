<script>
    export let data;

</script>

<div class="title">
    <div class="topInfo">
        <h1>{data.title} (#{data.jobID})</h1>
        <h2>{data.companyName}</h2>
        <h3>{data.location}</h3>
    </div>
    <button class="apply">
        <b style='color: black'>Apply</b>
    </button>
</div>

<div class="desc">
    <pre>{@html data.description}</pre>
</div>

<style>
    * {
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
        width: 8em;
        height: 4em;
        background: #3A98B9;
        font-size: 1.1em;
        margin-top: 1.5em;
        border-radius: 0.5em;
    }

    .desc {
        width: 85%;
        padding: 1em;
        background: #141414;
        border-radius: 1em;
    }
</style>