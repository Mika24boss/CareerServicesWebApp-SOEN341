<script>
    export var title, companyName, jobID, name;
    let  user;
</script>

<a class='notif-link' href="/postings/{jobID}/">
<div class='notification'>
    <div class='details'>
        <p style='font-weight: bold;'>{title} with {companyName} ({jobID})</p>
        <p>Applicant name: {name}</p>
    </div>
</div>
</a>


<style>
    *{
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    .notification {
        color: white;
        background-color: #141414;
        border-radius: 1em;
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        outline: 1px solid gray;
        position: relative;
    }

    .notification:before {
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

    .notification:hover:before {
        width: 100%;
        transition-duration: 600ms;
    }

    .details{
        width: 70%;
        height: 70%;
        margin: 1em;
    }

    .details p{
        position: relative;
    }

    a:link{
        text-decoration: none;
    }

</style>