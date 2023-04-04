<script>
    import Header from '../lib/components/Header.svelte';
    import './styles.css';
    import "@fontsource/barlow";
</script>

<div class="app">
    <Header/>

    <main>
        <slot/>
    </main>

</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1em;
        width: 100%;
        margin: 3em auto 0;
        box-sizing: border-box;
    }

</style>
