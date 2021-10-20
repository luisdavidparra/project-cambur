import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { GetTvShowById, GetTvShowCastById, TvShowProviders } from "../services/GetTvShows";
import "./Info.css";

const InfoTv = () => {
  const { id } = useParams();
  const [tv, setTv] = useState();
  const [cast, setCast] = useState();
  const [providers, setProviders] = useState();
  const [providersCheck, setProvidersCheck] = useState();
  const { user, setUserTvWatchList, setUserTvWatched, searchByName } = useDataContext();
  const [watchedIcon, setWatchedIcon] = useState("/images/no_watched.png");
  const [toWatchIcon, setToWatchIcon] = useState("/images/no_listed.png");
  useEffect(() => {
    const GetDetails = async () => {
      const data = await GetTvShowById(id);
      setTv(data);
    };
    const GetCast = async () => {
      const data = await GetTvShowCastById(id);
      setCast(data.cast.slice(0, 4));
    };
    const GetProviders = async () => {
      const data = await TvShowProviders(id);
      setProvidersCheck(data.results);
      setProviders(data.results);
    };
    GetDetails();
    GetCast();
    GetProviders();
  }, [id]);

  useEffect(() => {
    if (tv && user) {
      if (user.tv.watched.find((w) => w.id === tv.id)) {
        setWatchedIcon("/images/watched.png");
      }
      if (!user.tv.watched.find((w) => w.id === tv.id)) {
        setWatchedIcon("/images/no_watched.png");
      }
      if (user.tv.watch_list.find((w) => w.id === tv.id)) {
        setToWatchIcon("/images/listed.png");
      }
      if (!user.tv.watch_list.find((w) => w.id === tv.id)) {
        setToWatchIcon("/images/no_listed.png");
      }
    }
  }, [user, id, tv]);
  const history = useHistory();

  if (searchByName) {
    history.push("/search");
  }
  return (
    <>
      {tv ? (
        <div className="card my-3 col-xl-9 col-10 m-auto">
          <div className="row g-0">
            <div className="col-md-12 col-lg-4 col-xl-4 bg-light">
              <div className="title_small">
                <h4 className="mb-0">
                  {tv.name}
                  <span className="text-muted h5"> ({tv.first_air_date.slice(0, 4)})</span>
                </h4>
                {(tv.status === "Ended" || (tv.status === "Returning Series" && tv.number_of_seasons > 1)) && (
                  <div>
                    <img src="/images/star.png" alt="star" title="star" className="stars_info_average" />
                    <span className="mx-2">{tv.vote_average}/10 </span>
                    <span className="text-muted">{tv.status}</span>
                  </div>
                )}
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                className="img-fluid rounded-start w-100 poster_vertical"
                alt={tv.name}
                tile={tv.name}
              />
              <img
                src={`https://image.tmdb.org/t/p/w500/${tv.backdrop_path}`}
                className="img-fluid rounded-start w-100 poster_horizontal"
                alt={tv.name}
                tile={tv.name}
              />
            </div>
            <div className="col-12 col-lg-8 col-xl-8">
              <div className="card-body position-relative h-100">
                <div className="title_large">
                  <h4 style={{ marginBottom: "0" }}>
                    {tv.name}
                    <span className="text-muted h5"> ({tv.first_air_date.slice(0, 4)})</span>
                  </h4>
                  {(tv.status === "Ended" || (tv.status === "Returning Series" && tv.number_of_seasons > 1)) && (
                    <div>
                      <img src="/images/star.png" alt="star" title="star" className="stars_info_average" />
                      <span className="mx-2">{tv.vote_average}/10 </span>
                      <span className="text-muted">{tv.status}</span>
                    </div>
                  )}
                </div>
                {tv.overview && (
                  <>
                    <b>Plot:</b>
                    <p className="card-text">{tv.overview}</p>
                  </>
                )}
                <hr />
                <span>
                  <b>Genres: </b>
                  {tv.genres.map((g, index) => (
                    <span key={index}>{index !== 0 ? <> - {g.name}</> : <> {g.name}</>}</span>
                  ))}
                </span>
                <span className="d-block">
                  <b>Original language:</b> {tv.original_language.toUpperCase()}
                </span>
                <div className="aditional_info">
                  <div className="col-12 col-sm-8">
                    {cast && cast.length > 0 && (
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
                  <div className="status_info py-2">
                    <img
                      src={toWatchIcon}
                      alt="To watch list"
                      onClick={() => setUserTvWatchList(tv)}
                      style={{ cursor: "pointer" }}
                      title="To watch list"
                    />
                    {(tv.status === "Ended" || tv.status === "Returning Series") && (
                      <img
                        src={watchedIcon}
                        alt="Watched list"
                        onClick={() => setUserTvWatched(tv)}
                        style={{ cursor: "pointer" }}
                        title="Watched list"
                      />
                    )}
                  </div>
                </div>
                <div className="col-12 col-sm-8">
                  <span className="d-block">
                    <b>Number of episodes: </b>
                    {tv.number_of_episodes}
                  </span>
                  <span className="d-block mb-2">
                    <b>Number of seasons: </b>
                    {tv.seasons[tv.seasons.length - 1].episode_count > 0
                      ? tv.number_of_seasons
                      : tv.number_of_seasons - 1}
                  </span>
                </div>
                {providers &&
                  providersCheck &&
                  (providers.BO && providers?.BO.flatrate ? (
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
                  {tv.production_companies.map((p, index) => (
                    <>
                      {p.logo_path && index < 2 ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${p.logo_path}`}
                          alt={p.name}
                          title={p.name}
                          key={index}
                        />
                      ) : null}
                    </>
                  ))}
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

export default InfoTv;
