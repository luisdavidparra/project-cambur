import { apiKEY } from "../apiKEY";

export const GetMovieById = async (id) => {
  const res = await fetch(`
  https://api.themoviedb.org/3/movie/${id}?api_key=${apiKEY}&language=en-US`);
  const data = await res.json();
  return data;
};

export const GetMovieCastById = async (id) => {
  const res = await fetch(`
  https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKEY}&language=en-US`);
  const data = await res.json();
  return data;
};

export const GetMoviesByPersonId = async (id) => {
  const res = await fetch(`
  https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKEY}&language=en-US`);
  const data = await res.json();
  return data;
};

export const PopularMovies = async () => {
  const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKEY}&language=en-US&page=1`);
  const json = data.json();
  return json;
};

export const TopRatedMovies = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKEY}&language=en-US&page=1`);
  const data = await res.json();
  return data;
};

export const MovieProviders = async (id) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKEY}`);
  const data = await res.json();
  return data;
};
