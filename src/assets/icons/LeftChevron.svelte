<script>
  export let size = 28;
  export let color = "black";
  export let opacity = 1;
</script>

<svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 19.5L8.5 12.5L15.5 5.5" stroke={color} stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" {opacity}/>
</svg>
