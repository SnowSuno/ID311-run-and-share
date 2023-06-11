import { readable } from "svelte/store";
import { authState } from "rxfire/auth";
import type { User } from "firebase/auth";

import { auth as fireAuth } from "../firebase/config";

export const auth = readable<User | null>(undefined, set => {
  const subscription = authState(fireAuth).subscribe(set);

  return () => subscription.unsubscribe();
});
