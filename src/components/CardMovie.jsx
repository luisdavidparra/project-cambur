import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { GetMovieById } from "../services/GetMovies";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const CardMovie = ({ movie }) => {
  const { user, setUser, getSearchByName } = useDataContext();
  const [watchedIcon, setWatchedIcon] = useState("images/no_watched.png");
  const [toWatchIcon, setToWatchIcon] = useState("images/no_listed.png");

  const editToWatchList = async (id) => {
    const data = await GetMovieById(id);
    if (user.movies.to_watch.length > 0) {
      if (user.movies.to_watch.find((movie) => movie.id === data.id)) {
        const newToWatch = user.movies.to_watch.filter((movie) => movie.id !== data.id);
        const newUser = { ...user, movies: { ...user.movies, to_watch: [...newToWatch] } };
        setUser(newUser);
        await setDoc(doc(db, "users", user.id), newUser);
      } else {
        const newUser = { ...user, movies: { ...user.movies, to_watch: [...user.movies.to_watch, { ...data }] } };
        setUser(newUser);
        await setDoc(doc(db, "users", user.id), newUser);
      }
    } else {
      const newUser = { ...user, movies: { ...user.movies, to_watch: [{ ...data }] } };
      setUser(newUser);
      await setDoc(doc(db, "users", user.id), newUser);
    }
  };

  const editWatched = async (id) => {
    const data = await GetMovieById(id);
    if (user.movies.watched.length > 0) {
      if (user.movies.watched.find((movie) => movie.id === data.id)) {
        const newToWatch = user.movies.watched.filter((movie) => movie.id !== data.id);
        const newUser = { ...user, movies: { ...user.movies, watched: [...newToWatch] } };
        setUser(newUser);
        await setDoc(doc(db, "users", user.id), newUser);
      } else {
        const newUser = { ...user, movies: { ...user.movies, watched: [...user.movies.watched, { ...data }] } };
        setUser(newUser);
        await setDoc(doc(db, "users", user.id), newUser);
      }
    } else {
      const newUser = { ...user, movies: { ...user.movies, watched: [{ ...data }] } };
      setUser(newUser);
      await setDoc(doc(db, "users", user.id), newUser);
    }
  };

  const resetSearchByName = () => {
    getSearchByName("");
  };

  useEffect(() => {
    if (user?.movies.watched.find((w) => w.id === movie.id)) {
      setWatchedIcon("images/watched.png");
    }
    if (!user?.movies.watched.find((w) => w.id === movie.id)) {
      setWatchedIcon("images/no_watched.png");
    }
    if (user?.movies.to_watch.find((w) => w.id === movie.id)) {
      setToWatchIcon("images/listed.png");
    }
    if (!user?.movies.to_watch.find((w) => w.id === movie.id)) {
      setToWatchIcon("images/no_listed.png");
    }
  }, [movie.id, user, movie]);

  if (!movie.poster_path) {
    return null;
  }

  return (
    <div className="wrap_card">
      <div className="info_card_status">
        <div className="img_container" onClick={() => editToWatchList(movie.id)}>
          <img src={toWatchIcon} alt="To watch list" title="To watch list" />
        </div>
        {movie.vote_average !== 0 && (
          <div className="img_container" onClick={() => editWatched(movie.id)}>
            <img src={watchedIcon} alt="Watched list" title="Watched list" />
          </div>
        )}
      </div>
      <Link to={`/info/movie/${movie.id}`} className="link_card" onClick={resetSearchByName}>
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
