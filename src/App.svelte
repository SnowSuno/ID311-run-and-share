<script lang="ts">
  import { auth, user, location } from "~/store";
  import { Main, Splash, Login, Register } from "~/screens";
  import { InstallPrompt } from "~/components/modules";
  // import BottomSheet from "./components/elements/BottomSheet.svelte";

  let loading = true;
  setTimeout(() => { loading = false; }, 1000);
</script>

{#if loading
|| $auth === undefined
|| $user === undefined
|| $location === undefined
}
  <Splash/>
{:else if $auth === null}
  <Login/>
{:else if !$user}
  <Register/>
{:else}
  <Main/>
{/if}
<InstallPrompt/>
