import { get, readonly, writable } from "svelte/store";
import { location } from "~/store/location";
import { Geolocation } from "~/utils/geolocation";
import { doc, setDoc, type Timestamp } from "firebase/firestore";
import { sprintsRef, usersRef } from "~/firebase/collections";
import { auth } from "~/store/auth";
import { selectedRoute } from "~/store/selectedRoute";

export interface SprintState {
  paused: boolean;
  route: Geolocation[];
  distance: number;
  startTime: Date;
  endTime?: Date;
}

const sprintStore = writable<SprintState>(null);

let unsubscribe;
const start = () => {
  sprintStore.set({
    paused: false,
    route: [],
    distance: 0,
    startTime: new Date(),
  });

  unsubscribe = location.subscribe(coords => {
    sprintStore.update(({ paused, route, distance, ...rest }) => paused
      ? ({ paused, route, distance, ...rest })
      : ({
        ...rest,
        paused,
        route: [...route, coords],
        distance: distance + coords.delta(route.at(-1) ?? coords),
      }));
  });
};

const pause = () => {
  sprintStore.update(({ paused, ...rest }) => ({ ...rest, paused: !paused }));
};

const stop = () => {
  unsubscribe?.();
  sprintStore.update(state => ({ ...state, endTime: new Date() }));
// };

// const submit = async () => {
  const { startTime, endTime, route, distance } = get(sprintStore);

  setDoc(
    doc(sprintsRef), {
      createdAt: endTime as unknown as Timestamp,
      distance: distance,
      level: "beginner",
      route: route,
      time: endTime.getTime() - startTime.getTime(),
      user: doc(usersRef, get(auth).uid),
    }
  ).catch(alert);

  selectedRoute.set(null);
};

const reset = () => {
  sprintStore.set(null);
};

export const sprint = readonly(sprintStore);
export const sprintActions = { start, pause, stop, reset };
