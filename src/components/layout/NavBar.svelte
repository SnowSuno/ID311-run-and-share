<script lang="ts">
  import { link } from "svelte-spa-router";
  import active from "svelte-spa-router/active";

  import { Sprint, Leaderboard, User } from "~/assets/icons";
</script>

<nav>
    <a href="/" use:link use:active>
        <Sprint/>
    </a>
    <a href="/leaderboard" use:link use:active>
        <Leaderboard/>
    </a>
    <a href="/settings" use:link use:active>
        <User/>
    </a>
</nav>

<style>
    nav {
        position: fixed;
        bottom: 0;
        left: 0;
        padding-bottom: var(--safe-b);
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        box-shadow: var(--shadow);
        height: calc(64px + var(--safe-b));

        display: flex;
        flex-direction: row;
        width: 100%;
        background-color: #fff;
        z-index: 100;
    }

    a {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.3;
    }

    :global(a.active) {
        opacity: 1;
    }

    svg {
        width: 2rem;
        height: 2rem;
        fill: red;
    }
</style>
