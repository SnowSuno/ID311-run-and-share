export const calculatePace = (distance: number, milliseconds: number) => {
  return milliseconds ? distance / (milliseconds / 3600) : 0;
}
