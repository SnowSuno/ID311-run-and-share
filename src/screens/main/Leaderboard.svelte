<script lang="ts">
    import "~/app.css";
    import { onMount } from 'svelte'
    import { db } from '~/utils/firebase'
    import moment from 'moment'
    import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
    import Icon from '@iconify/svelte';

    // variable
    let today_sprints = [];
    let date;
    let isEmpty = true;
    let popup = false;

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
            user: "suno",
            date: date,
            distance: 5.4,
            level: "expert",
            pace: 17,
            path: [],
            time: "52:01",
            emoji: {
                heart: 4,
                fire: 0,
            }
        });
    }

    // get today's data
    async function getTodaySprints(today){
        const q = query(collection(db, 'test3'), where("date", "==", today));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            today_sprints.push(doc.data());
        });
        isEmpty = false;
        console.log(today_sprints);
    }

    // $: if (today_sprints.length !== 0) {
    //     isEmpty = false;
    // } else {
    //     isEmpty = true;
    // }

    function emojiPopup() {
        console.log("popup");
    }
    
</script>
    

<h1 class="font-sans text-[28px]/[34px] font-bold text-black ml-6 mt-6">Leaderboard</h1>

<h2 id="tdsprints">Today's Sprints</h2>
{#key isEmpty}
    <div class="tdcard_wrapper">
        {#each today_sprints as {user, distance, pace, time, path, emoji}}
            <div class="td_card">
                <div class="user_info">{user}</div>
                <div class="data">
                    <div class="w-full flex flex-row items-end justify-between">
                        <div class="font-sans text-[8px]/[12px] font-medium text-deep-gray ">
                            Distance</div>
                        <div class="flex flex-row items-end gap-0.5">
                            <div class="font-sans text-[15px]/[18px] font-bold text-black">
                                {distance}</div>
                            <div class="font-sans text-[12px]/[15px] font-bold text-black">
                                km</div>
                        </div>
                    </div>
                    <div class="w-full flex flex-row items-end justify-between">
                        <div class="font-sans text-[8px]/[12px] font-medium text-deep-gray ">
                            Time</div>
                        <div class="flex flex-row items-end gap-0.5">
                            <div class="font-sans text-[15px]/[18px] font-bold text-black">
                                {time}</div>
                            <div class="font-sans text-[12px]/[15px] font-bold text-black">
                                m</div>
                        </div>
                    </div>
                    <div class="w-full flex flex-row items-end justify-between">
                        <div class="font-sans text-[8px]/[12px] font-medium text-deep-gray ">
                            Pace</div>
                        <div class="flex flex-row items-end gap-0.5">
                            <div class="font-sans text-[15px]/[18px] font-bold text-black">
                                {pace}</div>
                            <div class="font-sans text-[12px]/[15px] font-bold text-black">
                                km/h</div>
                        </div>
                    </div>
                </div>
                <div class="w-full flex flex-row justify-between items-center my-4">
                    <div class="flex flex-row gap-1.5">
                        {#if emoji.heart > 0}
                            <div class="flex flex-row items-center gap-0.5">
                                <Icon icon="noto:red-heart" width="14" />
                                <div class="font-sans text-[10px]/[12px] font-normal text-deep-gray">
                                    {emoji.heart}
                                </div> 
                            </div>
                        {/if}
                        {#if emoji.fire > 0}
                            <div class="flex flex-row items-center gap-0.5">
                                <Icon icon="noto:fire" width="15" />
                                <div class="font-sans text-[10px]/[12px] font-normal text-deep-gray">
                                    {emoji.fire}
                                </div>
                            </div>
                        {/if}
                    </div>
                    <button on:click={emojiPopup} class="popup_button">
                        <Icon icon="ri:more-line" color="#ababab" width="14" height="14" />
                    </button>
                </div>
            </div>
        {/each}
    </div>
{/key}

<style lang="postcss">

    #tdsprints {
        width: 310px;
        height: 25px;
        margin-left: 7%;
        margin-top: 10%;

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
        margin-top: 5%;
    }

    .td_card {
        display: inline-block;
        flex-direction: column;
        align-items: flex-start;
        padding: 17px 12px 14px;
        gap: 15px;
        margin-right: 10px;

        width: 150px;
        height: 191px;

        background: #FFFFFF;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
        border-radius: 18px;
    }

    .td_card > .user_info {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;

        color: #000000;
    }

    .td_card > .data {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 8px 15px;
        gap: 5px;
        margin-top: 20px;

        width: 126px;
        height: 86px;

        background: #F8F8F8;
        border-radius: 14px;
    }

    .td_card > .emojis {

    }

    .popup_button {
        cursor: pointer;
    }
    
</style>