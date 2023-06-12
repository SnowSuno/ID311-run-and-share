import { get, readonly, writable } from "svelte/store";
import { location } from "~/store/location";
import { Geolocation } from "~/utils/geolocation";
import { doc, setDoc } from "firebase/firestore";
import { sprintsRef, usersRef } from "~/firebase/collections";
import { auth } from "~/store/auth";

interface SprintState {
  paused: boolean;
  route: Geolocation[];
  startTime: Date;
  endTime?: Date;
}

const sprintStore = writable<SprintState>(null);

let unsubscribe;
const start = () => {
  sprintStore.set({
    paused: false,
    route: [],
    startTime: new Date(),
  });

  unsubscribe = location.subscribe(coords => {
    sprintStore.update(({ paused, route, ...rest }) => paused
      ? ({ paused, route, ...rest })
      : ({ ...rest, paused, route: [...route, coords] }));
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
  const { startTime, endTime, route } = get(sprintStore);

  setDoc(
    doc(sprintsRef), {
      createdAt: endTime,
      distance: 0,
      level: "easy",
      route: route,
      time: endTime.getTime() - startTime.getTime(),
      user: doc(usersRef, get(auth).uid),
    }
  ).catch(alert);
};

const reset = () => {
  sprintStore.set(null);
};

export const sprint = readonly(sprintStore);
export const sprintActions = { start, pause, stop, reset };
