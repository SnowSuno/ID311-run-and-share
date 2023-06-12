import { readable } from "svelte/store";

export const location = readable<GeolocationCoordinates>(undefined, set => {
  const id = navigator.geolocation.watchPosition(
    ({ coords }) => set(coords),
    (error) => console.error(error),
    {maximumAge: 100, enableHighAccuracy: true}
  );

  return () => navigator.geolocation.clearWatch(id);
});

