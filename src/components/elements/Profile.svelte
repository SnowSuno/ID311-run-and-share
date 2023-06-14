<script lang="ts">
  import type { UserDoc } from "~/firebase/collections";
  export let user: UserDoc;
  export let selected: boolean;
</script>

<div on:click class:selected>
    <img src={user.photoURL} alt={user.nickname}>
    <p>{user.nickname}</p>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 7px;
        overflow: visible;
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .selected img {
        outline: 3px solid var(--black);
        outline-offset: 2px;
    }

    p {
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        width: 50px;
        text-align: center;
        text-overflow: ellipsis;
        font-weight: 400;
    }

    .selected p {
        font-weight: 600;
    }
</style>
