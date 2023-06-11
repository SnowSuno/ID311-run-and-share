<script lang="ts">
  import Router from "svelte-spa-router";
  import { routes } from "./main/routes";
  import { Header, NavBar } from "~/components/layout";
  import { Sheet } from "~/components/elements";
import { fade } from "svelte/transition";

</script>

<main transition:fade>
    <Header/>
    <Router {routes}/>
    <NavBar/>
</main>

