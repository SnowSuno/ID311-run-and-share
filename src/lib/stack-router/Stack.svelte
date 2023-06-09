<script>
  import { fly } from "svelte/transition";
  import { pop } from "svelte-spa-router";
  import LeftChevron from "~/assets/icons/LeftChevron.svelte";

  export let title = "";
</script>

<main transition:fly={{x: "100%", opacity: 1}}>
    <header>
        <button on:click={pop}>
            <LeftChevron/>
        </button>
        <h1>{title}</h1>
    </header>
    <slot></slot>
</main>

<style>
    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 101;
        background-color: #FFFFFF;
        box-shadow: var(--shadow);
    }

    header {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-inline: 20px;
        height: 50px;
        gap: 12px;
    }

    button {
        display: flex;
    }

    h1 {
        font-size: 22px;
        font-weight: 600;
    }
</style>
