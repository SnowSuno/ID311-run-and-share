<script lang="ts">
    import { fade } from "svelte/transition";

    import { Sprint, Logo } from "~/assets/icons";
</script>

<main out:fade={{duration: 200}}>
    <Sprint size={150}/>
    <Logo/>
</main>

<style>
    main {
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #FFFFFF;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 24px;

        padding-bottom: 40px;
    }

    h1 {
        text-align: center;
        font-size: 3rem;
        margin-top: 50%;
    }
</style>
