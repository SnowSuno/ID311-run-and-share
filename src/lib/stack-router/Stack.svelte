<script>
  import { fly } from "svelte/transition";
  import { pop } from "svelte-spa-router";

  import LeftChevron from "~/assets/icons/LeftChevron.svelte";

  import { duration } from "~/lib/stack-router/constants";

  export let title = "";
  export let back = pop;
</script>

<main transition:fly|local={{x: "100%", opacity: 1, duration}}>
  <header>
    <button on:click={back}>
      <LeftChevron/>
    </button>
    <h1>{title}</h1>
  </header>
<!--  <main>-->
    <slot></slot>
<!--  </main>-->
</main>

<style>
    main {
        --bottom: var(--safe-b);

        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 500;
        background-color: #FFFFFF;
        box-shadow: var(--shadow);

        padding: var(--safe-area);
        overflow-y: scroll;
    }

    header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-inline: 20px;
        height: var(--header-h);
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
