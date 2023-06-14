<script lang="ts">
  import { push } from "~/lib/stack-router";

  import { MainButton, Sheet, Spacer, Text } from "~/components/elements";
  import { sprint, sprintActions } from "~/store/sprint";
  import { SprintDisplay } from "~/components/modules";
  import { time } from "~/store";

  const stop = () => {
    sprintActions.stop();
    push("/result");
  };
</script>

<Sheet top>
  <Spacer y={20}/>
  <Text heading>Daily Sprint</Text>
</Sheet>
<Sheet bottom>
  <div class="sheet-container">
    <Text subheading>Current Sprint</Text>
    <SprintDisplay
      distance={$sprint.distance}
      time={Math.max($time - $sprint.startTime.getTime(), 0)}
    />
    <MainButton on:click={stop}>
      Stop
    </MainButton>
  </div>
</Sheet>

<style>
    .sheet-container {
        display: flex;
        flex-direction: column;
        gap: 14px;
    }
</style>
