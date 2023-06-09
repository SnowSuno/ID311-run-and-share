<script lang="ts">
  import Router, {link} from "svelte-spa-router";
  import { routes } from "./main/routes";
  import { NavBar } from "~/components/layout";
</script>

<Router {routes}/>
<NavBar/>
