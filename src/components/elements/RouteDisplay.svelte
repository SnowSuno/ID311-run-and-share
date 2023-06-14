<script lang="ts">
  import { onMount } from "svelte";
  import { location } from "~/store";
  import { Geolocation } from "~/utils/geolocation";

  export let route: Geolocation[] | undefined = undefined;
  export let showMarker: boolean = false;

  let map: naver.maps.Map;
  let marker: naver.maps.Marker;
  let polyline: naver.maps.Polyline;

  onMount(() => {
    map = new naver.maps.Map("small-map", {
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
        visible: showMarker,
      }
    });

    polyline = new naver.maps.Polyline({
      map,
      path: route ? route.map(p => p.toNaver()) : [],
      strokeColor: "#000",
      strokeWeight: 3,
      strokeLineCap: "round",
      strokeLineJoin: "round",
    });

    route && map.fitBounds(
      polyline.getBounds(),
      { top: 10, right: 10, bottom: 10, left: 10 }
    );
  });

  $: if (map) marker.setVisible(showMarker);
  $: if (map && showMarker) marker.setPosition($location.toNaver());

  $: if (map && route) {
    polyline.setPath(route?.map(p => p.toNaver()));
    map.fitBounds(
      polyline.getBounds(),
      { top: 50, right: 50, bottom: 50, left: 50 }
    );
  }
</script>

<div>
  <div id="small-map"></div>
</div>


<style>
    #small-map {
        width: 100%;
        padding-bottom: 68%;
        border-radius: var(--radius-md);
    }


</style>
