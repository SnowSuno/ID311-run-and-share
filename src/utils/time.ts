export const formatTime = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);

  console.log(seconds, minutes);

  const displaySeconds = seconds % 60;
  const displayMinutes = minutes % 60;

  const displayMinutesWithPadding = displayMinutes.toFixed().padStart(2, "0");
  const displaySecondsWithPadding = displaySeconds.toFixed().padStart(2, "0");

  return `${displayMinutesWithPadding}:${displaySecondsWithPadding}`;
}
