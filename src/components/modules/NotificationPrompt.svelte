<script>
  let show = (Notification.permission === "default");
  const prompt = () => {
    Notification.requestPermission(() => show = (Notification.permission === "default"))
  }
</script>

<!--{#if show}-->
  <dialog open>
    <button on:click={prompt}>Allow notifications</button>
    {Notification.permission}
  </dialog>
<!--{/if}-->

<style>
  dialog {
      z-index: 1000;
      width: 80%;
  }

  dialog::backdrop {
      background: rgba(0, 0, 0, 0.5);
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
  }
</style>
