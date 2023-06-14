<div>
  <slot></slot>
</div>

<style>
    div {
        margin-inline: calc(-1 * var(--inline));
        padding-inline: var(--inline);
        display: flex;
        flex-direction: row;
        gap: 12px;

        overflow-x: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    div::-webkit-scrollbar {
        display: none;
    }
</style>
