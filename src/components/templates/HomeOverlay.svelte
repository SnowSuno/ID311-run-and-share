<script lang="ts">
  import { displayedRoute, friends, sprints, time } from "~/store";
  import { Sheet, MainButton, SmallProfile, AnimatedSheet, Profile, Paper, Flex, Scroll } from "~/components/elements";
  import { SprintDisplay } from "~/components/modules";
  import { formatElapsedTime } from "~/utils/time";
  import { selectedRoute } from "~/store/selectedRoute";
  import { push } from "~/lib/stack-router";
  import { notify } from "~/utils/notification";

  let selected = null;

  $: selectedSprint = $sprints
    .find(sprint => sprint.data().user.id === selected)
    ?.data();

  $: displayedRoute.set(selectedSprint?.route || null);

  $: selectedUser = $friends.find(f => f.id === selected)?.data();

  const close = () => {
    selected = null;
  };

  const follow = () => {
    selectedRoute.set(selectedSprint);
    push("/plan");
  }
</script>

<Sheet header>
  <Scroll>
    {#each $friends as user}
      <SmallProfile
        user={user.data()}
        selected={selected === user.id}
        on:click={() => { selected = user.id }}
      />
    {/each}
  </Scroll>
</Sheet>

<MainButton float stack href="/plan">
  Let's Sprint
</MainButton>

{#if selected}
  {#key selected}
    <AnimatedSheet bottom on:outclick={close}>
      <Flex>
        <div class="sprint-profile">
          <Profile user={selectedUser}/>
          {#if selectedSprint}
            <p>{formatElapsedTime(selectedSprint.createdAt, $time)}</p>
          {/if}
        </div>
        {#if selectedSprint}
          <SprintDisplay
            distance={selectedSprint.distance}
            time={selectedSprint.time}
          />
          <MainButton on:click={follow}>
            Follow {selectedUser.nickname}'s sprint
          </MainButton>
        {:else}
          <Paper>
            <p class="msg">No sprint yet</p>
          </Paper>
          <MainButton on:click={() => {
            notify("Poked " + selectedUser.nickname + " to sprint");
          }}>
            Poke {selectedUser.nickname} to sprint
          </MainButton>
        {/if}
      </Flex>
    </AnimatedSheet>
  {/key}
{/if}

<style>

    .sprint-profile {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .sprint-profile > p:before {
        content: "·";
        padding-inline: 8px;
    }

    .sprint-profile > p {
        font-size: 14px;
        color: #adadad;
        font-weight: 500;
    }

    .msg {
        width: 100%;
        text-align: center;
        color: var(--dark-gray);
        font-weight: 500;
    }
</style>
