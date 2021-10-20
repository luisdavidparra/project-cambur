import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { GetMovieById } from "../services/GetMovies";

const CardMovie = ({ movie }) => {
  const { user, setUserMoviesWatchList, setUserMoviesWatched } = useDataContext();
  const [watchedIcon, setWatchedIcon] = useState("images/no_watched.png");
  const [toWatchIcon, setToWatchIcon] = useState("images/no_listed.png");

  const saveWatchedMovie = async (id) => {
    const data = await GetMovieById(id);
    setUserMoviesWatched(data);
  };

  const saveToWatchMovie = async (id) => {
    const data = await GetMovieById(id);
    console.log(data)
    setUserMoviesWatchList(data);
  };
  useEffect(() => {
    if (user?.movies.watched.find((w) => w.id === movie.id)) {
      setWatchedIcon("images/watched.png");
    }
    if (!user?.movies.watched.find((w) => w.id === movie.id)) {
      setWatchedIcon("images/no_watched.png");
    }
    if (user?.movies.watch_list.find((w) => w.id === movie.id)) {
      setToWatchIcon("images/listed.png");
    }
    if (!user?.movies.watch_list.find((w) => w.id === movie.id)) {
      setToWatchIcon("images/no_listed.png");
    }
  }, [movie.id, user, movie]);

  if (!movie.poster_path) {
    return null;
  }

  return (
    <div className="wrap_card">
      <div className="info_card_status">
        <div className="img_container" onClick={() => saveToWatchMovie(movie.id)}>
          <img src={toWatchIcon} alt="To watch list" title="To watch list" />
        </div>
        {movie.vote_average !== 0 && (
          <div className="img_container" onClick={() => saveWatchedMovie(movie.id)}>
            <img src={watchedIcon} alt="Watched list" title="Watched list" />
          </div>
        )}
      </div>
      <Link to={`/info/movie/${movie.id}`} className="link_card">
        <div className="info_card">
          <h4 className="text-center">{movie.title.length > 30 ? movie.title.slice(0, 30) + "..." : movie.title}</h4>
          <span>{movie.overview.length > 150 ? movie.overview.slice(0, 150) + "..." : movie.overview}</span>
          <div className="bottom_card_info">
            {movie.vote_average !== 0 ? (
              <>
                <img src="/images/star.png" alt="stars" className="stars_average" />
                <span>{movie.vote_average.toFixed(1)} / 10</span>
              </>
            ) : (
              <b className="text-warning">None</b>
            )}
          </div>
        </div>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="row_card" />
      </Link>
    </div>
  );
};

export default CardMovie;
