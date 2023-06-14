<script lang="ts">
  import { link } from "svelte-spa-router";
  import { stackLink } from "~/lib/stack-router";

  export let href: string = null;
  export let float;
  export let secondary: boolean = false;
  export let stack: boolean = false;
  $: action = href
    ? (stack ? stackLink : link)
    : () => {};
</script>

<a
  {href}
  on:click
  class:secondary
  use:action
  class:float
>
  <slot></slot>
</a>

<style>
    a {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;

        background: #000;

        color: #FFF;
        font-weight: 500;
        font-size: 18px;
        text-decoration: none;

        border-radius: var(--radius-md);
        transition: background .3s ease;
    }
    .float {
        width: calc(100% - var(--inline) * 2);
        position: fixed;
        z-index: 102;
        bottom: var(--bottom);
        margin-bottom: 14px;

    }
</style>
