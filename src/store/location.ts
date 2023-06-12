import { readable } from "svelte/store";

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
    ({ coords }) => set(coords),
    (error) => console.error(error),
    {maximumAge: 100, enableHighAccuracy: true}
  );

  return () => navigator.geolocation.clearWatch(id);
});

