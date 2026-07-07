import Header from "../../Components/Header/Header";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import LatestMedia from "../../Components/LatestMedia/LatestMedia";
import MediaSlider from "../../Components/MediaSlider/MediaSlider";

const SeriesPage = () => {
    return (
        <>
          <Header />

          <div className="fluid-container series-page pt-5 h-100vh pb-5 position-relative">
            <section className="series-page__trending-movies pt-5">
              <h1 className="series-page__trending d-flex justify-content-center">Trending TV Series</h1>
              <div className="series-page__trending-movie-card d-flex flex-wrap pt-4 p-5 justify-content-center">
                  <MediaSlider mediaType="tv" />
              </div>
            </section>

            <section className="movies-page__latest-movies pt-4">
              <h1 className="movies-page__latest d-flex justify-content-center">Latest TV Series</h1>
                <div className="movies-page__latest-movie-card d-flex flex-wrap p-5 gap-5 justify-content-center">
                    <LatestMedia mediaType="tv" />
                </div>
            </section>

            <div className="position-fixed bottom-0 pb-3 translate-middle-x start-50">
                <Link to="/tv-series/all-series">
                  <Button className="border-2 border-primary bg-black text-white px-3 py-1 rounded-4">See All Series</Button>
                </Link>
              </div>
          </div>


        </>
    );
}

export default SeriesPage;