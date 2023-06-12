<script lang="ts">
  import { location } from "svelte-spa-router";

  const tabNames = {
    "/": "Sprint",
    "/leaderboard": "Leaderboard",
    "/settings": "Settings",
  };

  $: tabName = tabNames[$location];

</script>

<header>
    <h1>{tabName}</h1>
</header>

<style>
    header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;

        height: var(--header-h);
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 24px;
        width: 100%;
        background-color: #FFFFFF;
    }

    h1 {
        font-size: 32px;
        font-weight: 800;
    }
</style>
