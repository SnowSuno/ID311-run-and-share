import { readable } from "svelte/store";
import { Geolocation } from "~/utils/geolocation";

export const location = readable<Geolocation>(undefined, set => {
  const id = navigator.geolocation.watchPosition(
    ({ coords }) => set(Geolocation.fromCoordinates(coords)),
    (error) => console.error(error),
    {maximumAge: 100, enableHighAccuracy: true}
  );

  return () => navigator.geolocation.clearWatch(id);
});

