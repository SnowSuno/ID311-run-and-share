<script lang="ts">
  import { Paper } from "~/components/elements";
  import { formatTime } from "~/utils/time";
  import { calculatePace } from "~/utils/pace";

  export let distance: number;
  export let time: number;

</script>


<Paper flex>
  <div class="summary">
    <h3>{(distance / 1000).toFixed(1)}<span>km</span></h3>
    <p>Distance</p>
  </div>
  <div class="summary">
    <h3>{formatTime(time)}</h3>
    <p>Time</p>
  </div>
  <div class="summary">
    <h3>{calculatePace(distance, time).toFixed(2)}<span>km/h</span></h3>
    <p>Pace</p>
  </div>
</Paper>


<style>
    .summary {
        flex: 1;
        text-align: center;
    }

    h3 {
        font-size: 22px;
        font-weight: 700;
    }

    h3 > span {
        font-size: 18px;
    }

    p {
        font-size: 14px;
        font-weight: 400;
        color: var(--dark-gray);
        padding-top: 4px;
    }
</style>
