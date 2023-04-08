<script>
    //import Profile from '$lib/images/profile-logo.png';
    import {createEventDispatcher} from 'svelte';
    import {DateInput} from 'date-picker-svelte'


    export let name, email, id, profilePicture, CV;
    const dispatch = createEventDispatcher();
    const toggle = (e) => dispatch('toggle', {id: id, isAccepted: e.target.__value});
    const clear = () => dispatch('clear', id);
    const dateChanged = () => dispatch('dateChanged', {id: id, date: date});

    let date = new Date();
    let maxDate = new Date((date.getFullYear() + 2) + "-" + date.getMonth() + "-" + date.getDate());
    let isAccepted = "empty";
    $: date, callDateChanged();

    function clearRadio() {
        document.getElementById('decisionYes-' + id).checked = false;
        document.getElementById('decisionNo-' + id).checked = false;
        isAccepted = "empty";
        clear();
    }

    function callDateChanged() {
        if (isAccepted === "accepted") dateChanged();
    }

</script>


<div class="applicant">
    <div class="profilePic">
        <img src={"https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_960_720.png"} alt="profile-logo"/>
    </div>
    <div class="info">
        <div>{name}</div>
        <div>{email}</div>
    </div>
    <div class="resume">
        <button class="btn-resume" style='font-weight: bold;'>CV</button>
    </div>
    <div class="schedule">
        Schedule interview:
        <DateInput min="{new Date()}" max="{maxDate}" bind:value={date} disabled="{isAccepted !== 'accepted'}"
                   format="yyyy-MM-dd HH:mm"/>
    </div>
    <div class="checkboxYes">
        <label for="decisionYes-{id}">✓&nbsp;</label>
        <input type="radio" id="decisionYes-{id}" name="decision-{id}" value="accepted" on:change={toggle}
               bind:group={isAccepted}/>
    </div>
    <div class="checkboxNo">
        <label for="decisionNo-{id}">X&nbsp;</label>
        <input type="radio" id="decisionNo-{id}" name="decision-{id}" value="rejected" on:change={toggle}
               bind:group={isAccepted}/>
    </div>
    <button class="clear" on:click="{clearRadio}">
        Clear selection
    </button>
</div>


<style>

    * {
        font-family: 'Barlow', sans-serif;
        color: white;
        --date-picker-background: #1b1e27;
        --date-picker-foreground: #f7f7f7;
        --date-picker-highlight-border: #3A98B9;
    }

    .applicant {
        display: grid;
        grid-template-columns: 2fr 6fr 5fr 5fr 2fr 2fr 2fr;
        justify-items: stretch;
        align-items: center;
        background: #141414;
        outline: 1px solid gray;
        border-radius: 1em;
        padding-right: 2%;
        position: relative;
    }

    .applicant * {
        z-index: 2;
    }

    .applicant:before {
        z-index: 1;
        background: linear-gradient(to right, transparent, rgb(22, 1, 71), rgb(59, 6, 184));
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        border-radius: 1em;
        transition: width 300ms ease;
    }

    .applicant:hover:before {
        width: 100%;
        transition-duration: 600ms;
    }

    .profilePic {
        margin: auto;
        aspect-ratio: 1;
        max-height: 50px;
        max-width: 50px;
    }

    img {
        width: 100%;
        height: 100%;
        border-radius: 0.4em;
    }

    .info {
        padding: 1em 0.5em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.5em;
    }

    .resume {
        aspect-ratio: 1;
        max-height: 50px;
        max-width: 100px;
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
        justify-self: center;
        line-height: 1.6em;
    }

    .checkboxYes {
        justify-self: right;
    }

    .checkboxNo {
        justify-self: center;
    }

    input[type='radio'] {
        transform: scale(2);
    }

    .clear {
        font-size: 1em;
        color: black;
        background: #3A98B9;
        border-radius: 0.5em;
        width: 100%;
        height: 100%;
        max-height: 50px;
        max-width: 100px;
    }

</style>
