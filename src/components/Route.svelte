<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let user;
    export let distance;
    export let time;
    export let intensity;
</script>