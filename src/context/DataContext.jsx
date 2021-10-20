import { createContext, useContext, useEffect, useState } from "react";
import { PopularMovies } from "../services/GetMovies";
import { PopularTvShows } from "../services/GetTvShows";
import { SearchByName } from "../services/GetByName";
import { GetUser, SetUserLists } from "../services/GetUser";

const DataContext = createContext({});

export const DataContextProvider = ({ children }) => {
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [searchByName, setSearchByName] = useState();
  const [user, setUser] = useState();

  const getSearchByName = async (name) => {
    if (name === "") {
      setSearchByName();
    } else {
      const res = await SearchByName(name);
      setSearchByName(res.results);
    }
  };
  const getUser = async () => {
    const res = await GetUser();
    setUser(res);
  };

  const setUserMoviesWatchList = async (movie) => {
    const res = user.movies.watch_list.find((w) => w.id === movie.id);
    if (res) {
      const data = user.movies.watch_list.filter((w) => w.id !== movie.id);
      const newMovies = { watch_list: [...data], watched: user.movies.watched };
      const newUser = { ...user, movies: newMovies };
      SetUserLists(newUser);
      setUser(newUser);
    } else {
      const newWatchList = [...user.movies.watch_list, movie];
      const newMovies = { watch_list: [...newWatchList], watched: user.movies.watched };
      const newUser = { ...user, movies: newMovies };
      SetUserLists(newUser);
      setUser(newUser);
    }
  };

  const setUserMoviesWatched = async (movie) => {
    const res = user.movies.watched.find((w) => w.id === movie.id);
    if (res) {
      const data = user.movies.watched.filter((w) => w.id !== movie.id);
      const newMovies = { watched: [...data], watch_list: user.movies.watch_list };
      const newUser = { ...user, movies: newMovies };
      SetUserLists(newUser);
      setUser(newUser);
    } else {
      const newWatched = [...user.movies.watched, movie];
      const newMovies = { watched: [...newWatched], watch_list: user.movies.watch_list };
      const newUser = { ...user, movies: newMovies };
      SetUserLists(newUser);
      setUser(newUser);
    }
  };

  const setUserTvWatchList = async (tv) => {
    const res = user.tv.watch_list.find((w) => w.id === tv.id);
    if (res) {
      const data = user.tv.watch_list.filter((w) => w.id !== tv.id);
      const newTv = { watch_list: [...data], watched: user.tv.watched };
      const newUser = { ...user, tv: newTv };
      SetUserLists(newUser);
      setUser(newUser);
    } else {
      const newWatchList = [...user.tv.watch_list, tv];
      const newTv = { watch_list: [...newWatchList], watched: user.tv.watched };
      const newUser = { ...user, tv: newTv };
      SetUserLists(newUser);
      setUser(newUser);
    }
  };

  const setUserTvWatched = async (tv) => {
    const res = user.tv.watched.find((w) => w.id === tv.id);
    if (res) {
      const data = user.tv.watched.filter((w) => w.id !== tv.id);
      const newTv = { watched: [...data], watch_list: user.tv.watch_list };
      const newUser = { ...user, tv: newTv };
      SetUserLists(newUser);
      setUser(newUser);
    } else {
      const newWatched = [...user.tv.watched, tv];
      const newTv = { watched: [...newWatched], watch_list: user.tv.watch_list };
      const newUser = { ...user, tv: newTv };
      SetUserLists(newUser);
      setUser(newUser);
    }
  };

  useEffect(() => {
    const getPopularsMovies = async () => {
      const res = await PopularMovies();
      setPopularMovies(res.results);
    };
    const getPopularsTv = async () => {
      const res = await PopularTvShows();
      setPopularTv(res.results);
    };

    getPopularsMovies();
    getPopularsTv();
    getUser();
  }, []);
  

  const value = {
    popularMovies,
    popularTv,
    user,
    getSearchByName,
    searchByName,
    getUser,
    setUser,
    setUserMoviesWatchList,
    setUserMoviesWatched,
    setUserTvWatchList,
    setUserTvWatched,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
