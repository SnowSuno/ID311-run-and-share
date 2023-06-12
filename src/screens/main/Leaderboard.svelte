<script lang="ts">
    import "~/app.css";
    import { onMount } from 'svelte'
    import { db } from '~/firebase/config'
    import moment from 'moment'
    import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
    import Icon from '@iconify/svelte';
    import TodaySprint from "~/components/elements/TodaySprint.svelte";

    // variable
    let today_sprints = [];
    let date;
    let isEmpty = true;

    onMount(() => {
        today_sprints = [];
        date = moment().format('YYYYMMDD');

        // console.log(date);
        // addSomeData();
        getTodaySprints(date);

    })

    // some dummy data
    async function addSomeData() {
        const falsedate = moment().add(1, 'days').format('YYYYMMDD');
        await addDoc(collection(db, "test3"), {
            username: "수노",
            date: date,
            distance: 8.4,
            level: "Expert",
            pace: 21,
            path: [],
            time: "72:01",
            emoji: {
                heart: 1,
                fire: 0,
                clap: 3,
            }
        });
    }

    // get today's data
    async function getTodaySprints(today){
        const q = query(collection(db, 'test3'), where("date", "==", today));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            today_sprints.push([doc.id, doc.data()]);
        });
        isEmpty = false;
        console.log(today_sprints);
    }

</script>
    

<h1 class="font-sans text-[28px]/[34px] font-bold text-black ml-6 mt-6">Leaderboard</h1>

<h2 id="tdsprints">Today's Sprints</h2>
{#key isEmpty}
    <div class="tdcard_wrapper">
        {#each today_sprints as today}
            <TodaySprint docId={today[0]} {...today[1]} showPopup={false} />
        {/each}
    </div>
{/key}

<style lang="postcss">

    #tdsprints {
        width: 310px;
        height: 25px;
        margin-left: 7%;
        margin-top: 5%;

        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 21px;
        line-height: 25px;

        color: #000000;
    }

    .tdcard_wrapper {
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        padding: 2%;
        margin: 7%;
        margin-top: 3%;
    }

</style>