import Header from "../../Components/Header/Header";
import LatestMedia from "../../Components/LatestMedia/LatestMedia";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import MediaSlider from "../../Components/MediaSlider/MediaSlider";

const MoviesPage = () => {
    return (
        <>
          <Header />

          <div className="fluid-container movies-page pt-5 h-100vh pb-5 position-relative">
            <section className="movies-page__trending-movies pt-5">
              <h1 className="movie-page__trending d-flex justify-content-center">Trending Movies</h1>
              <div className="movies-page__trending-movie-card d-flex flex-wrap pt-4 p-5 justify-content-center">
                  <MediaSlider mediaType="movie"/>
              </div>
            </section>

            <section className="movies-page__latest-movies pt-4">
              <h1 className="movies-page__latest d-flex justify-content-center">Latest Movies</h1>
                <div className="movies-page__latest-movie-card d-flex flex-wrap p-5 gap-5 justify-content-center">
                  <LatestMedia mediaType="movie" />
                </div>
            </section>

              <div className="position-fixed bottom-0 pb-3 translate-middle-x start-50">
                <Link to="/movies/all-movies">
                  <Button className="btn-accent-outline bg-black">See All Movies</Button>
                </Link>
              </div>

          </div>


        </>
    );
}

export default MoviesPage;
