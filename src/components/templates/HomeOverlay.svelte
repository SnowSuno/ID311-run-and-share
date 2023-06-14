<script lang="ts">
  import { displayedRoute, friends, sprints } from "~/store";
  import { Sheet, MainButton, SmallProfile, AnimatedSheet, Profile } from "~/components/elements";
  import { SprintDisplay } from "~/components/modules";

  // import { doc, query, where, limit, orderBy, getDocs } from "firebase/firestore";
  // import { sprintsRef, usersRef } from "~/firebase/collections";
  // import { selectedPath } from "~/store/selectRoute";

  let selected = null;

  // $: if (selected) {
  //   getDocs(query(
  //     sprintsRef,
  //     where("user", "==", doc(usersRef, selected)),
  //     orderBy("createdAt", "desc"),
  //     limit(1),
  //   )).then(q => q.forEach(sprint => console.log(sprint.id)));
  // }
  $: selectedSprint = $sprints
    .find(sprint => sprint.data().user.id === selected)
    ?.data();

  $: displayedRoute.set(selectedSprint?.route || null);

  $: selectedUser = $friends.find(f => f.id === selected)?.data();
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
    <AnimatedSheet bottom on:outclick={() => {selected = null}}>
      <div class="sheet-container">
        <Profile user={selectedUser}/>
        <SprintDisplay
          distance={selectedSprint.distance}
          time={selectedSprint.time}
        />
        <MainButton>
          Follow {selectedUser.nickname}'s sprint
        </MainButton>
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
</style>
