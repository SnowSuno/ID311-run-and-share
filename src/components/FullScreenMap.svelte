<script lang="ts">
  import { onMount } from "svelte";
  import { location } from "~/store/location";

  let map: naver.maps.Map;
  let marker: naver.maps.Marker;

  $: position = new naver.maps.LatLng($location.latitude, $location.longitude);

  onMount(() => {
    map = new naver.maps.Map("map", {
      center: position,
      zoom: 17,
      disableKineticPan: false,
      logoControl: false,
      tileSpare: 5,
      scaleControl: false,
      baseTileOpacity: 1,
    });

    marker = new naver.maps.Marker({
      position, map, icon: {
        content: "<div id='marker'></div>",
      }
    });
  });

  $: if (map && marker) {
    map.panTo(position);
    marker.setPosition(position);
  }

</script>

<main>
    <div id="map"></div>
</main>

<style>
    main {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    #map {
        width: 100%;
        height: 100%;
    }

    :global(#marker) {
        width: 17px;
        height: 17px;

        transform: translate(-50%, -50%);
        position: relative;
    }

    :global(#marker:before) {
        content: "";
        position: absolute;
        width: 400%;
        height: 400%;
        top: -150%;
        left: -150%;
        background-color: black;
        z-index: -1;
        border-radius: 50%;

        animation: ripple 1.5s ease-out infinite;
    }

    :global(#marker:after) {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: -4px;
        left: -4px;
        background-color: black;
        border: 4px solid white;
        box-shadow: var(--shadow);
        z-index: -1;
        border-radius: 50%;

    }

    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(1.3);
        }
    }
</style>
