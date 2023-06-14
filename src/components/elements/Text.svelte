<script lang="ts">
  export let heading = false;
  export let subheading = false;

</script>

<p class:heading class:subheading>
  <slot></slot>
</p>

<style>
    .heading {
        font-size: 24px;
        font-weight: 600;
        color: var(--black);
        padding-bottom: 6px;
    }

    .subheading {
        font-size: 14px;
        font-weight: 500;
        color: var(--dark-gray);
    }

</style>
