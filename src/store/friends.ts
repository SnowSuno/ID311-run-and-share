import { readable } from "svelte/store";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import { collection } from "rxfire/firestore";
import { usersRef, type UserDoc } from "~/firebase/collections";

export const friends = readable<QueryDocumentSnapshot<UserDoc>[]>([], set => {
  collection(usersRef).subscribe(set);
});
