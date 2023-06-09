import { readable } from "svelte/store";
import { authState } from "rxfire/auth";
import type { User } from "firebase/auth";

import { auth } from "~/utils/firebase";


export const user = readable<User>(undefined, set => {
  const subscription = authState(auth).subscribe(set);

  return () => subscription.unsubscribe();
});
