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
        background: rgb(15, 27, 27);
        background: radial-gradient(circle, rgba(15, 27, 27, 1) 13%, rgba(15, 15, 25, 1) 62%, rgba(0, 0, 0, 1) 88%);
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
    }

</style>
