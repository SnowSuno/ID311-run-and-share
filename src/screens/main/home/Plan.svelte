<script>
  import { sprintActions } from "~/store/sprint";


  import { stackLink } from "~/lib/stack-router";
  import RightChevron from "~/assets/icons/RightChevron.svelte";
  import ChevronCancel from "~/assets/icons/ChevronCancel.svelte";
  import { filterData } from "~/utils/filterData";
  import { writableArray } from "~/store/suggestRoute";
  import { location } from "~/store/location";
  import { onDestroy, onMount } from "svelte";
  import { selectedPath } from "~/store/selectRoute";
  import userIcon from "~/assets/icons/userIcon.svg";

  import { MainButton } from "~/components/elements";
  import { pop } from "svelte-spa-router";

  let map;
  let marker;
  $: position = new naver.maps.LatLng($location.latitude, $location.longitude);
  let filterType = ""; // distance, time, level
  let levelName = []; // level
  let distanceValue; // distance
  let data = []; // data store
  let hours = "00";
  let minutes = "00";
  $: anchorDisabled = data.length === 0;
  $: timeValue = parseInt(hours) * 60 * 60 + parseInt(minutes) * 60; //seconds
  let url = "/plan/suggest";

  //format time value
  const formatValue = (value, min, max) => {
    if (isNaN(value) || value < min) {
      return pad(min.toString());
    } else if (value > max) {
      return pad(max.toString());
    } else {
      return pad(value.toString());
    }
  };
  const pad = (value) => {
    return (("0") + value).length > 2 ? value : "0" + value;
  };

  //Everytime FilterType/FilterValue changes
  //Never console.log(data) it will create infinite loop <-- you can console.log(filteredData)
  $:{
    if (filterType === "distance") {
      filterData(filterType, distanceValue).then((filteredData) => {
        data = filteredData;
        $writableArray = filteredData;

      }).catch((error) => {
        console.log(error);
      });
    } else if (filterType === "time") {
      filterData(filterType, timeValue).then((filteredData) => {
        data = filteredData;
        $writableArray = filteredData;
      }).catch((error) => {
        console.log(error);
      });
    } else if (filterType === "level") {
      filterData(filterType, levelName).then((filteredData) => {
        data = filteredData;
        $writableArray = filteredData;
      }).catch((error) => {
        console.log(error);
      });
    }
  }
  onMount(() => {
    map = new naver.maps.Map("mapPlan", {
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

  //only once

  $: if (map && marker) {
    map.panTo(position);
    marker.setPosition(position);
    if ($selectedPath.length !== 0) {
      map.panTo(new naver.maps.LatLng($selectedPath[0]?.path[0]?.latitude, $selectedPath[0]?.path[0]?.longitude));
      const pathToDraw = [];
      $selectedPath[0].path.forEach((geoobj) => {
        pathToDraw.push(new naver.maps.LatLng(geoobj.latitude, geoobj.longitude));
      });
      const polyline = new naver.maps.Polyline(
        {
          map: map,
          path: pathToDraw,
          strokeColor: "#f00",
          strokeWeight: 3
        }
      );
    }
  }

  const start = () => {
    sprintActions.start();
    // recording.set(true);
    pop();
  }

</script>

<main>
  <h2>Search for paths</h2>
  <h6>Search by</h6>
  <div class="radio-inputs">
    <label class="radio">
      <input type='radio' bind:group={filterType} name="radio" value="distance">
      <span class="name">Distance</span>
    </label>
    <label class="radio">
      <input type='radio' bind:group={filterType} name="radio" value="time">
      <span class="name">Time</span>
    </label>
    <label class="radio">
      <input type='radio' bind:group={filterType} name="radio" value="level">
      <span class="name">Level</span>
    </label>
  </div>
  {#if $selectedPath.length === 0}
    <div class="filterContainer">
      {#if filterType === 'distance'}
        <div class="filter-distance">
          <input type="number" placeholder="" class="input-distance" bind:value={distanceValue}>
          <h1>km</h1>
          <div class="cancel-icon">
            <ChevronCancel size={32} color={'#B9B9B9'}/>
          </div>
        </div>
        <h6>Discover paths</h6>
        <a href={url} use:stackLink class="discover-path" class:anchorDisabled={anchorDisabled}>
          <span>{data.length} suggested paths</span>
          <RightChevron/>
        </a>
      {:else if filterType === 'time'}
        <div class="filter-time">
          <div class="input-time">
            <input type="number" bind:value={hours} on:input={() => hours = formatValue(hours, 0, 23)}>
            <span>:</span>
            <input type="number" bind:value={minutes} on:input={() => minutes = formatValue(minutes, 0, 59)}>
          </div>
          <span class="name">(Hours:Minutes)</span>
        </div>
        <h6>Discover paths</h6>
        <a href={url} use:stackLink class="discover-path" class:anchorDisabled={anchorDisabled}>
          <span>{data.length} suggested paths</span>
          <RightChevron/>
        </a>
      {:else if filterType === 'level'}
        <div class="filter-level">
          <label class="checkbox">
            <div class="name">
              <span class="level">Beginner</span>
              <span class="pace">~ 12km/h</span>
            </div>
            <input type='checkbox' bind:group={levelName} name="checkbox" value="beginner">
            <svg viewBox="0 0 64 64" height="20px" width="20px">
              <path
                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                pathLength="575.0541381835938" class="path"></path>
            </svg>
          </label>
          <label class="checkbox">
            <div class="name">
              <span class="level">Intermediate</span>
              <span class="pace">12km/h ~ 20km/h</span>
            </div>
            <input type='checkbox' bind:group={levelName} name="checkbox" value="intermediate">
            <svg viewBox="0 0 64 64" height="20px" width="20px">
              <path
                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                pathLength="575.0541381835938" class="path"></path>
            </svg>
          </label>
          <label class="checkbox">
            <div class="name">
              <span class="level">Expert</span>
              <span class="pace">20km/h ~</span>
            </div>
            <input type='checkbox' bind:group={levelName} name="checkbox" value="expert">
            <svg viewBox="0 0 64 64" height="20px" width="20px">
              <path
                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                pathLength="575.0541381835938" class="path"></path>
            </svg>
          </label>
        </div>
        <h6>Discover paths</h6>
        <a href={url} use:stackLink class="discover-path" class:anchorDisabled={anchorDisabled}>
          <span>{data.length} suggested paths</span>
          <RightChevron/>
        </a>
      {/if}
    </div>
  {/if}
  {#if $selectedPath.length !== 0}
    <h6>Following path of</h6>
  {/if}
  <div class="mapContainer">
    <div id="mapPlan"></div>
    {#if $selectedPath.length === 0}
      <div class="noselected-path">No route selected</div>
    {:else}
      <div class="user-name">
        <img src={userIcon} alt="img">
        <span>Sprint by</span>
        <h2>{$selectedPath[0].user}</h2>
      </div>
    {/if}
  </div>
  {#if $selectedPath.length !== 0}
    <div class="sprint-info">
      <div>
        <h6>{Math.round($selectedPath[0].distance * 100) / 100}km</h6>
        <span>distance</span>
      </div>
      <div>
        <h6>{Math.round($selectedPath[0].time / 60)}m</h6>
        <span>Time</span>
      </div>
      <div>
        <h6>{Math.round(($selectedPath[0].distance / ($selectedPath[0].time / 3600)) * 100) / 100}km/h</h6>
        <span>Pace</span>
      </div>
    </div>
  {/if}
  <MainButton float on:click={start}>
    {$selectedPath.length === 0
      ? "Start without setting path"
      : "Start"
    }
  </MainButton>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
    }

    .radio-inputs {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 48px;
        gap: 12px;
        margin-top: 6px;
        justify-content: space-evenly;
        flex-shrink: 0;
    }

    .radio-inputs .radio {
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 0%;
        text-align: center;
        font-size: 14px;
    }

    .radio-inputs .radio input {
        display: none;
    }

    .radio-inputs .radio .name {
        display: flex;
        height: 100%;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        border: none;
        background: rgba(248, 248, 248, 1);
        color: rgba(121, 121, 121, 1);
        transition: all .15s ease-in-out;
        font-weight: 500;
        font-style: normal;
    }

    .radio-inputs .radio input:checked + .name {
        background-color: #000000;
        color: #ffffff;
    }

    .filter-time {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
        height: 64px;
        margin-top: 20px;
        margin-bottom: 40px;
    }

    .filter-time .name {
        margin-top: auto;
        margin-bottom: 4px;
        font-size: 24px;
        font-style: italic;
        color: #BEBEBE;


    }

    .filter-time .input-time {
        display: flex;
        flex-direction: row;
        width: 40%;
        border-bottom: 3px solid #000000;
        padding-left: 20px;
    }

    .filter-time .input-time input {
        margin-top: auto;
        height: fit-content;
        width: 50px;
        border: none;
        font-style: normal;
        font-size: 32px;
        font-weight: 700;
        padding-left: 4px;
    }

    .filter-time .input-time span {
        margin-top: auto;
        font-size: 32px;
        height: fit-content;
        margin-bottom: 3px;
    }


    .filter-distance {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 64px;
        margin-top: 20px;
        margin-bottom: 40px;
    }

    .filter-distance .input-distance {
        margin-top: auto;
        height: fit-content;
        width: 150px;
        border: none;
        border-bottom: 3px solid #000000;
        font-size: 32px;
        font-weight: 700;
        padding-left: 4px;
        padding-bottom: 2px;
    }

    .filter-distance h1 {
        margin-top: auto;
        margin-left: 4px;
        font-size: 32px;
        font-weight: 700;
    }

    .filter-distance .cancel-icon {
        margin-top: auto;
        align-self: end;
        margin-left: auto;
    }

    .filter-level {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
        margin-top: 20px;
        justify-content: space-evenly;
    }

    .filter-level .checkbox {
        padding: 0 24px;
        height: 64px;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: space-between;
        border-radius: 18px;
        border: none;
        background: #FFFFFF;
    }

    .filter-level .checkbox:has(input[type="checkbox"]:checked) {
        /* background-color: #F2F2F2; */
        background-color: rgba(248, 248, 248, 1);
    }

    .filter-level .checkbox input[type="checkbox"] {
        display: none;
    }

    .filter-level .checkbox svg {
        overflow: visible;
    }

    .filter-level .checkbox svg .path {
        fill: none;
        stroke: black;
        stroke-width: 6;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease;
        stroke-dasharray: 241 9999999;
        stroke-dashoffset: 0;
    }

    .filter-level .checkbox input[type="checkbox"]:checked + svg .path {
        stroke: black;
        stroke-dasharray: 70.5096664428711 9999999;
        stroke-dashoffset: -262.2723388671875;
    }

    .filter-level .checkbox .name {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .filter-level .checkbox .name .level {
        font-size: 16px;
        font-weight: 600;
        font-style: normal;
        color: #000000;
    }

    .filter-level .checkbox .name .pace {
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        color: #BEBEBE;
        margin-top: 2px;
    }

    .discover-path {
        padding: 0 24px;
        margin-top: 6px;
        height: 64px;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: space-between;
        border-radius: 18px;
        border: none;
        background: #F8F8F8;
        text-decoration: none;
        color: black;
    }

    .start-without-plan {
        flex-shrink: 0;
        margin-top: auto;
        margin-bottom: 100px;
        padding: 0 24px;
        height: 48px;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        border-radius: 18px;
        border: none;
        background: #000000;
        text-decoration: none;
        color: #FFFFFF;
    }

    .anchorDisabled {
        pointer-events: none;
        background: rgba(248, 248, 248, 0.5);
    }

    h2 {
        font-size: 21px;
        font-weight: 600;
        color: #000000;
    }

    h6 {
        font-size: 14px;
        font-weight: 500;
        color: rgba(119, 119, 119, 1);
        margin-top: 12px;
    }

    .mapContainer {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        flex-shrink: 2;
        margin-top: 6px;
        border-radius: 18px;
        margin-bottom: 20px;
        overflow: hidden;
        height: 600px;
        max-height: 260px;

    }

    .noselected-path {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.35);
        z-index: 102;
        color: #ffffff;
        font-size: 18px;
        font-weight: 500;
        align-items: center;
        justify-content: center;

    }

    .sprint-info {

        display: flex;
        flex-direction: row;
        background: #F8F8F8;
        border-radius: 18px;
        padding: 12px 32px;
        justify-content: space-between;
        gap: 8px;
    }

    .sprint-info div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .sprint-info h6 {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        font-style: normal;
        color: #000000;
    }

    .sprint-info span {
        font-size: 9px;
        font-weight: 500;
        font-style: normal;
        color: #7D7D7D;
    }

    .user-name {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;
        position: absolute;
        top: 10px;
        left: 10px;
    }

    .user-name span {
        font-weight: bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.5);
    }

    .user-name h2 {
        font-size: 16px;
        color: #000000;
    }

    #mapPlan {
        width: 100%;
        height: 100%;
    }

    /* a {
      margin-top: auto;
      align-self: center;
      margin-bottom: 100px;
    } */
</style>
