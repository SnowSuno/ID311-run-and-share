<script>
  import { Sprint } from "~/assets/icons";
  import { Spacer } from "~/components/elements";

  let prompt;
  let visible = !window.matchMedia("(display-mode: standalone)").matches;
</script>

{#if visible}
  <main>
    <Sprint size="180"/>
    <h1>Add to home screen</h1>
    <p>to get an app-like experience</p>
    <Spacer y={80}/>
    <button on:click={() => {visible = false}}>
      Continue without installing
    </button>
  </main>
{/if}

<style>
    main {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #FFFFFF;
        z-index: 1000;
        gap: 10px;
    }

    h1 {
        font-size: 32px;
        font-weight: 700;
    }

    p {
        color: var(--dark-gray);
        font-size: 18px;
        font-weight: 500;
    }

    button {
        position: absolute;
        bottom: 0;
        background-color: var(--gray);
        color: var(--dark-gray);
        width: 100%;
        padding: 20px;
        text-align: center;
    }
</style>
