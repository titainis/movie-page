import Button from "../../Button/Button";
import './SearchBar.scss';
import SearchIcon from '../../../assets/SearchIcon/search_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
import { useEffect, useState } from "react";
import { Search } from "../../../types/Search";
import { useNavigate } from "react-router-dom";
import { titleCrop } from "../../../Utils/titleCrop";
import { tmdb } from "../../../Utils/tmdb";

const SearchBar = ({ isVisible}: {isVisible: boolean}) => {
  const [searchResults, setSearchResults] = useState<Search[]>([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const SearchAPI = async (q: string) => {
    const data = await tmdb(`search/multi?query=${encodeURIComponent(q)}`);
    setSearchResults(data.results || []);
  }

  const resultsByPopularity = [...searchResults].sort((a, b) => b.popularity - a.popularity);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query)
        SearchAPI(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query])

  useEffect(() => {
    if(!isVisible) {
      setSearchResults([]);
    }
  }, [isVisible]);


  return (
    <div className="search">
      <div> 
        <input 
          className='search__input' 
          name="Search" 
          type="text" 
          placeholder="Search"
          onChange={(e) => {
            setQuery(e.target.value);
          }} 
        />
        <Button className="search__btn" onClick={() => SearchAPI(query)}>
          <img className="search__icon"
            src={SearchIcon}
            alt="Search" 
          />
        </Button>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <div className="p-2">
            <ul className="search-results__list d-flex flex-column gap-1 p-0 m-0">
              {resultsByPopularity.map(item => (
                <li
                  className="search-results__list-item d-flex align-items-center"
                  key={item.id}
                  onClick={() => item.media_type === 'movie' ? navigate(`/movies/${item.id}`) : navigate(`/tv-series/${item.id}`)}
                >
                  {item.poster_path ? (
                    <img
                      className="search-results__list-item-img"
                      src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                      alt={item.title || item.name}
                    />
                  ) : (
                    <div className="search-results__list-item-img search-results__list-item-img--empty">🎬</div>
                  )}

                  <div className="search-results__list-item-info d-flex flex-column">
                    <p className="search-results__list-item-title">{titleCrop((item.title || item.name), 20)}</p>
                    <p>
                      {item.media_type === "movie"
                        ? item.release_date?.slice(0, 4) || "Upcoming"
                        : item.first_air_date?.slice(0, 4) || "Upcoming"}
                    </p>

                    <p className="search-results__list-item-type">
                      {item.media_type === "movie" ? "Movie": "TV"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}

export default SearchBar;
