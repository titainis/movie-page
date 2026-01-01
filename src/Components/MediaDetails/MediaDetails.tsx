import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import './MediaDetails.scss';
import Button from "../Button/Button";
import BackArrow from '../../assets/white-arrow.png';
import { Media } from "../../types/Media";
import { MediaProps } from "../../types/MediaProps";
import { getReleaseYear, getRuntime, getTitle } from '../../Utils/mediaInformation';

const MovieDetails = ({ mediaType }: MediaProps) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const { id } = useParams();

    const VIDEO_API = `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}`;
    const DETAILS_API = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`;

    const [mediaDetails, setMediaDetails] = useState<Media| null>(null);
    const [mediaVideo, setMediaVideo] = useState<Media[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const navigate = useNavigate();

    const descriptionRef = useRef<HTMLElement | null>(null);

    const fetchMoviesDetails = async () => {
        const response = await fetch(DETAILS_API);
        const data = await response.json();
        setMediaDetails(data);
    };

    const fetchMoviesVideo = async () => {
        const response = await fetch(VIDEO_API);
        const data = await response.json();
        setMediaVideo(data.results || []);
    }

    useEffect(() => {
        fetchMoviesDetails();
        fetchMoviesVideo();
    }, [id]);

    useEffect(() => {
        if (!mediaDetails) return;
        const favorites: Media[] = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorite(favorites.some(fav => fav.id === mediaDetails.id));
    }, [mediaDetails]);

    const trailer = mediaVideo.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    const scrollToDescription = () => {
      descriptionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleFavorite = () => {
        if (!mediaDetails) return;
        const favorites: Media[] = JSON.parse(localStorage.getItem("favorites") || "[]");
        console.log(favorites)

        if (isFavorite) {
            const updated = favorites.filter(fav => fav.id !== mediaDetails.id);
            localStorage.setItem("favorites", JSON.stringify(updated));
            setIsFavorite(false);
        } else {
            
            const mediaWithType = { ...mediaDetails, media_type: mediaType };
            favorites.push(mediaWithType);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(true);
            }

        setNotification(isFavorite ? "Removed From Favorites" : "Added To Favorites");

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };
    
    return (
        <div className="movie-details-container pb-5">
            {mediaDetails && (
                <div className="movie-details position-relative">
                    {trailer && (
                        <div className="movie-details__video">
                            <iframe
                              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}&showinfo=0&rel=0&modestbranding=1`}
                              title={trailer.name}
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                              tabIndex={-1}
                            ></iframe>
                        </div>
                    )}
                    
                    <Button className="back-btn position-fixed top-0 m-3 bg-transparent border-none" onClick={() => navigate(-1)}>
                        <img src={BackArrow} alt="BackArrow" width={20} height={20} className=""/>
                    </Button>
              
                    <div className="movie-details__card">
                        <h2 className="movie-details__card-title">{getTitle(mediaDetails.name || mediaDetails.title)}</h2>
                        <p>{getReleaseYear(mediaDetails.first_air_date || mediaDetails.release_date)}</p>
                        <p>{getRuntime(mediaType, mediaDetails)}</p>
                        <img src={`https://image.tmdb.org/t/p/w500/${mediaDetails.poster_path}`} alt={getTitle(mediaDetails.name || mediaDetails.title)} />
                        <div className="movie-details__card-imdb pt-3"> 
                            <span>IMDB:</span> {mediaDetails.vote_average < 1 ? ( 
                                "Not rated yet"
                            ) : ( 
                                <span>{mediaDetails.vote_average.toFixed(1)}</span>
                           )}
                        </div>

                        <div className="movie-details__card-description-button pt-2">
                            <Button onClick={scrollToDescription}>Description</Button>
                        </div>
                    </div>
                </div>
            )}

            <section ref={descriptionRef} className="movie-description pt-5">
                <div className="movie-description__overview d-flex flex-column justify-content-center align-items-center text-align-center">
                    <h2 className="pb-2">Description</h2>
                    <p className="text-center w-75">{mediaDetails?.overview}</p>
                    <h3>Genres</h3>
                    <p className="pb-2">{mediaDetails?.genres?.map(g => g.name).join(", ")}</p>

                    <Button className={`movie-description__button ${isFavorite === true ? 'movie-description__button-unfavorite' : 'movie-description__button-favorite'}`} 
                      onClick={toggleFavorite}
                    >
                        {isFavorite ? "Favorited" : 'Favorite'}
                    </Button>
                </div>
            </section>

            {notification && (
              <Link to='/favorites' className={`pop-up ${isFavorite === true ? 'add' : 'remove'} 
                  d-flex flex-column align-items-center justify-content-center text-decoration-none`}>
                <p className="m-0">{notification}</p>
                <p className="m-0">Go to Favorites</p>
              </Link>
            )}
            
        </div>
    );
};

export default MovieDetails;
