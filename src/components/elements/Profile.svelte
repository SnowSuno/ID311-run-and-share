<script lang="ts">
  import type { UserDoc } from "~/firebase/collections";
  export let user: UserDoc;
</script>

<div on:click>
    <img src={user.photoURL} alt={user.nickname}>
    <p>{user.nickname}</p>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    p {
        font-size: 12px;
    }
</style>
