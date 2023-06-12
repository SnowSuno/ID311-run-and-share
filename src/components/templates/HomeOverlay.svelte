<script lang="ts">
  import { friends } from "~/store";
  import { Sheet, MainButton, Profile } from "~/components/elements";
</script>

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
