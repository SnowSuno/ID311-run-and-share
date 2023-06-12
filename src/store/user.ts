import { derived, type Readable } from "svelte/store";

import type { User } from "firebase/auth";
import { docData } from "rxfire/firestore";
import { doc } from "firebase/firestore";

import { usersRef, type UserDoc } from "~/firebase/collections";
import { auth } from "./auth";

export const user = derived<Readable<User | null>, UserDoc | null>(
  auth,
  ($auth, set) => {
    set(undefined);
    if (!$auth) return set($auth as null);

    docData(doc(usersRef, $auth.uid))
      .subscribe(user => set(user || null));
  }
);
