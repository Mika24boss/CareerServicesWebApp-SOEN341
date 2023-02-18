<script>
</script>

<section>
    <div class="signup-title centerBlock" style="padding-bottom:0">
        <p style="font-size: 30px">Sign-Up as a ... </p>
    </div>
    <div class="centerBlock">
        <button class="btn-student">Student</button>
        <button class="btn-employer">Employer</button>
        <button class="btn-admin">Admin</button>

        <form>
            <p>Email: <input type="text" id="email" required></p>
            <p>Password: <input type="password" id="password" required></p>

            <div class="btn-container">
                <button class="btn-signup centerBlock" type="submit">Sign-Up</button>
                <button class="btn-back centerBlock"><a href="/">Back</a></button>
            </div>
        </form>

    </div>

</section>


<style>

    h1 {
        width: 100%;
    }

    .signup-title {
        display: block;
        position: relative;
        width: 100%;
        padding-top: 30px;
    }

    .signup-title p {
        margin: 2px;
    }

    * a:link, a:visited, a:hover {
        text-decoration: none;
    }

    .centerBlock {
        text-align: center;
        display: block;
        margin: 10px;
        font-size: 20px;
    }

    .btn-container {
        justify-content: center;
        display: flex;
        padding-top: 20px;
    }
</style>