<script lang="ts">
  import Router from "svelte-spa-router";
  import { routes } from "./main/routes";
  import { Header, NavBar, SafeArea } from "~/components/layout";
  import { fade } from "svelte/transition";

</script>

<SafeArea transition={fade}>
  <Header/>
  <Router {routes}/>
  <NavBar/>
</SafeArea>
