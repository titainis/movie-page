import { useEffect, useState } from "react";
import { Media } from "../../types/Media";
import { Link } from "react-router-dom";
import MediaCard from "../MediaCard/MediaCard";
import { MediaProps } from "../../types/MediaProps";
import { tmdb } from "../../Utils/tmdb";

const ENDPOINT = { movie: "movie/now_playing", tv: "tv/airing_today" };

const LatestMedia = ({ mediaType }: MediaProps) => {
  const [items, setItems] = useState<Media[]>([]);

  useEffect(() => {
    tmdb(ENDPOINT[mediaType]).then((data) => setItems(data.results || []));
  }, [mediaType]);

  return (
    <>
      {items.map((item) => (
        <Link key={item.id} to={`/${mediaType === "movie" ? "movies" : "tv-series"}/${item.id}`}>
          <MediaCard media={item} />
        </Link>
      ))}
    </>
  );
};

export default LatestMedia;
