<script lang="ts">
  import { signInWithPopup } from "firebase/auth";
  import { auth, googleProvider } from "~/firebase/config";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  import MainButton from "../components/elements/MainButton.svelte";
  import { Logo, Sprint } from "~/assets/icons";

  const login = () => signInWithPopup(auth, googleProvider);
  onMount(() => push("/"));
</script>

<main>
  <Sprint size={150}/>
  <Logo/>
  <MainButton float on:click={login}>Sign in with Google</MainButton>
</main>

<style>
    main {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 var(--inline) 30%;
        gap: 24px
    }
</style>
