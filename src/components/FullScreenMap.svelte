<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { location } from "~/store/location";
  import { displayedRoute, sprint } from "~/store";
  import { get } from "svelte/store";
  import { CurrentLocation } from "~/assets/icons";
  import { selectedRoute } from "~/store/selectedRoute";

  export let id = "map";

  // export let route: Geolocation[];
  $: route = $sprint?.route || $displayedRoute;
  $: recording = !!$sprint?.route;

  let map: naver.maps.Map;
  let marker: naver.maps.Marker;
  let polyline: naver.maps.Polyline;
  let overlay: naver.maps.Polyline;

  let pan = true;
  let listener: naver.maps.MapEventListener;

  onMount(() => {
    map = new naver.maps.Map(id, {
      center: $location.toNaver(),
      zoom: 17,
      disableKineticPan: false,
      logoControl: false,
      tileSpare: 5,
      scaleControl: false,
      baseTileOpacity: 1,
    });

    marker = new naver.maps.Marker({
      map,
      position: $location.toNaver(),
      icon: {
        content: "<div class='marker'></div>",
      }
    });

    polyline = new naver.maps.Polyline({
      map,
      path: [],
      strokeColor: "#000",
      strokeWeight: 3,
      strokeLineCap: "round",
      strokeLineJoin: "round",
    });

    overlay = new naver.maps.Polyline({
      map,
      path: [],
      visible: false,
      strokeColor: "rgba(0,0,0,0.5)",
      strokeWeight: 3,
      strokeLineCap: "round",
      strokeLineJoin: "round",
    });

    listener = naver.maps.Event.addListener(map, "dragstart", () => pan = false);
  });

  onDestroy(() => {
    naver.maps.Event.removeListener(listener);
  });

  $: if (map && marker) {
    marker.setPosition($location.toNaver());
  }

  $: if (map && pan) {
    map.panTo($location.toNaver());
  }

  $: if (map && recording) {
    map.panTo($location.toNaver());
  }

  $: if (map && polyline) {
    polyline.setVisible(!!route);
    if (route) {
      pan = false;
      polyline.setPath(route.map(p => p.toNaver()));
    }
  }

  $: if (map && polyline && !recording) {
    if (route) {
      map.panToBounds(
        polyline.getBounds(),
        undefined,
        { top: 80, right: 10, bottom: 250, left: 10 },
      );
    } else {
      map.morph(get(location).toNaver(), 17);
      pan = true;
    }
  }

  $: if (map && overlay) {
    if ($selectedRoute) {
      overlay.setVisible(true);
      overlay.setPath($selectedRoute.route.map(p => p.toNaver()));
    } else {
      overlay.setVisible(false);
    }
  }

</script>

<main>
  <div {id}></div>
  <button class:pan on:click={() => { pan = true }}>
    <CurrentLocation/>
  </button>
</main>

<style>
    main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    div {
        width: 100%;
        height: 100%;
    }

    button {
        position: fixed;
        display: flex;
        bottom: calc(var(--nav-h) + 80px);
        right: var(--inline);
        padding: 10px;
        border-radius: 50%;
        /*border-radius: var(--radius-md);*/
        background-color: rgba(255, 255, 255, 1);
        color: rgba(0, 0, 0, 0.3);
        /*color: #FFF;*/
        /*border: 0.1rem solid currentColor;*/
        box-shadow: var(--shadow);
    }

    button.pan {
        color: #000;
    }
</style>
