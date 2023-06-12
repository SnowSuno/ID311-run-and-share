import { writable } from "svelte/store";
import { Geolocation } from "~/utils/geolocation";

export const displayedRoute = writable<Geolocation[]>(null);
