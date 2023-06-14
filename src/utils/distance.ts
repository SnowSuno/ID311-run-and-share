import type { Geolocation } from "~/utils/geolocation";

export const calculateDistance = (route: Geolocation[]) => {
  return route.reduce((distance, current, index) => {
    if (index === 0) return 0;

    const previous = route[index - 1];

    return distance + current.delta(previous);
  }, 0);
};
