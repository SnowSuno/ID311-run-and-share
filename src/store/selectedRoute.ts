import { writable } from "svelte/store";
import type { SprintDoc } from "~/firebase/collections";

export const selectedRoute = writable<SprintDoc>(null);
