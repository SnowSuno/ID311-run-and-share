<script>
  export let transition;
</script>

<main transition:transition>
  <slot></slot>
</main>

<style>
    main {
        padding: var(--safe-area);
    }
</style>
