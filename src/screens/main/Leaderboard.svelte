<script lang="ts">
    import "~/app.css";
    import { onMount } from 'svelte'
    import { db } from '~/firebase/config'
    import moment from 'moment'
    import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
    import Icon from '@iconify/svelte';
    import TodaySprint from "~/components/elements/TodaySprint.svelte";
    import Challenge from "~/components/elements/Challenge.svelte";
    import { dailyChallenge } from "~/store/challenge";

    // variable
    let today_sprints = [];
    let date;
    let isEmpty = true;
    let challenge = {
        metric: 0,
        range: 0,
    }

    onMount(() => {
        today_sprints = [];
        date = moment().format('YYYYMMDD');

        challenge = getChallenge(date);
        // console.log(date);
        // addSomeData();
        getTodaySprints(date);

    })

    // some dummy data
    async function addSomeData() {
        const falsedate = moment().add(1, 'days').format('YYYYMMDD');
        await addDoc(collection(db, "test3"), {
            username: "Khan",
            date: date,
            distance: 6.4,
            level: "Intermediate",
            pace: 17,
            path: [],
            time: "57:01",
            emoji: {
                heart: 0,
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
        if (today_sprints.length > 0) {
            isEmpty = false;
        }
        console.log(today_sprints);
    }

    function getChallenge(date) {
        if ($dailyChallenge.date === date) {
            return { metric: $dailyChallenge.metric, range: $dailyChallenge.range }
        } else {
            let m = Math.floor(Math.random() * 4);
            let r = Math.floor(Math.random() * 4);
            const newChallenge = { metric: m, range: r };
            dailyChallenge.set({
                date: date,
                ...newChallenge,
            });
            return newChallenge;
        }
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
{#if isEmpty}
    <div class="container mx-auto w-5/6 h-40 rounded-3xl shadow-lg pl-20 pt-12 mt-1">
        <h2 class="font-sans text-[20px] font-bold text-deep-gray">No Sprints Yet!</h2>
    </div>
{/if}
<h2 id="tdchallenge">Today's Challenge</h2>
<Challenge { ...challenge}/>

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

    #tdchallenge {
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

</style>