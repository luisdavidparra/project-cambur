import { useHistory } from "react-router";
import { useDataContext } from "../context/DataContext";
import CardMovie from "./CardMovie";
import CardTv from "./CardTv";

const MyWatched = () => {
  const { user, searchByName } = useDataContext();
  const history = useHistory();
  if (searchByName) {
    history.push("/search");
  }

  return (
    <>
      {user && (
        <>
          {user.movies.watched.length > 0 && (
            <>
              <h3 className="m-2">
                <b>Movies watched</b>
              </h3>
              <div className="row__card_list">
                {user.movies.watched.map((movie, id) => (
                  <CardMovie movie={movie} key={id} />
                ))}
              </div>
            </>
          )}
          {user.tv_shows.watched.length > 0 && (
            <>
              <h3 className="m-2">
                <b>Tv Shows watched</b>
              </h3>
              <div className="row__card_list">
                {user.tv_shows.watched.map((tv, id) => (
                  <CardTv tv={tv} key={id} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MyWatched;
