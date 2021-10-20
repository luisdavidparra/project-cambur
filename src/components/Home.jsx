import { useHistory } from "react-router";
import { useDataContext } from "../context/DataContext";
import Carousel from "./Carousel";

const Home = () => {
  const { popularMovies, popularTv, searchByName } = useDataContext();
  

  const history = useHistory();

  if (searchByName) {
    history.push("/search");
  }

  return (
    <>
      {!popularMovies && !popularTv ? (
        <div className="text-center mt-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {popularMovies && (
            <>
              <h3 className="m-2">
                <b>Top Movies</b>
              </h3>
              <Carousel popularMovies={popularMovies} />
            </>
          )}
          {popularTv && (
            <>
              <h3 className="m-2 ">
                <b>Top Tv Shows</b>
              </h3>
              <Carousel popularTv={popularTv} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
