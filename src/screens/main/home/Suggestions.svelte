<script>
  import { onDestroy, onMount } from "svelte";
  import { location } from "~/store/location";
  import userIcon from "~/assets/icons/userIcon.svg";
  import { writableArray } from "~/store/suggestRoute";
  import { selectedPath } from "~/store/selectRoute";
  import { stackLink } from "~/lib/stack-router";
  import { pop } from "svelte-spa-router";
  import { displayedRoute, friends, sprints } from "~/store";

  let map;
  let marker;
  let selectedButton = null;
  let polyline;
  let polylinePath = [];


  function getUserPhotoUrl(userinfo){
    const user = $friends.find((user) => user.id === userinfo?.user.id)
    const userPhotoUrl = user.data().photoURL
    return userPhotoUrl
  }
  function getUserName(userinfo){
    const user = $friends.find((user) => user.id === userinfo?.user.id)
    const userName = user.data().nickname
    return userName
  }
  function selectButton (userinfo) {
    if (polyline) {
      polyline.setMap(null);
      polyline = null;
      polylinePath = [];
    }
    if (selectedButton === userinfo.id) {
      selectedButton = null;
    } else {
      selectedButton = userinfo.id;
      userinfo.route.forEach((pathEl) => {
        const latlng = new naver.maps.LatLng(pathEl.latitude, pathEl.longitude);
        polylinePath.push(latlng);
      });
      polyline = new naver.maps.Polyline({
        map: map,
        path: polylinePath,
        strokeColor: "#000",
        strokeWeight: 3,
        strokeLineCap: "round",
        strokeLineJoin: "round",
      });
      console.log(polylinePath[0]);
      map.panTo(polylinePath[0]);

    }

    console.log(selectedButton);
  }

  $: position = new naver.maps.LatLng($location.latitude, $location.longitude);

  // $: parsed = querystring.parse(window.location.search);

  onMount(() => {
    map = new naver.maps.Map("mapSuggestions", {
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
    // naver.maps.Event.addListener(map, 'click', function(e){
    //     const marker = new naver.maps.Marker({
    //         position:e.coord,
    //         map:map
    //     })
    //     pathToBackend.push(new GeoPoint(e.coord.y,e.coord.x))
    //     console.log(pathToBackend)
    // })
  });

  $: if (map && marker) {

    map.panTo(position);
    marker.setPosition(position);
  }

  function handleSelectClick (){
    $selectedPath = $writableArray.filter((item) => item.id === selectedButton);
    console.log($selectedPath);
    pop();
  }

  // async function addRoute(distance,level,path,time,user){
  //    const data = {
  //        date: Timestamp.fromDate(new Date("June 10, 2023")),
  //        distance: distance,
  //        level: level,
  //        path: path,
  //        time: time,
  //        user: user
  //    }
  //    await addDoc(collection(db,"test"), data)
  // }
</script>

<div class="top-container">
  <div class='empty-div'></div>
  <div id="mapSuggestions"></div>
  <div class="scrollable-content">
    {#each $writableArray as userinfo}
      <button class="scrollable-item" class:active={selectedButton === userinfo.id}
              on:click={() => selectButton(userinfo)}>
        <div class="user-name">
          <img src={getUserPhotoUrl(userinfo)} alt="img">
          <span>Sprint by</span>
          <h2>{getUserName(userinfo)}</h2>
        </div>
        <div class="sprint-info">
          <div>
            <h6>{Math.round(userinfo.distance * 100) / 100}km</h6>
            <span>distance</span>
          </div>
          <div>
            <h6>{Math.round(userinfo.time / (60 * 1000))}m</h6>
            <span>Time</span>
          </div>
          <div>
            <h6>{Math.round((userinfo.distance / (userinfo.time / (3600 * 1000))) * 100) / 100}km/h</h6>
            <span>Pace</span>
          </div>
        </div>
      </button>
    {/each}
  </div>

  <a class="select-anchor" class:disabledAnchor={selectedButton === null}
     on:click={handleSelectClick}>
    Select
  </a>
  <!-- <button class="removeButton" on:click={
      () => {
          addRoute(2.4,"intermediate",pathToBackend,1780,'juggernaut')
      }
  }>add route</button> -->


  <!-- <a href="/" class="wtf">hello</a> -->
</div>



<style>
    main {
        display: flex;
        flex-direction: column;
    }
    .removeButton {
        display: flex;
        position: fixed;
        width: 60%;
        justify-content: center;
        align-items: center;
        height: 48px;
        z-index: 101;
        background: #000000;
        color: white;
        top: 100px;

    }
    .user-name img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }

    .wtf {
        position: absolute;
        width: 80%;
        display: flex;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        /* top:200px; */
        justify-content: center;
        align-items: center;
        height: 48px;
        z-index: 101;
        background: #000000;
        color: white;
    }

    .top-container {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    #mapSuggestions {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .empty-div {
        position: fixed;
        margin-bottom: 2px;
        top: 40px;
        width: 100%;
        background-color: #fff;
        height: 20px;
        border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        z-index: 101;
    }

    .scrollable-content {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        overflow-x: auto;
        overflow-y: hidden;
        position: fixed;
        padding: 20px 24px;
        gap: 14px;
        width: 100%;
        bottom: 120px;
        height: 160px;
        /* background-color: black; */

    }

    .scrollable-content::-webkit-scrollbar {
        display: none;
    }

    .scrollable-content .scrollable-item {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: 8px;
        width: 235px;
        height: 125px;
        background: #FFFFFF;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
        border-radius: 20px;
        padding: 14px 12px;
    }

    .scrollable-content .active {
        background: black;
    }

    .scrollable-content .active h2 {
        color: #ffffff;
    }

    .scrollable-content .active span {
        color: rgba(255, 255, 255, 0.5);
    }

    .scrollable-content .active .sprint-info {
        background: #212121;
    }

    .scrollable-content .active h6 {
        color: #ffffff;
    }

    .user-name {
        display: flex;
        flex-direction: row;
    }

    .sprint-info {
        display: flex;
        flex-direction: row;
        background: #F8F8F8;
        border-radius: 18px;
        padding: 12px 18px;
        justify-content: space-between;
        gap: 8px;
    }

    .sprint-info div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
    }

    .sprint-info h6 {
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

    .select-anchor {
        position: fixed;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        bottom: 40px;
        width: 88%;
        height: 52px;
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

    .disabledAnchor {
        pointer-events: none;
        background: rgba(0, 0, 0, 0.3);
    }

</style>
