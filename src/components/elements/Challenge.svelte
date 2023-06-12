<script lang="ts">
    export let metric = 0;
    export let range = 0;

    const metrics = ["Distance", "Time", "Pace"];
    const distanceRange = [3, 4, 5];
    const timeRange = [30, 40, 50];
    const paceRange = [10, 12, 15];


</script>

<div class="container flex flex-col mx-auto w-5/6 rounded-3xl shadow-lg mt-2 justify-around items-center">
    <h3 class="font-sans text-[18px] italic font-bold text-deep-gray">
        Let's Sprint:
    </h3>
    <div class="flex flex-row w-5/6 h-1/2 mx-2 mb-5 p-2 items-end justify-evenly">
        <div class="font-sans text-[16px]/[24px] font-medium text-deep-gray">
            {metrics[metric]}
        </div>
        <div class="flex flex-row items-end gap-0.8">
            {#if metric == 0}
                <div class="font-sans text-[30px]/[36px] font-bold text-black">
                    {distanceRange[range]}</div>
                <div class="font-sans text-[24px]/[30px] font-bold text-black">
                    km</div>
            {/if}
            {#if metric == 1}
                <div class="font-sans text-[30px]/[36px] font-bold text-black">
                    {timeRange[range]}</div>
                <div class="font-sans text-[24px]/[30px] font-bold text-black">
                    m</div>
            {/if}
            {#if metric == 2}
                <div class="font-sans text-[30px]/[36px] font-bold text-black">
                    {paceRange[range]}</div>
                <div class="font-sans text-[24px]/[30px] font-bold text-black">
                    km/h</div>
            {/if}
        </div>
    </div>
</div>