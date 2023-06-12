export function clickOutside (node) {
  const handleClick = (event) => {
    if (!node.contains(event.target)) {
      node.dispatchEvent(new CustomEvent("outclick"));
    }
  };

  document.getElementById("map")
    ?.addEventListener("click", handleClick, true);

  return () => {
    document.getElementById("map")
      ?.removeEventListener("click", handleClick, true);
  };
}
