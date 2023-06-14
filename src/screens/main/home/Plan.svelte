<script lang="ts">
  import { slide } from "svelte/transition";
  import { sprintActions } from "~/store/sprint";
  import { stackLink } from "~/lib/stack-router";
  import RightChevron from "~/assets/icons/RightChevron.svelte";
  import { selectedRoute } from "~/store/selectedRoute";
  import { ButtonGroup, CheckboxGroup, MainButton, RouteDisplay, Spacer } from "~/components/elements";
  import { pop } from "svelte-spa-router";
  import Text from "~/components/elements/Text.svelte";
  import { filter, filteredSprints } from "~/store";
  import { SprintDisplay } from "~/components/modules";
  import { onMount } from "svelte";

  onMount(() => selectedRoute.set(null));

  const filterTypes = {
    distance: "Distance",
    time: "Time",
    level: "Level",
  };
  let filterType: keyof typeof filterTypes | null = null;

  let distanceString: string = ""; // kilometers
  let time: number = 0; // seconds
  let levels: ("beginner" | "intermediate" | "expert")[] = []; // levels

  $: {
    if (!filterType) filter.set({});
    if (filterType === "distance") filter.set({ distance: distanceString ? parseInt(distanceString) * 1000 : 0 });
    if (filterType === "time") filter.set({ time: time * 1000 });
    if (filterType === "level") filter.set({ level: levels });
  }

  const levelOptions = [
    { title: "Beginner", body: "~ 12km/h", value: "beginner" },
    { title: "Intermediate", body: "12km/h ~ 20km/h", value: "intermediate" },
    { title: "Expert", body: "20km/h ~", value: "expert" },
  ];

  const start = () => {
    sprintActions.start();
    pop();
  };

  let timeString = "00:00";
  const formatTimeInput = (input: string) => {
    const num = ("0000" + input)
      .replaceAll(/\D/g, "")
      .replace(":", "")
      .slice(-4);

    const formatted = num.slice(0, 2) + ":" + num.slice(2, 4);
    const [hours, minutes] = limitMax(formatted);
    time = hours * 3600 + minutes * 60;
    return formatted;
  };

  const limitMax = (input: string) => {
    const [hourString, minuteString] = input.split(":");
    const hours = parseInt(hourString);
    const minutes = Math.min(parseInt(minuteString), 59);

    return [hours, minutes];
  };

</script>

<main>
  <Text heading>Search for routes</Text>
  <Text subheading>Search by</Text>

  <Spacer y={6}/>
  <ButtonGroup bind:selected={filterType} choices={filterTypes}/>

  {#if filterType}
    {#key filterType}
      <section transition:slide>
        {#if filterType === 'distance'}
          <input type="number" bind:value={distanceString} inputmode="decimal">
          <span>km</span>
        {:else if filterType === 'time'}
          <input
            type="text"
            bind:value={timeString}
            on:input={() => timeString = formatTimeInput(timeString)}
            on:blur={() => timeString = limitMax(timeString).map(s => s.toString().padStart(2, "0")).join(":")}
            inputmode="numeric"
          >
          <span style="color: #ccc; font-size: 22px">HH:MM</span>
        {:else if filterType === 'level'}
          <CheckboxGroup
            options={levelOptions}
            selected={levels}
          />
        {/if}
      </section>
    {/key}
  {/if}

  <Spacer y={18}/>

  <Text subheading>Discover Routes</Text>
  <Spacer y={6}/>
  <a href="/plan/suggest" use:stackLink>
    <span><strong>{$filteredSprints.length}</strong> suggested routes</span>
    <RightChevron color="var(--dark-gray)"/>
  </a>
  <Spacer y={6}/>
  <RouteDisplay route={$selectedRoute?.route}/>

  <Spacer y={6}/>
  {#if $selectedRoute}
    <SprintDisplay
      distance={$selectedRoute.distance}
      time={$selectedRoute.time}
    />
  {/if}

  <Spacer y={100}/>

  <!--{#if $selectedPath.length !== 0}-->
  <!--  <div class="sprint-info">-->
  <!--    <div>-->
  <!--      <h6>{Math.round($selectedPath[0].distance * 100) / 100}km</h6>-->
  <!--      <span>distance</span>-->
  <!--    </div>-->
  <!--    <div>-->
  <!--      <h6>{Math.round($selectedPath[0].time / (60 * 1000))}m</h6>-->
  <!--      <span>Time</span>-->
  <!--    </div>-->
  <!--    <div>-->
  <!--      <h6>{Math.round(($selectedPath[0].distance / ($selectedPath[0].time / (3600 * 1000))) * 100) / 100}km/h</h6>-->
  <!--      <span>Pace</span>-->
  <!--    </div>-->
  <!--  </div>-->
  <!--{/if}-->
  <MainButton float on:click={start}>
    {$selectedRoute
      ? "Start"
      : "Start without setting path"
    }
  </MainButton>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        overflow: scroll;
    }

    section {
        padding: 20px 0;
    }

    section > * {
        font-size: 32px;
        font-weight: 700;
    }

    section > input {
        font-size: 36px;
    }

    input {
        margin-top: auto;
        height: fit-content;
        width: 150px;
        border: none;
        border-bottom: 3px solid #000000;

        padding-left: 4px;
        padding-bottom: 2px;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        text-decoration: none;
        background-color: var(--gray);
        color: var(--dark-gray);
        border-radius: var(--radius-md);
    }

    strong {
        color: var(--black);
        font-weight: 600;
    }
</style>
