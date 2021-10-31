import { useHistory } from "react-router";
import { useDataContext } from "../context/DataContext";
import CardMovie from "./CardMovie";
import CardTv from "./CardTv";

const MyWatchList = () => {
  const { user, searchByName } = useDataContext();
  const history = useHistory();

  if (searchByName) {
    history.push("/search");
  }
  return (
    <>
      {user && (
        <>
          {user.movies.to_watch.length > 0 && (
            <>
              <h3 className="m-2">
                <b>Movies to watch</b>
              </h3>
              <div className="row__card_list">
                {user.movies.to_watch.map((movie, id) => (
                  <CardMovie movie={movie} key={id} />
                ))}
              </div>
            </>
          )}
          {user.tv_shows.to_watch.length > 0 && (
            <>
              <h3 className="m-2">
                <b>Tv Shows to watch</b>
              </h3>
              <div className="row__card_list">
                {user.tv_shows.to_watch && user.tv_shows.to_watch.map((tv, id) => <CardTv tv={tv} key={id} />)}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MyWatchList;
