<script lang="ts">
  import { signInWithPopup } from "firebase/auth";
  import { auth, googleProvider } from "~/utils/firebase.js";

  const login = () => signInWithPopup(auth, googleProvider);
</script>

<main>
    <button on:click={login}>Sign in</button>
</main>
