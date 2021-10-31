import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./Info.css";
import { useDataContext } from "../context/DataContext";

const Profile = () => {
  const { user, searchByName } = useDataContext();
  const [moviesWatched, setMoviesWatched] = useState();
  const [moviesToWatch, setMoviesToWatch] = useState();
  const [favMoviesGenres, setFavMoviesGenres] = useState();
  // const [averageWatched, setAverageWatched] = useState();
  const history = useHistory();
  if (searchByName) {
    history.push("/search");
  }
  useEffect(() => {
    if (user) {
      const moviesWatched = user.movies.watched.reduce(
        (prev, curr) => {
          const timeValue = prev.time + curr.runtime;
          const amountValue = prev.amount + 1;
          const value = { time: timeValue, amount: amountValue };
          return value;
        },
        { time: 0, amount: 0 }
      );
      const moviesToWatch = user.movies.to_watch.reduce(
        (prev, curr) => {
          const timeValue = prev.time + curr.runtime;
          const amountValue = prev.amount + 1;
          const value = { time: timeValue, amount: amountValue };
          return value;
        },
        { time: 0, amount: 0 }
      );

      const allGenres = [...user.movies.watched, ...user.movies.to_watch].map((genres) => genres.genres[0].name);
      const favouriteGenres = allGenres.reduce((prev, curr) => {
        if (prev.length === 0) return [{ name: curr, amount: 1 }];
        const filtered = prev.filter((p) => p.name === curr);
        if (filtered.length > 0) {
          const noFiltered = prev.filter((p) => p.name !== curr);
          const newIndiValue = { ...filtered[0], amount: filtered[0].amount + 1 };
          const newValue = [...noFiltered, newIndiValue];
          return newValue;
        }
        return [...prev, { name: curr, amount: 1 }];
      }, []);

      const favouriteGenresOrdered = favouriteGenres.sort((a, b) => b.amount - a.amount).slice(0, 5);

      setFavMoviesGenres(favouriteGenresOrdered);
      setMoviesWatched(moviesWatched);
      setMoviesToWatch(moviesToWatch);
      // const average = (moviesToWatch.time * 100) / moviesWatched.time;
      // setAverageWatched(average);
    }
  }, [user]);

  return (
    <>
      {user ? (
        <div className="card my-3 col-12 col-xl-6 col-md-8  m-auto">
          <div className="row g-0">
            <div className="col-12 col-sm-5 bg-light">
              <div className="title_person">
                <h4 className="mb-0">{user.name}</h4>
                <span className="d-block">Account created: {user.date_register.split(" ").slice(1, 4).join(" ")}</span>
              </div>
              <div className="profife_responsive">
                <img
                  src={user.profile_image}
                  className="img-fluid rounded-start"
                  alt={user.name}
                  title={user.name}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="col-12 col-sm-7">
              <div className="card-body">
                <div className="m-auto w-75">
                  <h5>Movies</h5>
                  <span className="d-block">Amount watched: {moviesWatched?.amount}</span>
                  <span className="d-block">Time watched: {moviesWatched?.time} min</span>
                  <span className="d-block">Amount to watch: {moviesToWatch?.amount}</span>
                  <span className="d-block">Time to watch: {moviesToWatch?.time} min</span>
                  {favMoviesGenres && (
                    <div>
                      <ul>
                        <h5>Favourites Genres:</h5>
                        {favMoviesGenres.map((fav, index) => (
                          <li key={index}>{fav.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <h5>Tv Shows</h5>
                  <span className="d-block">Amount watched: {user.tv_shows.watched.length}</span>
                  <span className="d-block">Amount to watch: {user.tv_shows.to_watch.length}</span>

                  <div className="progress" style={{ position: "relative", zIndex: 1, width: "75%" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <div className="progress" style={{ position: "relative", bottom: "16px" }}>
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 
        <div className="row g-0">
          <div className="col-md-12 col-lg-4 col-xl-4 bg-light">
            <div className="title_person">
              <h4 className="mb-0">
                {user.name}
                <span class="text-muted h5"> ({person.known_for_department})</span>
              </h4>
              <span className="d-block">{person.place_of_birth}</span>
              <b className="d-block">{person.birthday}</b>
            </div>
            <div className="profife_responsive">
              <img
                src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                className="img-fluid rounded-start profile_picture"
                alt={person.name}
                title={person.name}
              />
              {popularAllWorks ? (
                <div className="profile_works">
                  <b> Popular Works: </b>
                  <ul>
                    {popularAllWorks.map(
                      (work, index) =>
                        work && (
                          <Link
                            to={work.media_type === "tv" ? `/info/tv/${work.id}` : `/info/movie/${work.id}`}
                            className="col-6 text-decoration-none"
                            key={index}
                          >
                            <li>{work.original_title || work.name}</li>
                          </Link>
                        )
                    )}
                  </ul>
                </div>
              ) : (
                <div className="text-center mt-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-lg-8 col-xl-8">
            <div className="card-body">
              <div className="bio_info">
                <b>Biografy:</b>
                <p className="card-text">{person.biography}</p>
              </div>
              <hr />
              <span className="d-block">
                <b>Popularity: </b>
                {person.popularity}
              </span>
              {popularAllWorks ? (
                <div className="pupular_works">
                  <b> Popular Works: </b>
                  <ul className="row">
                    {popularAllWorks.map(
                      (work, index) =>
                        work && (
                          <Link
                            to={work.media_type === "tv" ? `/info/tv/${work.id}` : `/info/movie/${work.id}`}
                            className="col-12 col-sm-6 text-decoration-none"
                            key={index}
                          >
                            <li>{work.original_title || work.name}</li>
                          </Link>
                        )
                    )}
                  </ul>
                </div>
              ) 
              )}
            </div>
          </div>
        </div>
      </div>
      ) 
      */}
        </div>
      ) : (
        <div className="text-center mt-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
