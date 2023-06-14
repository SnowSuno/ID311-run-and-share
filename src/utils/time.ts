import type { Timestamp } from "firebase/firestore";

export const formatTime = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);

  console.log(seconds, minutes);

  const displaySeconds = seconds % 60;
  const displayMinutes = minutes % 60;

  const displayMinutesWithPadding = displayMinutes.toFixed().padStart(2, "0");
  const displaySecondsWithPadding = displaySeconds.toFixed().padStart(2, "0");

  return `${displayMinutesWithPadding}:${displaySecondsWithPadding}`;
};

export const formatElapsedTime = (time: Timestamp, now: number) => {
  const seconds = Math.floor(now / 1000 - time.seconds);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const format = (value: number, unit: string) => `${value} ${unit}${value > 1 ? "s" : ""} ago`

  if (years > 0) return format(years, "year");
  if (months > 0) return format(months, "month");
  if (weeks > 0) return format(weeks, "week");
  if (days > 0) return format(days, "day");
  if (hours > 0) return format(hours, "hour");
  if (minutes > 0) return format(minutes, "minute");
  if (seconds > 0) return format(seconds, "second");
  return "just now";
};
