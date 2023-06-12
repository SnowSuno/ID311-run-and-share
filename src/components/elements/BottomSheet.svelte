<script>
  import { touch, deltaX, deltaY } from "./utils";
  import { spring } from "svelte/motion";

  let dialog;
  let backdrop;

  let startX;
  let startY;
  let direction;

  export let fullscreen = false;
  export let open = false;
  export let threshold = 0.3;
  export let backdropOpacity = 0.5;

  const bottom = spring(0, { stiffness: 0.2, damping: 0.5 });

  const touchStart = e => {
    console.log(e);
    startX = touch(e).clientX;
    startY = touch(e).clientY;
  };

  const touchMove = e => {
    direction = "vertical";
    // if (!direction) {
    //   direction = Math.abs(deltaY(e, startY)) > Math.abs(deltaX(e, startX)) ? "vertical" : "horizontal";
    // }

    if (
      // deltaY(e, startY) < 0 &&
      direction === "vertical" && dialog.scrollTop === 0
    ) {
      console.log("touchMove", deltaY(e, startY));
      bottom.set(deltaY(e, startY), { hard: true });
      // dialog.style.setProperty("--b", deltaY(e, startY) + "px");
      // backdrop.style.setProperty("--o", (1 + deltaY(e, startY) / dialog.clientHeight) * backdropOpacity);
    }
  };

  const touchEnd = e => {
    if (direction === "vertical") {
      open = -deltaY(e, startY) / dialog.clientHeight < threshold;
    }
    startY = null;
    direction = null;
  };

  // $: if (dialog) {
  //   dialog.onscroll = e => dialog.scrollTop === 0 && console.log(window.event);
  // }

  $: if (dialog && backdrop && !direction) {
    // dialog.style.setProperty("--b", open
    //   ? "0px"
    //   : -dialog.clientHeight + "px"
    // );
    bottom.set(open ? 0 : -dialog.clientHeight);
    backdrop.style.setProperty("--o", open
      ? backdropOpacity
      : 0
    );
  }
</script>

<div
  bind:this={backdrop}
  class="backdrop"
  class:open
  on:click={() => open = false}>
</div>

<div bind:this={dialog}
     class="root shadow"
     class:fullscreen
     on:touchstart={touchStart}
     on:touchmove={touchMove}
     on:touchend={touchEnd}
     style="bottom: {Math.round($bottom)}px;"
>
  {$bottom}
  <slot/>
</div>

<style>
    .root {
        position: fixed;
        background-color: #ffffff;
        width: 100vw;
        overflow: auto;
        left: 0;
        /*bottom: var(--b, -100%);*/
        z-index: 7;
    }

    .root.fullscreen {
        height: 100%;
    }


    .backdrop {
        pointer-events: none;
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100%;
        background-color: #212121;
        opacity: var(--o, 0);
        z-index: 6;
    }


    .backdrop.open {
        pointer-events: all;
    }

    .shadow {
        box-shadow: 0 -2px 8px #21212144, 0 0 2px #21212144;
    }
</style>
