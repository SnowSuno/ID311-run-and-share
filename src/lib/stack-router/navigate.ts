import { push as _push } from "svelte-spa-router";
import { duration } from "~/lib/stack-router/constants";

export const push = (path: string) => new Promise(resolve => {
  _push("/?stack=" + path.slice(1))
    .then(() => setTimeout(resolve, duration));
});

