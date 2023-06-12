import { readable } from "svelte/store";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import { collection } from "rxfire/firestore";
import { sprintsRef, type SprintDoc } from "~/firebase/collections";
import { orderBy, query } from "firebase/firestore";

export const sprints = readable<QueryDocumentSnapshot<SprintDoc>[]>([], set => {
  collection(query(
    sprintsRef,
    orderBy("createdAt", "desc"),
  )).subscribe(set);
});
