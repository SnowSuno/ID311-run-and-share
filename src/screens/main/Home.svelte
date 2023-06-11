<script lang="ts">
  import StackRouter, { stackLink } from "~/lib/stack-router";

  import { routes } from "./home/routes";
  import FullScreenMap from "~/components/FullScreenMap.svelte";
  import { Sheet } from "../../components/elements";

  import { friends } from "~/store";
  import Profile from "../../components/elements/Profile.svelte";


</script>

<Sheet>
    <div class="friends">
        {#each $friends as user}
            <Profile {user}/>
        {/each}
    </div>
</Sheet>
<FullScreenMap/>
<a href="/plan" use:stackLink>Let's Sprint</a>
<StackRouter {routes}/>

<style>
    a {
        position: absolute;
        bottom: 100px;
    }

    .friends {
        display: flex;
        flex-direction: row;
        gap: 12px;
        margin-inline: -24px;
        padding-inline: 24px;

        overflow-x: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .friends::-webkit-scrollbar {
        display: none;
    }
</style>
