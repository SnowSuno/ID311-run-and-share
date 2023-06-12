<script>
    import Icon from '@iconify/svelte';
    import { db } from '~/firebase/config'
    import { doc, updateDoc } from "firebase/firestore";
    import ProfileSide from "../../components/elements/ProfileSide.svelte";
    import { friends } from "~/store";

    export let docId = "";
    export let username = "dummy";
    export let distance = 2.1;
    export let pace = 10;
    export let time = "10:00";
    export let path = [];
    export let emoji = {
        heart: 0,
        fire: 0,
        clap: 0,
    };
    export let showPopup = false;

    let heart_n = emoji.heart;
    let fire_n = emoji.fire;
    let clap_n = emoji.clap;

    function emojiPopup() {
        console.log("popup");
        showPopup = !showPopup;
    }

    async function clickHeart() {
        console.log("heart");
        heart_n += 1;
        const docRef = doc(db, "test3", docId);
        await updateDoc(docRef, {
            emoji: {
                heart: heart_n,
                fire: fire_n,
                clap: clap_n,
            }    
        });
    }

    async function clickFire() {
        console.log("fire");
        fire_n += 1;
        const docRef = doc(db, "test3", docId);
        await updateDoc(docRef, {
            emoji: {
                heart: heart_n,
                fire: fire_n,
                clap: clap_n,
            }    
        });
    }

    async function clickClap() {
        console.log("clap");
        clap_n += 1;
        const docRef = doc(db, "test3", docId);
        await updateDoc(docRef, {
            emoji: {
                heart: heart_n,
                fire: fire_n,
                clap: clap_n,
            }    
        });
    }

// <div class="user_info">{user}</div>
</script>

<div class="card_n_popup">
    <div class="td_card">
        {#each $friends as user}
            {#if user.nickname === username}
                <ProfileSide { user }/>
            {/if}
        {/each}
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
                {#if heart_n > 0}
                    <div class="flex flex-row items-center gap-0.5">
                        <Icon icon="noto:red-heart" width="14" />
                        {#key heart_n}
                            <div class="font-sans text-[10px]/[12px] font-normal text-deep-gray">
                                {heart_n}
                            </div>
                        {/key}
                    </div>
                {/if}
                {#if fire_n > 0}
                    <div class="flex flex-row items-center gap-0.5">
                        <Icon icon="noto:fire" width="15" />
                        {#key fire_n}
                            <div class="font-sans text-[10px]/[12px] font-normal text-deep-gray">
                                {fire_n}
                            </div>
                        {/key}
                    </div>
                {/if}
                {#if clap_n > 0}
                    <div class="flex flex-row items-center gap-0.5">
                        <Icon icon="twemoji:clapping-hands" width="15" />
                        {#key clap_n}
                            <div class="font-sans text-[10px]/[12px] font-normal text-deep-gray">
                                {clap_n}
                            </div>
                        {/key}
                    </div>
                {/if}
            </div>
            <button on:click={emojiPopup} class="popup_button">
                <Icon icon="ri:more-line" color="#ababab" width="14" height="14" />
            </button>
        </div>
    </div>
    {#if showPopup}
        <div class="popup">
            <div class="flex flex-row items-center z-2000 p-3 justify-between">
                <button on:click={clickHeart}>
                    <Icon icon="noto:red-heart" width="14"/>
                </button>
                <button on:click={clickFire}>
                    <Icon icon="noto:fire" width="15" />
                </button>
                <button on:click={clickClap}>
                    <Icon icon="twemoji:clapping-hands" width="15" />
                </button>
            </div>
        </div>
    {/if}
</div>

<style lang="postcss">

    .card_n_popup {
        display: inline-block;
        position: relative;
        flex-direction: row;
        align-items: flex-start;
        gap: 5px;
        margin-right: 10px;
        margin-bottom: 10px;
        padding: 5px;
        width: 160px;
        height: 200px;
    }

    .td_card {
        /* display: inline-block; */
        position: absolute;
        flex-direction: column;
        align-items: flex-start;
        padding: 17px 12px 14px;
        /* gap: 15px;
        margin-right: 10px; */

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
        margin-top: 10px;

        width: 126px;
        height: 86px;

        background: #F8F8F8;
        border-radius: 14px;
    }

    .popup_button {
        cursor: pointer;
        position: relative;
        z-index: 10;
    }

    .popup {
        position: absolute;
        left: 37%;
        top: 57%;
        z-index: 1000;
        background: #ffffff;
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        margin: 5%;
        width: 100px;
        height: 40px;
    }

    .popup::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 70%;
        width: 0;
        height: 0;
        border: 7px solid transparent;
        border-top-color: #ffffff;
        border-bottom: 0;
        margin-left: -7px;
        margin-bottom: -7px;
    }

</style>