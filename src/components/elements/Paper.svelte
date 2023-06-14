<script>
  export let flex = false;
  export let small = false;

</script>

<div class:flex class:small>
  <slot></slot>
</div>

<style>
    div {
        background-color: var(--gray);
        border-radius: var(--radius-md);
        padding: 24px;
    }

    div.flex {
        display: flex;
        flex-direction: row;
    }

    div.small {
        padding: 12px;
    }
</style>
