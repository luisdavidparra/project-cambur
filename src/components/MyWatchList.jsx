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
          {user.movies.watch_list.length > 0 && (
            <>
              <h3 className="m-2">
                <b>Movies to watch</b>
              </h3>
              <div className="row__card_list">
                {user.movies.watch_list.map((movie, id) => (
                  <CardMovie movie={movie} key={id} />
                ))}
              </div>
            </>
          )}
          {user.tv.watch_list.length > 0 && (
            <>
              <h3 className="m-2">
                <b>Tv Shows to watch</b>
              </h3>
              <div className="row__card_list">
                {user.tv.watch_list && user.tv.watch_list.map((tv, id) => <CardTv tv={tv} key={id} />)}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MyWatchList;
