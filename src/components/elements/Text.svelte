<script lang="ts">
  export let heading;
  export let subheading;

</script>

<p class:heading class:subheading>
  <slot></slot>
</p>

<style>
    .heading {
        font-size: 22px;
        font-weight: 600;
        color: #000;
    }

    .subheading {
        font-size: 14px;
        font-weight: 400;
        color: #777;
    }

</style>
