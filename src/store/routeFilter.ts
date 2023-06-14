import { derived, writable } from "svelte/store";
import { sprints } from "~/store/sprints";

const DISTANCE_PAD = 100; // meters
const TIME_PAD = 60; // seconds

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
    console.log(distance);

    const sprints = $sprints.map(s => s.data());

    if (distance) return sprints.filter(sprint => (
      sprint.distance >= distance - DISTANCE_PAD
      && sprint.distance <= distance + DISTANCE_PAD
    ));

    if (time) return sprints.filter(sprint => (
      sprint.time >= time - TIME_PAD
      && sprint.time <= time + TIME_PAD
    ));

    if (level) return sprints.filter(sprint => (
      level.includes(sprint.level)
    ));

    return [];
  }
);
