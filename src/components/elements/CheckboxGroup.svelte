<script lang="ts">

  export let options: { value: string, title: string, body: string }[];
  export let selected: string[];
</script>

<div>
  {#each options as { value, title, body }}
    <label>
      <span>
        <strong>{title}</strong>
        <sub>{body}</sub>
      </span>
      <input type='checkbox' bind:group={selected} name="checkbox" value={value}>
      <svg viewBox="0 0 64 64" height="20px" width="20px">
        <path
          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
          pathLength="575.0541381835938"></path>
      </svg>
    </label>
  {/each}
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
        /*margin-top: 20px;*/
        /*justify-content: space-evenly;*/
    }

    label {
        padding: 0 24px;
        height: 64px;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: space-between;
        border-radius: 18px;
        border: none;
        /*background: #FFFFFF;*/
        transition: background-color .1s ease;
    }

    label > span {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    strong {
        font-size: 16px;
        font-weight: 500;
        color: var(--black);
    }


    sub {
        color: var(--dark-gray);
        font-size: 12px;
        font-weight: 400;
    }

    label:has(input:checked) {
        background-color: var(--gray);
    }

    input {
        display: none;
    }

    svg {
        overflow: visible;
    }

    path {
        fill: none;
        stroke: var(--dark-gray);
        stroke-width: 6;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: stroke-dasharray 0.5s ease, stroke-dashoffset 0.5s ease, stroke 0.5s ease;
        stroke-dasharray: 241 9999999;
        stroke-dashoffset: 0;
    }

    input:checked + svg path {
        stroke: var(--black);
        stroke-dasharray: 70.5096664428711 9999999;
        stroke-dashoffset: -262.2723388671875;
    }
</style>
