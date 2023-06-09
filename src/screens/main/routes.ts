import Home from "./Home.svelte";
import Leaderboard from "./Leaderboard.svelte";
import Settings from "./settings.svelte";

export const routes = {
  "/": Home,
  "/leaderboard": Leaderboard,
  "/settings": Settings,
}
