<script lang="ts">
  import { fly } from "svelte/transition";
  import { duration } from "~/lib/stack-router/constants";
  import { clickOutside } from "~/utils/click-outside";

  export let header = false;
  export let top = false;
  export let bottom = false;
</script>

<div
  class:header class:top class:bottom
  transition:fly={{y: "110%", opacity: 1, duration}}
  on:outclick
  use:clickOutside
>
  <slot></slot>
</div>

<style>
    div {
        position: fixed;
        left: 0;
        width: 100%;
        background-color: #FFFFFF;
        z-index: 200;
    }

    .header, .top {
        padding: 6px var(--inline) 22px;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);
        border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    }

    .header {
        top: var(--header-h);
    }

    .top {
        top: 0;
    }

    .bottom {
        padding: 22px var(--inline) 6px;
        box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.05);
        bottom: var(--safe-b);
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    }
</style>
