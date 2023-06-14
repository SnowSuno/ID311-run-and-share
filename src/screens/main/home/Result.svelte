<script lang="ts">
  import { sprint, sprintActions, type SprintState } from "~/store/sprint";
  import { Flex, MainButton, RouteDisplay, Text } from "~/components/elements";
  import { pop } from "svelte-spa-router";
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import { SprintDisplay } from "~/components/modules";

  let res: SprintState = get(sprint);
  if (!res) pop();

  onMount(sprintActions.reset);
</script>

{#if res}
  <Flex>
    <Text heading>My daily sprint</Text>
    <Text subheading>{res.endTime.toLocaleDateString('en-US',
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
    <RouteDisplay route={res.route}/>
    <SprintDisplay
      distance={res.distance}
      time={res.endTime.getTime() - res.startTime.getTime()}
    />
  </Flex>
{/if}
<MainButton float on:click={() => pop()}>
  Return to home
</MainButton>
