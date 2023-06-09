<script lang="ts">
  import { user } from "~/store/auth";
  import { Main, Splash, Login } from "~/screens";

  let loading = true;
  setTimeout(() => { loading = false; }, 2000);
</script>

{#if loading || $user === undefined}
    <Splash/>
{:else if $user === null}
    <Login/>
{:else}
    <Main/>
{/if}
