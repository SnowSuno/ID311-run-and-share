import Plan from "./Plan.svelte";
import Suggestions from "./Suggestions.svelte";

export const routes = {
  "/plan": Plan,
  "/plan/suggest": { component: Suggestions, title: "Suggested Routes" },
};
