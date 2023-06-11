<script lang="ts">
  import { signInWithPopup } from "firebase/auth";
  import { auth, googleProvider } from "~/firebase/config";
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";

  const login = () => signInWithPopup(auth, googleProvider);
  onMount(() => push("/"));
</script>

<main>
    <button on:click={login}>Sign in</button>
</main>
