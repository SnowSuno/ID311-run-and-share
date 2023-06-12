<script lang="ts">
  import { auth, user } from "~/store";
  import { Main, Splash, Login, Register } from "~/screens";
  import BottomSheet from "./components/elements/BottomSheet.svelte";


  let loading = true;
  setTimeout(() => { loading = false; }, 1000);
</script>

{#if loading || $auth === undefined || $user === undefined}
    <Splash/>
{:else if $auth === null}
    <Login/>
{:else if !$user}
    <Register/>
{:else}
    <Main/>
{/if}

<!--<BottomSheet open={true}>-->
<!--    <div>-->
<!--    qwerqwiejrowiqjefo-->
<!--    </div>-->
<!--</BottomSheet>-->

<!--<style>-->
<!--    div {-->
<!--        height: 400px-->
<!--    }-->
<!--</style>-->
