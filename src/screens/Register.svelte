<script lang="ts">
  import { doc, setDoc } from "firebase/firestore";

  import { auth as fireAuth } from "~/firebase/config";
  import { auth } from "~/store/auth";
  import { usersRef } from "~/firebase/collections";
  import Stack from "~/lib/stack-router/Stack.svelte";
  import { signOut } from "firebase/auth";
  import { MainButton, Spacer, Text } from "~/components/elements";

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
    console.log("clicked");
  };


</script>

<Stack back={() => signOut(fireAuth)}>
  <h1>Register</h1>
  <Spacer y={10}/>
  <Text subheading>Enter a nickname</Text>
  <input type="text" placeholder="Enter nickname" bind:value={nickname} max="10">
  <MainButton
    float
    on:click={() => !!nickname && !submitted && register()}
    disabled={!nickname || submitted}
  >
    Register
  </MainButton>
</Stack>

<style>

    input {
        margin-top: 10px;
        height: fit-content;
        width: 100%;
        border: none;
        border-bottom: 3px solid #000000;
        font-size: 32px;
        font-weight: 400;
        color: #151515;

        padding-left: 4px;
        padding-bottom: 2px;
    }

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
