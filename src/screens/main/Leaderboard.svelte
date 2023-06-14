<script lang="ts">
  import { ButtonGroup, Flex, Spacer, Text } from "~/components/elements";
  import { friends, sprints } from "~/store";
  import { SprintCard } from "~/components/modules";
  import type { SprintDoc } from "~/firebase/collections";
  import { formatTime } from "~/utils/time";
  import { calculatePace } from "~/utils/pace";

  $: sprintData = $sprints?.map(s => s.data()) || [];

  const choices = {
    distance: "Distance",
    time: "Time",
    pace: "Pace",
  };
  let selected: keyof typeof choices = "distance";

  const getUser = (sprint: SprintDoc) => $friends.find(f => f.id === sprint.user.id)?.data();

  $: {
    console.log(selected);
    sprintData.sort((a, b) => {
      if (selected === "distance") {
        return b.distance - a.distance;
      } else if (selected === "time") {
        return b.time - a.time;
      } else {
        return (b.distance / b.time) - (a.distance / a.time);
      }
    });
    sprintData = sprintData;
  }

  $: value = (sprint: SprintDoc) => {
    if (selected === "distance") {
      return (sprint.distance / 1000).toFixed(1) + "km";
    } else if (selected === "time") {
      return formatTime(sprint.time);
    } else {
      return calculatePace(sprint.distance, sprint.time).toFixed(1) + "km/h";
    }
  };

</script>

<Text subheading>Rank by</Text>
<Spacer y={10}/>
<ButtonGroup bind:selected {choices}/>
<Spacer y={18}/>
<Flex gap={8}>
  {#each sprintData.slice(0, 10) as sprint, i}
    <div>
      <p>
        <span class="rank">{i + 1}</span>
        <span>{getUser(sprint)?.nickname}</span>
      </p>
      <span>{value(sprint)}</span>
    </div>
  {/each}
</Flex>
<Spacer y={80}/>

<style>
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        background-color: var(--gray);
        padding: 14px 20px;
        border-radius: var(--radius-sm);
        color: var(--dark-gray);
        font-size: 16px;
    }

    p {
        font-size: 17px;
        font-weight: 500;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: var(--black);
    }

    .rank {
        display: flex;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 12px;
        font-weight: 600;
        color: var(--dark-gray);
        justify-content: center;
        align-items: center;
    }

    div:first-child {
        background-color: #d7a133;
    }

    div:nth-child(2) {
        background-color: #afafaf;
    }

    div:nth-child(3) {
        background-color: #cc8b63;
    }

    div:nth-child(-n+3) {
        color: var(--white);
    }
    div:nth-child(-n+3) > p > span {
        color: var(--white);
    }
    div:nth-child(-n+3) .rank {
        background-color: rgba(255, 255, 255, 0.44);
    }
</style>
