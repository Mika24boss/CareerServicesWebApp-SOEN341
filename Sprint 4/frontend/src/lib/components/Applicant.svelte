<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { DateInput } from 'date-picker-svelte';

	export let name, email, id, profilePicURL, resumeURL, zIndexSchedule;
	const dispatch = createEventDispatcher();
	const toggle = (e) => dispatch('toggle', { id: id, isAccepted: e.target.__value });
	const clear = () => dispatch('clear', id);
	const dateChanged = () => dispatch('dateChanged', { id: id, date: date });

	let date = new Date();
	let maxDate = new Date((date.getFullYear() + 2) + '-' + date.getMonth() + '-' + date.getDate());
	let isAccepted = 'empty';
	$: date, callDateChanged();

	onMount(() => {
		document.getElementById('schedule-' + id).style.zIndex = zIndexSchedule;
	});

	function clearRadio() {
		document.getElementById('decisionYes-' + id).checked = false;
		document.getElementById('decisionNo-' + id).checked = false;
		isAccepted = 'empty';
		clear();
	}

	function callDateChanged() {
		if (isAccepted === 'accepted') dateChanged();
	}

</script>


<div class='applicant'>
	<div class='profilePic'>
		<img src={profilePicURL} alt='profile-logo' />
	</div>
	<div class='info'>
		<div>{name}</div>
		<div>{email}</div>
	</div>
	<div class='resume'>
		{#if resumeURL}
			<a href={resumeURL} target='_blank'>
				<button class='btn-resume' style='font-weight: bold;'>CV</button>
			</a>
		{:else}
			<button class='btn-resume' style='font-weight: bold;'>No CV</button>
		{/if}
	</div>
	<div class='schedule' id='schedule-{id}'>
		Schedule interview:
		<DateInput min='{new Date()}' max='{maxDate}' bind:value={date} disabled="{isAccepted !== 'accepted'}"
							 format='yyyy-MM-dd HH:mm'/>
	</div>
	<div class='checkboxYes'>
<!--		<label for='decisionYes-{id}'>✓&nbsp;</label>-->
		<input type='radio' id='decisionYes-{id}' name='decision-{id}' value='accepted' on:change={toggle}
					 bind:group={isAccepted} />
		<div class='plus1'>
			<div class='plus2'></div>
		</div>
	</div>

	<div class='checkboxNo'>
<!--		<label for='decisionNo-{id}'>X&nbsp;</label>-->
		<input type='radio' id='decisionNo-{id}' name='decision-{id}' value='rejected' on:change={toggle}
					 bind:group={isAccepted} />
		<div class='plus1'>
			<div class='plus2'></div>
		</div>
	</div>
	<button class='clear' on:click='{clearRadio}'>
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
        min-width: 800px;
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
        padding-left: 0.5em;
        margin: auto;
        aspect-ratio: 1;
        max-height: 50px;
        max-width: 50px;
    }

    img {
        width: 100%;
        height: 100%;
        border-radius: 0.4em;
		object-fit: cover;
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

    .btn-resume:hover {
        cursor: pointer;
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

    .clear button {
        font-size: 1em;
        color: black;
        background: #3A98B9;
        border-radius: 0.5em;
        width: 100%;
        height: 100%;
        max-height: 50px;
        max-width: 1100px;
    }

    .clear:hover {
        cursor: pointer;
    }

    .btn-resume, .clear {
        display: inline-block;
        font-size: 16px;
        font-weight: 700;
        color: white;
        border: 3px solid #3A98B9;
        cursor: pointer;
        position: relative;
        background-color: transparent;
        text-decoration: none;
        overflow: hidden;
        z-index: 1;
        font-family: inherit;
        border-radius: 1em;
    }

    .btn-resume::before, .clear::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #3A98B9;
        transform: translateX(-100%);
        transition: all .3s;
        z-index: -1;
    }

    .btn-resume:hover::before, .clear:hover::before {
        transform: translateX(0);
    }

    .checkboxYes, .checkboxNo {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .checkboxYes input, .checkboxNo input {
        appearance: none;
        width: 0.9em;
        height: 0.9em;
        background-color: #171717;
        box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
        border-radius: 5px;
        transition: .4s ease-in-out;
        outline: darkgray solid 1px;
    }

		.checkboxYes input{
        box-shadow: inset 2px 5px 10px mediumseagreen;
        outline: mediumseagreen solid 1px;
		}

    .checkboxNo input{
        box-shadow: inset 2px 5px 10px #C21807;
        outline: #C21807 solid 1px;
    }

    .checkboxYes input:hover, .checkboxNo input:hover {
        scale: 1.2;
        cursor: pointer;
        box-shadow: none;
    }

    .checkboxYes .plus1 {
        position: relative;
        top: 0.3em;
        left: -19.5px;
        width: 0.7em;
        height: 0.2em;
        background-color: mediumseagreen;
        rotate: 45deg;
        scale: 0;
        border-radius: 5px;
        transition: .4s ease-in-out;
    }

    .checkboxYes .plus2 {
        position: relative;
				top: 0.51em;
				right: 0.32em;
        width: 1.1em;
        height: 0.2em;
        background-color: mediumseagreen;
        transform: rotate(75deg);
        border-radius: 5px;
        transition: .4s ease-in-out;
    }

    .checkboxNo .plus1 {
        position: relative;
				top: 0.08em;
        left: -19.1px;
        width: 1.3em;
        height: 0.2em;
        background-color: #C21807;
        rotate: 45deg;
        scale: 0;
        border-radius: 5px;
        transition: .4s ease-in-out;
    }

    .checkboxNo .plus2 {
        position: relative;
        width: 1.3em;
        height: 0.2em;
        background-color: #C21807;
        transform: rotate(90deg);
        border-radius: 5px;
        transition: .4s ease-in-out;
    }

    .checkboxYes input:checked, .checkboxNo input:checked {
        box-shadow: none;
    }

    .checkboxYes input:checked + .plus1 {
        transform: rotate(180deg);
        scale: 1;
    }

    .checkboxNo input:checked + .plus1 {
        transform: rotate(180deg);
        scale: 1;
    }

    label{
        position: relative;
        left: -0.5em;
    }

</style>
