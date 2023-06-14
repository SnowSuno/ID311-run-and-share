<script lang="ts">
  export let orientation: "top" | "bottom" = "top";
</script>

<div class={orientation}>
    <slot></slot>
</div>

<style>
    div {
        position: absolute;
        top: var(--header-h);
        width: 100%;
        background-color: #FFFFFF;
        border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        box-shadow: var(--shadow);
        z-index: 1;
        padding: 6px var(--inline) 22px;
    }
</style>
