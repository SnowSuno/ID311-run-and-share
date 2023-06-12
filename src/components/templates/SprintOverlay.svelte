<script lang="ts">
  import { push } from "~/lib/stack-router";

  import { MainButton, Sheet, Spacer, Text } from "~/components/elements";
  import { sprintActions } from "~/store/sprint";

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
  <Spacer y={160}/>
  <MainButton on:click={stop}>
    Stop
  </MainButton>
</Sheet>
