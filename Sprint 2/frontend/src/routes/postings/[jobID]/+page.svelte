<script>
    /** @type {import('./$types').PageData} */
    export let data;
    //jobTitle, companyName, location, jobID, jobDesc
</script>

<h1>{data.jobTitle} (#{data.jobID})</h1>
<h2>{data.companyName}</h2>
<h3>{data.location}</h3>
<div>
    <p>
        {@html data.jobDesc}
    </p>
</div>

<style>
</style>