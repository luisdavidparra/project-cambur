import { useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import { useState } from "react/cjs/react.development";
import { useDataContext } from "../context/DataContext";
import CardPerson from "./CardPerson";
import Carousel from "./Carousel";

const Search = () => {
  const { searchByName } = useDataContext();

  const [searchMovies, setSearchMovies] = useState();
  const [searchTv, setSearchTv] = useState();
  const [searchPerson, setSearchPerson] = useState();

  const history = useHistory();

  useEffect(() => {
    if (searchByName) {
      const moviesFiltered = searchByName?.filter(
        (search) => search.media_type === "movie" && search.poster_path !== null
      );
      const tvFiltered = searchByName?.filter((search) => search.media_type === "tv" && search.poster_path !== null);
      const personFiltered = searchByName?.filter(
        (search) => search.media_type === "person" && search.profile_path !== null
      );
      setSearchMovies(moviesFiltered);
      setSearchTv(tvFiltered);
      setSearchPerson(personFiltered);
    }
  }, [searchByName]);

  if (!searchByName) {
    if (history.action === "PUSH") {
      history.goBack();
    } else {
      return <Redirect to="/" />;
    }
  }

  return (
    <>
      {searchByName?.length !== 0 ? (
        <>
          {searchMovies?.length > 0 && (
            <>
              <h3 className="m-2">
                <b>Movie results</b>
              </h3>
              <Carousel searchMovies={searchMovies} />
            </>
          )}
          {searchTv?.length > 0 && (
            <>
              <h3 className="m-2">
                <b>Tv Show results</b>
              </h3>
              <Carousel searchTv={searchTv} />
            </>
          )}
          {searchPerson?.length > 0 && (
            <>
              <h3 className="m-2">
                <b>Person results</b>
              </h3>
              <div className="row__card">
                {searchPerson.map((search, i) => (
                  <CardPerson person={search} key={i} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <h3 className="text-center mt-2">No results</h3>
      )}
    </>
  );
};

export default Search;
