<script lang="ts">
  import { clickOutside } from "~/utils/click-outside";

  export let header = false;
  export let top = false;
  export let bottom = false;
</script>

<div
  class:header class:top class:bottom
  on:outclick
  use:clickOutside
>
  <slot></slot>
</div>

<style>
    div {
        --end: 20px;

        position: fixed;
        left: 0;
        width: 100%;
        background-color: #FFFFFF;
        z-index: 200;
        /*overflow: visible;*/
    }

    .header, .top {
        padding: 0 var(--inline) var(--end);
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
        padding: var(--end) var(--inline) 0;
        box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.05);
        bottom: var(--safe-b);
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    }
</style>
