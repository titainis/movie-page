import { Link } from "react-router-dom";
import AllMedia from "../../Components/AllMedia/AllMedia";
import Header from "../../Components/Header/Header";
import Button from "../../Components/Button/Button";
import { MediaProps } from "../../types/MediaProps";

const AllMediaPage = ({ mediaType }: MediaProps) => {
    return (
        <>
            <Header />
            <section className="d-flex flex-column height-100vh pt-60">
                <h2 className="text-center pt-2">{mediaType === 'movie' ? 'All Movies' : 'All Series'}</h2>
                <div className="all-movies__container ">
                    <AllMedia mediaType={mediaType} />
                </div>

                <div className="position-fixed bottom-0 pb-3 translate-middle-x start-50">
                <Link to={mediaType === 'movie' ? '/movies' : '/tv-series'}>
                  <Button className="btn-accent-outline bg-black">{mediaType === 'movie' ? 'See Newest Movies' : "See Newest Series"}</Button>
                </Link>
              </div>
            </section>
        </>
    )
}

export default AllMediaPage;
