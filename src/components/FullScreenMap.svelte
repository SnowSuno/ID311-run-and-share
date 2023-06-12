<script lang="ts">
  import { onMount } from "svelte";
  import { location } from "~/store/location";
  import { Geolocation } from "~/utils/geolocation";

  export let route: Geolocation[];

  let map: naver.maps.Map;
  let marker: naver.maps.Marker;
  let polyline: naver.maps.Polyline;


  onMount(() => {
    map = new naver.maps.Map("map", {
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
  });

  $: if (map && marker) {
    map.panTo($location.toNaver());
    marker.setPosition($location.toNaver());
  }

  $: if (polyline) {
    polyline.setVisible(!!route);
    route && polyline.setPath(route.map(p => p.toNaver()));
  }

</script>

<main>
  <div id="map"></div>
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

    #map {
        width: 100%;
        height: 100%;
    }
</style>
