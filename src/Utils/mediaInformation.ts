import { formatRuntime } from "./Runtime";

export const getReleaseYear = (date: string) => {
      return date ? date.slice(0, 4) : '';
};

export const getRuntime = (
  mediaType: "movie" | "tv",
  { runtime, number_of_seasons, number_of_episodes }: 
  { runtime?: number; number_of_seasons?: number; number_of_episodes?: number }
) => {
  if (mediaType === "movie") return formatRuntime(runtime || 0);
  return `${number_of_seasons || 0} Season${number_of_seasons !== 1 ? "s" : ""} 
    • 
  ${number_of_episodes || 0} Episode${number_of_episodes !== 1 ? "s" : ""}`;
};
