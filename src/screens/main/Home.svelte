<script lang="ts">
  import StackRouter from "~/lib/stack-router";
  //
  import { routes } from "./home/routes";
  import FullScreenMap from "~/components/FullScreenMap.svelte";
  //
  import { sprint } from "~/store/sprint";

  import { HomeOverlay, SprintOverlay } from "~/components/templates";
</script>

<FullScreenMap route={$sprint?.route}/>
{#if $sprint === null}
  <HomeOverlay/>
{:else}
  <SprintOverlay/>
{/if}

<StackRouter {routes}/>

