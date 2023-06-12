<script>
    export let size = 16;
    export let color = "black";
    export let opacity = 1;
</script>


<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 16 16">
<path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" 
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round" 
      {opacity}
      />
</svg>