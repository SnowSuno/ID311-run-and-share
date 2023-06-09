import { readable } from "svelte/store";

interface Location {
  longitude: number;
  latitude: number;
}

const initial: GeolocationCoordinates = {
  longitude: 0,
  latitude: 0,
  accuracy: 0,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  speed: null,
}
export const location = readable<GeolocationCoordinates>(initial, set => {
  const id = navigator.geolocation.watchPosition(
    ({ coords }) => set(coords)
  );

  return () => navigator.geolocation.clearWatch(id);
});

