import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { GetMovieById, GetMovieCastById, MovieProviders } from "../services/GetMovies";
import "./Info.css";

const InfoMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [cast, setCast] = useState();
  const [providers, setProviders] = useState();
  const [providersCheck, setProvidersCheck] = useState();
  const { user, setUserMoviesWatchList, setUserMoviesWatched, searchByName } = useDataContext();
  const [watchedIcon, setWatchedIcon] = useState("/images/no_watched.png");
  const [toWatchIcon, setToWatchIcon] = useState("/images/no_listed.png");
  
  useEffect(() => {
    const GetDetails = async () => {
      const data = await GetMovieById(id);
      setMovie(data);
    };
    const GetCast = async () => {
      const data = await GetMovieCastById(id);
      setCast(data.cast.slice(0, 4));
    };
    const GetProviders = async () => {
      const data = await MovieProviders(id);
      setProvidersCheck(Object.entries(data.results));
      setProviders(data.results);
    };
    GetDetails();
    GetCast();
    GetProviders();
  }, [id]);

  useEffect(() => {
    if (movie && user) {
      if (user?.movies.watched.find((w) => w.id === movie.id)) {
        setWatchedIcon("/images/watched.png");
      }
      if (!user?.movies.watched.find((w) => w.id === movie.id)) {
        setWatchedIcon("/images/no_watched.png");
      }
      if (user?.movies.watch_list.find((w) => w.id === movie.id)) {
        setToWatchIcon("/images/listed.png");
      }
      if (!user?.movies.watch_list.find((w) => w.id === movie.id)) {
        setToWatchIcon("/images/no_listed.png");
      }
    }
  }, [id, movie, user]);
  const history = useHistory();

  if (searchByName) {
    history.push("/search");
  }
  return (
    <>
      {movie ? (
        <div className="card my-3 col-xl-9 col-10 m-auto">
          <div className="row g-0">
            <div className="col-md-12 col-lg-4 col-xl-4 bg-light">
              <div className="title_small">
                <h4 className="mb-0">
                  {movie.title}
                  {movie.release_date && <span className="text-muted h5"> ({movie.release_date.slice(0, 4)})</span>}
                </h4>
                {movie.status === "Released" && (
                  <div>
                    <img src="/images/star.png" alt="star" title="star" className="stars_info_average" />
                    <span className="mx-2">{movie.vote_average}/10 </span>
                  </div>
                )}
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="img-fluid rounded-start w-100 poster_vertical"
                alt={movie.title}
                title={movie.title}
              />
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                className="img-fluid rounded-start w-100 poster_horizontal"
                alt={movie.title}
                title={movie.title}
              />
            </div>
            <div className="col-12 col-lg-8 col-xl-8">
              <div className="card-body position-relative h-100">
                <div className="title_large">
                  <h4 className="mb-0">
                    {movie.title}
                    {movie.release_date && <span className="text-muted h5"> ({movie.release_date.slice(0, 4)})</span>}
                  </h4>
                  {movie.status === "Released" && (
                    <div>
                      <img src="/images/star.png" alt="star" title="star" className="stars_info_average" />
                      <span className="mx-2">{movie.vote_average}/10 </span>
                    </div>
                  )}
                </div>
                {movie.overview && (
                  <>
                    <b>Plot:</b>
                    <p className="card-text">{movie.overview}</p>
                  </>
                )}
                <hr />
                <span>
                  <b>Genres: </b>
                  {movie.genres.map((g, index) => (
                    <span key={index}>{index !== 0 ? <> - {g.name}</> : <> {g.name}</>}</span>
                  ))}
                </span>
                <span className="d-block">
                  <b>Original language:</b> {movie.original_language.toUpperCase()}
                </span>
                <div className="aditional_info">
                  <div className="col-12 col-sm-8">
                    {cast && (
                      <div className="cast_info">
                        <b>Cast:</b>
                        <ul>
                          {cast.map((cas, index) => (
                            <li key={index}>
                              <Link className="link" to={`/info/person/${cas.id}`}>
                                <b>{cas.name}</b>
                              </Link>{" "}
                              as {cas.character}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="status_info">
                    <img
                      src={toWatchIcon}
                      alt="To watch list"
                      onClick={() => setUserMoviesWatchList(movie)}
                      title="To Watch list"
                    />
                    {movie.status === "Released" && (
                      <img
                        src={watchedIcon}
                        alt="Watched list"
                        onClick={() => setUserMoviesWatched(movie)}
                        title="Watched list"
                      />
                    )}
                  </div>
                </div>
                <div className="col-12 col-sm-8">
                  <span className="d-block mb-2">
                    <b>Runtime: </b>
                    {movie.runtime} min
                  </span>
                </div>
                {providers &&
                  providersCheck &&
                  (providers?.BO && providers?.BO.flatrate ? (
                    <div className="stream_info">
                      <b>Stream:</b>
                      {providers?.BO.flatrate.length > 1 ? (
                        providers?.BO.flatrate.map((pro, i) => (
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${pro.logo_path}`}
                            alt={pro.provider_name}
                            title={pro.provider_name}
                            key={i}
                          />
                        ))
                      ) : (
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${providers?.BO.flatrate[0].logo_path}`}
                          alt={providers?.BO.flatrate[0].provider_name}
                          title={providers?.BO.flatrate[0].provider_name}
                        />
                      )}
                    </div>
                  ) : (
                    <b className="text-danger stream_info">No streaming services</b>
                  ))}
                <div className="companies_info">
                  {movie.production_companies.map((p, index) =>
                    p.logo_path && index < 2 ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${p.logo_path}`}
                        alt={p.name}
                        title={p.name}
                        key={index}
                      />
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
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

export default InfoMovie;
