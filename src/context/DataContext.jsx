import { createContext, useContext, useEffect, useState } from "react";
import { PopularMovies } from "../services/GetMovies";
import { PopularTvShows } from "../services/GetTvShows";
import { SearchByName } from "../services/GetByName";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase/firebase.config";

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

  useEffect(() => {
    const userStorage = localStorage.getItem("user_project_cambur");
    if (userStorage) {
      const getUser = async () => {
        const existingUser = [];
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if (doc.id === userStorage) {
            existingUser.push({ ...doc.data(), id: doc.id });
          }
        });
        setUser(existingUser[0]);
      };
      getUser();
    }
  }, []);

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
  }, []);

  const value = {
    popularMovies,
    popularTv,
    user,
    getSearchByName,
    searchByName,
    setUser,
   
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
