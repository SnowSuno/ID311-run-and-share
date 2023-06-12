<script lang="ts">
  import { doc, setDoc } from "firebase/firestore";

  import { auth as fireAuth } from "~/firebase/config";
  import { auth } from "~/store/auth";
  import { usersRef } from "~/firebase/collections";
  import Stack from "~/lib/stack-router/Stack.svelte";
  import { signOut } from "firebase/auth";

  let nickname = $auth.displayName;
  let submitted = false;
  const register = () => {
    setDoc(
      doc(usersRef, $auth.uid),
      {
        nickname,
        photoURL: $auth.photoURL,
      },
    ).catch(alert);
    submitted = true;
    console.log("clicked")
  }


</script>

<Stack back={() => signOut(fireAuth)}>
    <h1>Register</h1>
    <input type="text" bind:value={nickname}>
    <button on:click={register} disabled={!nickname || submitted}>Register</button>
</Stack>

<style>
    button {
        background: #000;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
    }

    button:disabled {
        opacity: 0.5;
    }
</style>
