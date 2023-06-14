export const calculatePace = (distance: number, milliseconds: number) => {
  return distance / (milliseconds / 3600);
}
