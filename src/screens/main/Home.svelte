<script lang="ts">
  import StackRouter, { push } from "~/lib/stack-router";

  import { routes } from "./home/routes";
  import FullScreenMap from "~/components/FullScreenMap.svelte";
  import { MainButton, Sheet, Spacer, Text } from "~/components/elements";

  import { friends } from "~/store";
  import Profile from "../../components/elements/Profile.svelte";

  import { route, recording } from "~/store/route";

  const stop = () => push("/result").then(() => {
    recording.set(false);
    route.set([]);
  });


</script>

<FullScreenMap route={$route}/>
{#if $recording}
  <Sheet top>
    <Spacer y={20}/>
    <Text heading>Daily Sprint</Text>
  </Sheet>
  <Sheet bottom>
    <Spacer y={160}/>
    <MainButton on:click={stop}>
      Stop
    </MainButton>
  </Sheet>
{:else}
  <Sheet header>
    <div class="friends">
      {#each $friends as user}
        <Profile {user}/>
      {/each}
    </div>
  </Sheet>
  <MainButton float stack href="/plan">
    Let's Sprint
  </MainButton>
{/if}

<StackRouter {routes}/>

<style>
    .friends {
        display: flex;
        flex-direction: row;
        gap: 12px;
        margin-inline: calc(-1 * var(--inline));
        padding-inline: var(--inline);

        overflow-x: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .friends::-webkit-scrollbar {
        display: none;
    }
</style>
