import { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";
import './FavoritesPage.scss'
import { Media } from "../../types/Media";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState<Media[]>([])
    const [filterType, setFilterType] = useState<string>("")

  useEffect(() => {
      const savedFavorites: Media[] = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id: number) => {
    const updated = favorites.filter(item => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const filteredFavorites = filterType ? 
    favorites.filter(media => media.media_type === filterType) : favorites;

     return (
    <>
      <Header />
      <div className="container favorites-page">
        <h2 className="text-center pt-3 mb-4">Your Favorite Movies And TV Series</h2>

        <div className="filter d-flex justify-content-center pb-4">
          <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Series</option>
          </select>
        </div>

        {filteredFavorites.length === 0 ? (
          <div className="text-center pt-4">
            <p className="fs-4 mb-1">No favorites yet</p>
            <p className="text-secondary mb-4">Find something to watch and hit Favorite — it will show up here.</p>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <Link to='/movies' className="text-decoration-none">
                <Button className="btn-accent">Find Movies</Button>
              </Link>
              <Link to='/tv-series' className="text-decoration-none">
                <Button className="btn-accent-outline">Find TV Series</Button>
              </Link>
            </div>
          </div> ) :
            (<div className="row">
              {filteredFavorites.map((media) => (
              <div key={media.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card favorites-page__card h-100">
                  <img
                      src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
                      className="card-img-top"
                      alt={media.title || media.name}
                  />
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex gap-3">
                      <h5 className="card-title">{media.title || media.name}</h5>
                      <p className="card-type d-flex ">{media.media_type.toUpperCase()}</p>
                      </div>
                      
                      <p className="card-text">{media.release_date?.slice(0, 4) || media.first_air_date?.slice(0, 4)}</p>

                      <div className="card-buttons d-flex flex-column mt-auto"> 
                        <Link to={media.media_type === 'movie' ? `/movies/${media.id}` : `/tv-series/${media.id}`}>
                          <Button className="card-buttons-details w-100"
                          >
                            View Details
                          </Button>
                      </Link>

                      <Button
                      className="card-buttons-remove w-100"
                      onClick={() => removeFavorite(media.id)}
                      >
                      Remove
                      </Button>
                      </div>
                    
                  </div>
                </div>
              </div>
              ))}
            </div>)
      }
        
      </div>
    </>
  );


};

export default FavoritesPage;
