<script>
  export let gap = 14;
</script>

<div style="gap: {gap}px;">
  <slot></slot>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
    }
</style>
