<script lang="ts">
  import { displayedRoute, friends, sprints } from "~/store";
  import { Sheet, MainButton, Profile, Spacer, AnimatedSheet } from "~/components/elements";

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


</script>

<Sheet header>
  <div class="friends">
    {#each $friends as user}
      <Profile user={user.data()} on:click={() => { selected = user.id }}/>
    {/each}
  </div>
</Sheet>

<MainButton float stack href="/plan">
  Let's Sprint
</MainButton>

{#if selected}
  {#key selected}
    <AnimatedSheet bottom on:outclick={() => {selected = null}}>
      <Profile user={$friends.find(f => f.id === selected).data()}/>
      {#if selectedSprint}
        time: {selectedSprint.time}
        {selectedSprint.level}
      {:else}
        no data
      {/if}
      <Spacer y="200"/>
    </AnimatedSheet>
  {/key}
{/if}

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
