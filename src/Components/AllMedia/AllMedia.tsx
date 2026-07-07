import { useState } from "react";
import MediaCard from "../MediaCard/MediaCard";
import { Link } from "react-router-dom";
import { MediaProps } from "../../types/MediaProps";
import Pagination from "../Pagination/Pagination";
import { tmdb } from "../../Utils/tmdb";
import './AllMedia.scss';

const AllMedia = ({ mediaType }: MediaProps) => {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("popularity.desc");

  const fetchAllMedia = async (page: number) => {
    const YearByType = year ? `&${mediaType === 'movie' ? 'year' : 'first_air_date_year'}=${year}` : "";
    const genres = genre ? `&with_genres=${genre}` : "";

    const data = await tmdb(`discover/${mediaType}?sort_by=${sort}${genres}${YearByType}&page=${page}`);

    return {
      results: data.results || [],
      total_pages: data.total_pages || 1
    };
  };

  return (
    <div className="media-list-component w-100 pb-5">
      <div className="filters d-flex gap-3 mb-4 justify-content-center flex-wrap">
        <select onChange={(e) => setGenre(e.target.value)} className="form-select w-auto">
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          {mediaType === 'movie' && <option value="27">Horror</option>}
          {mediaType === 'movie' && <option value="10749">Romance</option>}
          <option value="14">Fantasy</option>
          {mediaType === 'tv' && <option value="10759">Action & Adventure</option>}
          {mediaType === 'tv' && <option value="16">Animation</option>}
        </select>

        <input 
          type="number" 
          placeholder="Year" 
          value={year} 
          onChange={(e) => { 
            if(e.target.value.length <= 4) setYear(e.target.value) 
          }} 
          onBlur={(e) => {
            const value = e.target.value;
            if (value && (parseInt(value) < 1900 || parseInt(value) > new Date().getFullYear())) {
              setYear('');
            }
          }}
          className="filter-input form-control"
          min="1900"
          max={new Date().getFullYear()}
        />

        <select onChange={(e) => setSort(e.target.value)} className="form-select w-auto">
          <option value="popularity.desc">Most Popular</option>
          <option value="vote_average.desc">Highest Rated</option>
          <option value='release_date.desc'>Newest</option>
        </select>
      </div>

      <Pagination 
        key={`${genre}-${year}-${sort}-${mediaType}`}
        fetchFunction={fetchAllMedia}
        renderItem={(media) => (
          <Link 
            to={mediaType === 'movie' ? `/movies/${media.id}` : `/tv-series/${media.id}`}
          >
            <MediaCard media={media} />
          </Link>
        )}
      />
    </div>
  );
}

export default AllMedia;