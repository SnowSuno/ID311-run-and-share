<script lang="ts">
  import { push } from "~/lib/stack-router";

  import { Flex, MainButton, Sheet, Spacer, Text } from "~/components/elements";
  import { sprint, sprintActions } from "~/store/sprint";
  import { SprintDisplay } from "~/components/modules";
  import { time } from "~/store";

  $: if ($sprint.endTime) push("/result");
</script>

<Sheet top>
  <Spacer y={20}/>
  <Text heading>Daily Sprint</Text>
</Sheet>
<Sheet bottom>
  <Flex>
    <Text subheading>Current Sprint</Text>
    <SprintDisplay
      distance={$sprint.distance}
      time={Math.max($time - $sprint.startTime.getTime(), 0)}
    />
    <MainButton on:click={sprintActions.stop}>
      Stop
    </MainButton>
  </Flex>
</Sheet>
