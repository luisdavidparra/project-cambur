import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext";

const CardTv = ({ tv }) => {
  const { user, setUserTvWatchList, setUserTvWatched } = useDataContext();
  const [watchedIcon, setWatchedIcon] = useState("images/no_watched.png");
  const [toWatchIcon, setToWatchIcon] = useState("images/no_listed.png");

  useEffect(() => {
    if (user?.tv.watched.find((w) => w.id === tv.id)) {
      setWatchedIcon("images/watched.png");
    }
    if (!user?.tv.watched.find((w) => w.id === tv.id)) {
      setWatchedIcon("images/no_watched.png");
    }
    if (user?.tv.watch_list.find((w) => w.id === tv.id)) {
      setToWatchIcon("images/listed.png");
    }
    if (!user?.tv.watch_list.find((w) => w.id === tv.id)) {
      setToWatchIcon("images/no_listed.png");
    }
  }, [tv.id, user, tv]);

  if (!tv.poster_path) {
    return null;
  }
  return (
    <div className="wrap_card">
      <div className="info_card_status">
        <div className="img_container" onClick={() => setUserTvWatchList(tv)}>
          <img src={toWatchIcon} alt="To watch list" title="To watch list" />
        </div>
        {tv.vote_average !== 0 && (
          <div className="img_container" onClick={() => setUserTvWatched(tv)}>
            <img src={watchedIcon} alt="Watched list" title="Watched list" />
          </div>
        )}
      </div>
      <Link to={`/info/tv/${tv.id}`} className="link_card">
        <div className="info_card">
          <h4 className="text-center">{tv.name}</h4>
          <p>{tv.overview.slice(0, 150)}...</p>
          <div className="bottom_card_info">
            {tv.vote_average !== 0 ? (
              <>
                <img src="/images/star.png" alt="stars" className="stars_average" />
                <span>{tv.vote_average.toFixed(1)} / 10</span>
              </>
            ) : (
              <b className="text-warning">None</b>
            )}
          </div>
        </div>
        <img src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt={tv.name} className="row_card" />
      </Link>
    </div>
  );
};

export default CardTv;
