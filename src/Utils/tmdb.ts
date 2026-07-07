const key = import.meta.env.VITE_API_KEY;
// ponytail: supports both TMDB credential types — v4 read token (Bearer header) or v3 key (query param)
const isV4Token = key?.startsWith("eyJ");

export const tmdb = async (path: string) => {
  const sep = path.includes("?") ? "&" : "?";
  const url = `https://api.themoviedb.org/3/${path}${isV4Token ? "" : `${sep}api_key=${key}`}`;
  const response = await fetch(url, isV4Token ? { headers: { Authorization: `Bearer ${key}` } } : undefined);
  return response.json();
};
