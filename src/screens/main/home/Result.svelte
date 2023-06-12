<script lang="ts">
  import { sprint, sprintActions } from "~/store/sprint";
  import { MainButton } from "~/components/elements";
  import { pop } from "svelte-spa-router";
  import { get } from "svelte/store";
  import { onMount } from "svelte";

  let sprintResult;
  onMount(() => {
    sprintResult = get(sprint);
    sprintActions.reset();
  });


</script>


<MainButton float on:click={() => pop()}>
  Return to home
</MainButton>
