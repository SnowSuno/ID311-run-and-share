<script lang="ts">
  import { auth } from "~/firebase/config";
  import { signOut } from "firebase/auth";
</script>

<main>
    <button on:click={() => signOut(auth)}>Sign out</button>
</main>

<style>
    main {
        padding: var(--header-h) 0 0;
    }
</style>
