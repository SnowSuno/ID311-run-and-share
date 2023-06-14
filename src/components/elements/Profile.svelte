<script lang="ts">
  import type { UserDoc } from "~/firebase/collections";

  export let user: UserDoc;
</script>

<div>
  <img src={user.photoURL} alt={user.nickname}>
  <p><span>{user.nickname}</span>'s sprint</p>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

    p {
        font-size: 16px;
        font-weight: 600;
        color: var(--dark-gray);
    }

    p > span {
        color: var(--black);
    }
</style>
