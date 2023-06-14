<script lang="ts">
  import { displayedRoute, friends, sprints, time } from "~/store";
  import { Sheet, MainButton, SmallProfile, AnimatedSheet, Profile, Paper } from "~/components/elements";
  import { SprintDisplay } from "~/components/modules";
  import { formatElapsedTime } from "~/utils/time";
  let selected = null;

  $: selectedSprint = $sprints
    .find(sprint => sprint.data().user.id === selected)
    ?.data();

  $: displayedRoute.set(selectedSprint?.route || null);

  $: selectedUser = $friends.find(f => f.id === selected)?.data();

  const close = () => {
    selected = null;
  };
</script>

<Sheet header>
  <div class="friends">
    {#each $friends as user}
      <SmallProfile
        user={user.data()}
        selected={selected === user.id}
        on:click={() => { selected = user.id }}
      />
    {/each}
  </div>
</Sheet>

<MainButton float stack href="/plan">
  Let's Sprint
</MainButton>

{#if selected}
  {#key selected}
    <AnimatedSheet bottom on:outclick={close}>
      <div class="sheet-container">
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
          <MainButton>
            Follow {selectedUser.nickname}'s sprint
          </MainButton>
        {:else}
          <Paper>
            <p class="msg">No sprint yet</p>
          </Paper>
          <MainButton on:click={close}>
            Poke {selectedUser.nickname} to sprint
          </MainButton>
        {/if}
      </div>
    </AnimatedSheet>
  {/key}
{/if}

<style>
    .friends {
        display: flex;
        flex-direction: row;
        gap: 12px;
        margin-inline: calc(-1 * var(--inline));
        padding: 5px var(--inline) 0;

        overflow-x: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .friends::-webkit-scrollbar {
        display: none;
    }

    .sheet-container {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

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
