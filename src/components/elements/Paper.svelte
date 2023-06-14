<script>
  export let flex = false;

</script>

<div class:flex>
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
</style>
