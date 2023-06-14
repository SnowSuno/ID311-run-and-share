<script lang="ts">
  export let choices: Record<string, string>;
  export let selected: string | null;

</script>

<div>
  {#each Object.entries(choices) as [choice, label]}
    <button>
      <input type="radio" bind:group={selected} value={choice} id={choice}/>
      <label for={choice}>{label}</label>
    </button>
  {/each}
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 12px;
    }

    button {
        flex: 1;
        border-radius: var(--radius-sm);
        overflow: hidden;
    }
    label {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-block: 14px;
        width: 100%;
        background-color: var(--gray);
        color: var(--dark-gray);
        transition: background-color .1s ease-in-out;
        font-size: 14px;
        font-weight: 500;
    }


    button > input[type="radio"]:checked + label {
        background-color: var(--black);
        color: var(--white);
    }

    input[type="radio"] {
        display: none;
    }
</style>
