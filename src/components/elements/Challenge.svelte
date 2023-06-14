<script lang="ts">
    export let metric = 0;
    export let range = 0;

    const metrics = ["Distance", "Time", "Pace"];
    const distanceRange = [3, 4, 5];
    const timeRange = [30, 40, 50];
    const paceRange = [10, 12, 15];


</script>

<div class="container flex flex-row mx-auto w-5/6 rounded-3xl shadow-lg mt-2 p-5 justify-between items-center">
    <h3 class="font-sans text-[14px] italic font-medium text-deep-gray">
        Let's Sprint
    </h3>
    <div class="bg-deep-gray w-6 h-[1px]"></div>
    <div class="bg-deep-gray rounded-xl p-2 px-5">
        <div class="font-sans text-[16px]/[24px] font-medium text-white">
            {metrics[metric]}
        </div>
    </div>
    <div class="flex flex-row items-end gap-0.8">
        {#if metric == 0}
            <div class="bg-black rounded-xl p-2 px-5">
                <div class="font-sans text-[16px]/[24px] font-medium text-white">
                    {distanceRange[range]}km</div>
            </div>
        {/if}
        {#if metric == 1}
            <div class="bg-black rounded-lg p-2 px-5">
                <div class="font-sans text-[16px]/[24px] font-medium text-white">
                    {timeRange[range]}m</div>
            </div>
        {/if}
        {#if metric == 2}
            <div class="bg-black rounded-lg p-2 px-5">
                <div class="font-sans text-[16px]/[24px] font-medium text-white">
                    {paceRange[range]}km/h</div>
            </div>
        {/if}
    </div>
</div>