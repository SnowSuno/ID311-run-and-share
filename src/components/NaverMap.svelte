<script>
    import {onMount} from 'svelte'
import { bubble } from 'svelte/internal';
    import {calculateDistance}from '../utils/calculateDistance'
    import {db} from '../utils/firebase'
import Navbar from './Navbar.svelte';

    //VARIABLES
    let map = null;
    let location = {latitude: 37.5666805, longitude:126.9784147}
    let smallCircle = null;
    let bigCircle = null;
    let watchId; 
    let path = []; // [Type:NaverMapLatLng]
    let pathFirestore = []; //[Type: {latitude: number,longitude: number}]
    let polyline;
    let isRunning = false;
    let runningDistance = 0

    //StopWatch Variables
    let startTime = 0;
    let elapsedTime = 0;
    let intervalId;
    let hrs = "00";
    let mins = "00";
    let secs = "00";
    

    onMount(() => {

        let center = new naver.maps.LatLng(location.latitude,location.longitude);

        //Map Instantiation
        let mapOptions = {
            center: center,
            zoom: 17,
        } 
        map = new naver.maps.Map('map', mapOptions);

        //Small Circle Instantiation
        let circleOptions = {
            map: map,
            center: center,
            radius: 2,
            fillColor: '#ff0000',
            fillOpacity: 0.5,
            strokeColor: '#ff0000',
            strokeOpaciy: 1,
            strokeWeight: 2
            
        }
        smallCircle = new naver.maps.Circle(circleOptions)
        //Big Circle Instantiation
        circleOptions = {
            map: map,
            center: center,
            radius: 10,
            fillColor: '#ff0000',
            fillOpacity: 0.2,
            strokeColor: null,
            strokeOpaciy: 0,
            strokeWeight: 0
            
        }
        bigCircle = new naver.maps.Circle(circleOptions);
        //Callback functions for GEOLOCATION API
        const successCallback = (position) => {
            let prevLocation = location
            location = position.coords;
            

            //MapUpdateLocation
            let updatedLocation = new naver.maps.LatLng(location.latitude,location.longitude);
            map.setCenter(updatedLocation);
            smallCircle.setCenter(updatedLocation);
            bigCircle.setCenter(updatedLocation);
            if(isRunning){
                const distance = calculateDistance(prevLocation.latitude,prevLocation.longitude,location.latitude,location.longitude)
                console.log(distance) //in metres
                runningDistance += distance //in metres
                path.push(updatedLocation);
                pathFirestore.push({
                    latitude: location.latitude,
                    longitude: location.longitude
                })
                drawPath(path);
            }
        } 

        const errorCallback = (error) => {
            console.log(error);
        }

        watchId = navigator.geolocation.watchPosition(successCallback,errorCallback,{enableHighAccuracy: true});
    })

    //function for handling RUNNING
    const startRunning =  () => {
        console.log('started running')
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime,75); 
        
        
    }
    const stopRunning = () => {
        isRunning = false;
        console.log('stopped running');
        console.log(runningDistance);
        addRoute(runningDistance,"beginner",pathFirestore,"05:10");
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
    //function for drawing running trail
    const drawPath = (path) => {
        if(polyline){
            polyline.setPath(path);
        } else {
            polyline = new naver.maps.Polyline({
                map:map,
                path: path,
                strokeColor: '#f00',
                strokeWeight: 3
            })
        }
    }
    //updateTime
    function updateTime(){
        elapsedTime = Date.now() - startTime

        const sec = Math.floor((elapsedTime / 1000) % 60);
        const min = Math.floor((elapsedTime / (1000 * 60)) % 60);
        const hr = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

        secs = pad(sec);
        mins = pad(min);
        hrs = pad(hr)
        function pad(unit){
            return (("0") + unit).length > 2 ? unit : "0" + unit
        }
    }

    //function for adding route to db
    function addRoute(distance,intensity,path,time,){
        db.collection('test').add({
            distance: distance,
            intensity: intensity,
            path: path,
            time:time,
        })
    }
    //function for retrieving data
    async function getRoutes(){
        await db.collection('test1').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                console.log(doc.data());
                console.log(doc.id);
            }) 
        })
    }

    //function for filtering data
    async function filterData(filterType,filterValue){
        await db.collection('test1').get().then((snapshot) => {
            const data = []

            snapshot.docs.forEach(doc => {
                let difference;
                if(filterType === 'distance'){
                    difference = Math.abs(doc.data().distance - filterValue)
                } else if (filterType === 'time'){
                    difference = Math.abs(doc.data().time - filterValue)
                } else if (filterType === 'intensity'){
                    difference = Math.abs(doc.data().intensity - filterValue)
                } else{
                    console.log('Invalid filter type')
                }
                data.push({doc, difference})
            })

            data.sort((a,b) => a.difference - b.difference);

            data.forEach((doc) =>{
                console.log(`ID: ${doc.doc.id}`);
                console.log(`Data: ${JSON.stringify(doc.doc.data().distance)}`)
            })
        })
    }
</script>

<div>
    <Navbar/>
    <div id="map"></div>
    <div>{hrs}:{mins}:{secs}</div>
    <div>
        {#if isRunning}
        <button on:click={stopRunning}>Stop Running</button>
        {:else}
        <button on:click={startRunning}>Start Running</button>
        {/if}
    </div>
    <button on:click={getRoutes}>get routes</button>
    <button on:click={() => {filterData('distance', 10)}}>filterData</button>
</div>

<style>
    #map{
        width: 100%;
        height: 400px;
    }
</style>