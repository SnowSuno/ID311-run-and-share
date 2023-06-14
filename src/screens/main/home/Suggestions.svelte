<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { location } from "~/store/location";
  import userIcon from "~/assets/icons/userIcon.svg";
  import { writableArray } from "~/store/suggestRoute";
  import { selectedRoute } from "~/store/selectedRoute";
  import { stackLink } from "~/lib/stack-router";
  import { pop } from "svelte-spa-router";
  import { displayedRoute, filteredSprints, friends, sprints } from "~/store";
  import FullScreenMap from "~/components/FullScreenMap.svelte";
  import MainButton from "~/components/elements/MainButton.svelte";
  import { SprintCard } from "~/components/modules";
  import { Scroll, Sheet, Text } from "~/components/elements";

  let selected: string | null = null;

  onMount(() => displayedRoute.set(null));

  $: if (selected) displayedRoute.set($sprints
    .find((s) => s.id === selected)
    .data().route
  );
  const select = () => {
    if (!selected) return;
    selectedRoute
      .set($sprints.find((s) => s.id === selected).data());
    pop();
  };
</script>


<main>
  <Sheet header>
  </Sheet>
  <FullScreenMap id="suggestion" route={$selectedRoute?.route}/>

  <div class="routes">
    <Scroll>
      {#each $filteredSprints as sprint}
        <SprintCard {sprint} bind:selected={selected}/>
      {/each}
    </Scroll>
  </div>

  <MainButton float disabled={!selected} on:click={select}>
    Select
  </MainButton>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
    }

    .routes {
        position: fixed;
        bottom: calc(var(--safe-b) + 80px);
        width: 100%;
    }

</style>
