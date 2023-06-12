import Plan from "./Plan.svelte";
import Suggestions from "./Suggestions.svelte";
import Result from "./Result.svelte";

export const routes = {
  "/plan": Plan,
  "/plan/suggest": { component: Suggestions, title: "Suggested paths" },
  "/result": Result,
};
