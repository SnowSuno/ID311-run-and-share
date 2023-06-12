<script lang="ts">
    import type { UserDoc } from "~/firebase/collections";
    export let user: UserDoc;
</script>

<div class="flex flex-row p-0.5 gap-2 items-center">
    <img class="w-8 h-8 rounded-full" src={user.photoURL} alt={user.nickname}>
    <h2 class="font-sans text-[18px]/[19px] font-bold text-black">{user.nickname}</h2>
</div>
