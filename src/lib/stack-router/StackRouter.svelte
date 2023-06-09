<script lang="ts">
  import { SvelteComponent } from "svelte";
  import { querystring } from "svelte-spa-router";

  import Stack from "./Stack.svelte";

  $: stack = "/" + new URLSearchParams($querystring).get("stack");

  type Route =
    | typeof SvelteComponent
    | { component: typeof SvelteComponent, title?: string };

  export let routes: Record<string, Route> = {};

  const normalize = (route: Route) => (
    "component" in route
      ? route
      : { component: route }
  ) as { component: typeof SvelteComponent, title?: string };

  $: renderedEntries = Object
    .entries(routes)
    .map(([path, route]) => ({ path, route: normalize(route) }))
    .filter(entry => stack?.startsWith(entry.path));
</script>

{#each renderedEntries as entry (entry.path)}
    <Stack title={entry.route.title || ""}>
        <svelte:component this={entry.route.component}/>
    </Stack>
{/each}
