<script>
    import Profile from '$lib/images/profile-logo.png';
    import {createEventDispatcher} from 'svelte';
    import {DateInput} from 'date-picker-svelte'

    export let name, email, id, profilePicture, CV;
    const dispatch = createEventDispatcher();
    const toggle = () => dispatch('toggle', id);
    let myOptions = {
        bgColor: '#9b2c2c',
    }
    let date = new Date();

</script>


<div class='applicant'>
    <div class='profilePic'>
        <img src={Profile} alt='profile-logo'/>
    </div>
    <div class='info'>
        <p>{name}</p>
        <p>{email}</p>
    </div>
    <div class='resume'>
        <button class='btn-resume'>CV</button>
    </div>
    <div class='schedule'>
        Schedule interview:<br/><br/>
        <DateInput bind:value={date}/>
    </div>
    <div class='checkboxYes'>
        ✓
        <input type="radio" name="decision" value="accepted" on:change={toggle}/>
    </div>
    <div class='checkboxNo'>
        X
        <input type="radio" name="decision" value="rejected" on:change={toggle}/>
    </div>
</div>
<br/><br/>
<button class="submit">Submit</button>


<style>

    * {
        font-family: 'Barlow', sans-serif;
        color: white;
    }

    .applicant {
        display: grid;
        grid-template-columns: 2fr 6fr 2fr 6fr 1.5fr 1.5fr;
        justify-items: stretch;
        background: #141414;
        outline: 1px solid gray;
        border-radius: 0.5em;
    }

    .profilePic {
        padding: 1.5em;
        aspect-ratio: 1;
    }

    img {
        width: 100%;
        height: 100%;
    }

    .info {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        align-self: center;
    }

    .resume {
        padding: 1em;
        aspect-ratio: 1;
    }

    .btn-resume {
        width: 100%;
        height: 100%;
        font-size: 1.4em;
        color: black;
        background: #3A98B9;
        border-radius: 0.5em;
    }

    .schedule {
        align-self: center;
        justify-self: center;
    }

    .checkboxYes {
        align-self: center;
        justify-self: center;
    }

    .checkboxNo {
        align-self: center;
        justify-self: center;
    }

    .submit {
        color: black;
        background: #3A98B9;
        border-radius: 0.5em;
        padding: 0.5em;
    }
</style>
