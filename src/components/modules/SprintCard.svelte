<script lang="ts">
  import type { SprintDoc } from "~/firebase/collections";
  import type { QueryDocumentSnapshot } from "firebase/firestore";
  import { friends } from "~/store";
  import { Profile } from "~/components/elements";
  import { SprintDisplay } from "~/components/modules";

  export let sprint: QueryDocumentSnapshot<SprintDoc>;
  export let selected: string;
  let user;
  $: data = sprint?.data();
  $: user = $friends.find(user => user.id === sprint?.data().user.id);

</script>


<button
  class="scrollable-item"
  class:active={selected === sprint.id}
  on:click={() => {selected = sprint.id}}
>
  {#if user}
  <Profile user={user.data()}/>
    {/if}
  <SprintDisplay
    small
    distance={data.distance}
    time={data.time}
  />
</button>


<style>
    button {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        gap: 8px;
        width: 250px;
        background: #FFFFFF;
        box-shadow: var(--shadow);
        border-radius: 20px;
        padding: 14px 12px;
        margin-block: 5px;
    }

    button.active {
        outline: 3px solid var(--black);
        outline-offset: 2px;
        /*background: var(--black);*/
    }
</style>
