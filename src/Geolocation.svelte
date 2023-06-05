<script lang="ts">
  let longitude = 0;
  let latitude = 0;

  navigator.geolocation.watchPosition(pos => {
    longitude = pos.coords.longitude;
    latitude = pos.coords.latitude;
    console.log(longitude, latitude);
  });
</script>

<div>
    <h1>Geolocation</h1>
    <p>Longitude: {longitude}</p>
    <p>Latitude: {latitude}</p>
</div>
