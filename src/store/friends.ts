import { readable } from "svelte/store";
import { collectionData } from "rxfire/firestore";
import { usersRef, type UserDoc } from "~/firebase/collections";

export const friends = readable<UserDoc[]>([], set => {
  collectionData(usersRef).subscribe(set);
})
