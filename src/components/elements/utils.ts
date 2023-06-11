export const touch = e => e.changedTouches ? e.changedTouches[0] : e;

export const deltaX = (e, startX) => startX - touch(e).clientX;

export const deltaY = (e, startY) => {
  const y = startY - touch(e).clientY;
  return y > 0
    ? 0
    // ? (2 * y + 1) ** 0.5 - 1
    : y;
}
