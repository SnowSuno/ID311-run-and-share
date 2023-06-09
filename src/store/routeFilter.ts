import { derived, writable } from "svelte/store";
import { sprints } from "~/store/sprints";

const DISTANCE_PAD = 300; // meters
const TIME_PAD = 5 * 60 * 1000; // milliseconds

interface RouteFilter {
  distance?: number;
  time?: number;
  level?: ("beginner" | "intermediate" | "expert")[];
}

export const filter = writable<RouteFilter>({
  distance: undefined,
  time: undefined,
  level: undefined,
});

export const filteredSprints = derived(
  [filter, sprints],
  ([{ distance, time, level }, $sprints]) => {
    if (!$sprints) return [];

    if (distance) return $sprints.filter(sprint => (
      sprint.data().distance >= distance - DISTANCE_PAD
      && sprint.data().distance <= distance + DISTANCE_PAD
    ));

    if (time) return $sprints.filter(sprint => (
      sprint.data().time >= time - TIME_PAD
      && sprint.data().time <= time + TIME_PAD
    ));

    if (level) return $sprints.filter(sprint => (
      level.includes(sprint.data().level)
    ));

    return [];
  }
);
