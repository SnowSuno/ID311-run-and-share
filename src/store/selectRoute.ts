import { writable } from "svelte/store";
import type { SprintDoc } from "~/firebase/collections";

export const selectedPath = writable<SprintDoc>(null);
